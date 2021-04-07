
"""
1. log in to server [66.42.50.128] with username [root] and password [7Hd%XcU32xz3=)j-]
2. to execute the program daily at 23:00
    run [crontab -e]
    add [0 23 * * * /root/.pyenv/versions/3.7.4/bin/python "/root/Ruiqi Point of Sales Reporter/test.py"]
http://66.42.50.128:8000 admin Maimai1tinhyeu
http://66.42.50.128:8000/admin
"""

import ftplib, pathlib
from datetime import datetime
import pandas, json, os
import gspread, pysftp
import warnings
warnings.filterwarnings("ignore")
parentPath = pathlib.Path(__file__).parent.absolute()

def uploadPOSReports(dateTime: datetime, onMessage):
    def loadJSON(path):
        with open(path) as f:
            data = json.load(f)
        return data
    storesCSV    = os.path.join(parentPath, 'stores.csv')
    settingsJSON = os.path.join(parentPath, 'settings.json')
    googleJSON   = os.path.join(parentPath, 'Google credentials.json')
    stores   = pandas.read_csv(storesCSV, index_col=1) 
    settings = loadJSON(settingsJSON)
    # read data from google drive
    dateString = dateTime.strftime(r'%d/%m/%Y')
    account = gspread.service_account(googleJSON)
    sheet = account.open_by_url(settings['sheet url']).worksheet(settings['sheet tab'])
    data = {}
    for row in sheet.get_all_values():
        if row[1] == dateString:
            storeCode = row[3].upper()
            salesWithTax  = sum([float(x) for x in row[4:13]])
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
    for code, lines in results.items():
        filename = formatPOS(code, settings['filename formats'][code])
        folder = os.path.join('PoS reports', code)
        path = os.path.join(folder, filename)
        os.makedirs(folder, exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        tried = 0
        while tried < 1:
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
                onMessage('\t'.join(['success', ftpType, code]))
                break
            except Exception as e:
                tried +=1
                onMessage('\t'.join([f'fail({tried})', ftpType, code, str(e)]))

if __name__ == '__main__':           
    uploadPOSReports(datetime(2021, 4, 2))
