
import json, os, pathlib, time
import urllib.request
from datetime import datetime
import numpy as np
import matplotlib.pyplot as plt

folder = pathlib.Path(__file__).parent.absolute()
metricsJSON = os.path.join(folder, 'metrics.json')

def getData(assetKey: str = 'dogecoin'):
    resultsFile = os.path.join(folder, f'{assetKey}.json')
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
                    url = f'https://data.messari.io/api/v1/assets/{assetKey}/metrics/{metric_id}/time-series?interval=1d&start=2020-08-12&end=2021-04-21'
                    results[metric_id] = json.loads( urllib.request.urlopen(url).read().decode("utf-8") )
                    time.sleep(1)
                break
            except:
                with open(resultsFile, 'w+') as f:
                    json.dump(results, f)
                time.sleep(10)

def fixData(assetKey: str = 'dogecoin'):
    resultsFile = os.path.join(folder, f'{assetKey}.json')
    with open(resultsFile, 'r') as f:
        results = json.load(f)
    for metric_id, result in results.items():
        results[metric_id] = json.loads( result )
    with open(resultsFile, 'w+') as f:
        json.dump(results, f)

def cleanData(assetKey: str = 'dogecoin'):
    resultsFile = os.path.join(folder, f'{assetKey}.json')
    with open(resultsFile, 'r') as f:
        results = json.load(f)
    cleaned = []
    for metric_id, result in results.items():
        columns = result['data']['parameters']['columns']
        description = result['data']['schema']['description']
        values_schema = result['data']['schema']['values_schema']
        values = result['data']['values']
        if values is None:
            continue
        assert columns[0] == 'timestamp'
        array = np.swapaxes(np.array(values), 0, 1)
        x = (array[0]/1000).astype('int')
        x = [datetime.utcfromtimestamp(xi).strftime('%Y-%m-%d') for xi in x]
        print(x[0], x[-1])
        for i, y in enumerate(array[1:]):
            try:
                plt.plot(x, normalize(y), label=f'{columns[1:][i]}')
            except:
                pass
    plt.legend()
    plt.show()

def normalize(a):
    return (a - np.min(a)) / np.ptp(a)

#getData()
cleanData()

