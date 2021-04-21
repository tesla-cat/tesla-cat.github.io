
import json, os, pathlib, time
import urllib.request

metricsJSON = r'C:\Users\rick\Desktop\doge\Messari\metrics.json'
folder = pathlib.Path(__file__).parent.absolute()

def getData(assetKey: str = 'dogecoin'):
    resultsFile = os.path.join(folder, f'results-{assetKey}.json')
    try:
        with open(resultsFile, 'r') as f:
            results = json.load(f)
    except:
        results = {}

    with open(metricsJSON, 'r') as f:
        metrics = json.load(f)
    
    for metric in metrics['data']['metrics']:
        metric_id = metric['metric_id']
        while 1:
            try:
                print(metric_id)
                if metric_id not in results:
                    url = f'https://data.messari.io/api/v1/assets/{assetKey}/metrics/{metric_id}/time-series'
                    results[metric_id] = json.loads( urllib.request.urlopen(url).read().decode("utf-8") )
                    time.sleep(1)
                break
            except:
                with open(resultsFile, 'w+') as f:
                    json.dump(results, f)
                time.sleep(10)

def fixData(assetKey: str = 'dogecoin'):
    resultsFile = os.path.join(folder, f'results-{assetKey}.json')
    with open(resultsFile, 'r') as f:
        results = json.load(f)
    for metric_id, result in results.items():
        results[metric_id] = json.loads( result )
    with open(resultsFile, 'w+') as f:
        json.dump(results, f)
            
#getData()
fixData()