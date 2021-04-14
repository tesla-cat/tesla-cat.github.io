
"""
66.42.50.128    root    7Hd%XcU32xz3=)j-
http://66.42.50.128:8000 admin Maimai1tinhyeu
http://66.42.50.128:8000/admin
"""

"""
- To run the server
screen -ls
screen -X -S ??? quit
screen -S django
once: sudo pip3 install virtualenv
once: virtualenv newVirtualEnvironment
source newVirtualEnvironment/bin/activate 
once: pip install django django-tinymce pandas gspread pysftp
python manage.py runserver 0.0.0.0:8000
Now press Ctrl+A and then press d to exit from this screen
"""

"""
- To run daily task
import sys
print(sys.executable)
crontab -e
50 23 * * * /home/rick/MyProject/newVirtualEnvironment/bin/python3 /home/rick/MyProject/MainApp/task/uploadPOSReports.py
* * * * * /home/rick/MyProject/newVirtualEnvironment/bin/python3 /home/rick/MyProject/MainApp/task/uploadPOSReports.py
"""

"""
nohup /usr/bin/python3 /home/rick/MyProject/MainApp/task/uploadPOSReports.py &
"""

# native libraries
import ftplib, pathlib, json, os, time, warnings 
from datetime import datetime

# need to install
import pandas, gspread, pysftp

warnings.filterwarnings("ignore")
parentPath = pathlib.Path(__file__).parent.absolute()

logTxt       = os.path.join(parentPath, 'log.txt')
storesCSV    = os.path.join(parentPath, 'stores.csv')
settingsJSON = os.path.join(parentPath, 'settings.json')
googleJSON   = os.path.join(parentPath, 'Google credentials.json')

def makeLog(log):
    with open(logTxt, 'a+') as f:
        f.write(log)
def loadJSON(path):
    with open(path) as f:
        data = json.load(f)
    return data

def uploadPOSReports(dateTime: datetime, onMessage, user = 'auto  '):
    dateString = dateTime.strftime(r'%d/%m/%Y')
    nowString  = datetime.now().strftime(r'%d/%m/%Y')
    messages = [user, f'{dateString}(@{nowString})']
    
    stores   = pandas.read_csv(storesCSV, index_col=1) 
    settings = loadJSON(settingsJSON)
    # read data from google drive
    account = gspread.service_account(googleJSON)
    sheet = account.open_by_url(settings['sheet url']).worksheet(settings['sheet tab'])
    data = {}
    for row in sheet.get_all_values():
        if row[1] == dateString:
            storeCode = row[3].upper()
            salesWithTax = sum([float(x) for x in row[4:13]])
            if storeCode in data:
                data[storeCode][3] += salesWithTax
            else:
                data[storeCode] = row[:3] + [salesWithTax]
    # format one line in the report as well as the filename
    def formatPOS(code, posFormat):
        salesWithTax = data[code][3]
        sales = salesWithTax / 1.07
        tax   = salesWithTax - sales
        transactions = int(sales / 11)
        batchID = (dateTime - datetime(2020, 10, 28)).days + 404
        dateFormat = posFormat.split('date(')[1].split(')')[0]
        dateString = dateTime.strftime(dateFormat)
        ftpUsername = str(stores['ftp_username'][code])
        return ( 
            posFormat
            .replace("sales with tax", '%.2f' % salesWithTax)
            .replace("sales"         , '%.2f' % sales)
            .replace("tax"           , '%.2f' % tax)
            .replace("transactions"  , '%d'   % transactions)
            .replace("batch ID"      , '%d'   % batchID)
            .replace(f"date({dateFormat})", dateString)
            .replace("ftp username", ftpUsername)
            .replace(' ', '')
        )
    # produce the reports
    results = {}
    for storeCode, posFormat in settings['report formats'].items():
        if 'same as' in posFormat:
            posFormat = settings['report formats'][posFormat.split('same as ')[1]]
        code = storeCode.split(' ')[0]
        if not code in data:
            messages.append(f'Error: {code}(no data)')
            continue
        if not code in results:
            results[code] = []
        if '0-22' in storeCode:
            for hour in range(23):
                results[code].append(formatPOS( code, posFormat.replace('hour', f'{str(hour).zfill(2)}') ))
        else:
            results[code].append(formatPOS( code, posFormat ))
    # write to file and upload ftp
    cnopts = pysftp.CnOpts()
    cnopts.hostkeys = None
    success, fail = [], []
    for code, lines in results.items():
        filename = formatPOS(code, settings['filename formats'][code])
        folder = os.path.join(parentPath, 'PoS reports', code)
        path = os.path.join(folder, filename)
        os.makedirs(folder, exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        host = str(stores["ftp_host"][code])
        username = str(stores["ftp_username"][code])
        password = str(stores["ftp_password"][code])
        port = int(stores["ftp_port"][code])
        ftpType = 'ftp' if host in ['ftp.dtstms.com', 'plsq.dyndns.org'] else 'sftp'
        try:
            if ftpType == 'ftp':
                ftp = ftplib.FTP(host, username, password)
                ftp.connect(host, port)
                ftp.login(username, password)
                with open(path, 'rb') as f:
                    ftp.storbinary(f'STOR {filename}', f)
                ftp.quit()
            else:
                with pysftp.Connection(host, username, password=password, cnopts=cnopts) as sftp:
                    sftp.put(path)
            success.append(code)
        except Exception as e:
            fail.append(f'{code}({str(e)})')
    messages.append('Success: %s' % ', '.join(success) )
    messages.append('Fail: %s'    % ', '.join(fail   ) )
    for m in messages: onMessage(m)
    makeLog('\n'+'. '.join(messages))

if __name__ == '__main__': 
    uploadPOSReports(datetime.now(), lambda m: print(m))