
import urllib.request
import pathlib, os, json

APIKey = 'qrevgi1s23ijtr1mnkreg'
folder = pathlib.Path(__file__).parent.absolute()
dataFolder = os.path.join(folder, 'data')
if not os.path.exists(dataFolder):
    os.makedirs(dataFolder)

def getASSETS( 
    key: str = APIKey, 
    symbol: str = 'DOGE', 
    interval: 'hour' or 'day' = 'hour',
    time_series_indicators: str = 'open,high,low,close,average_sentiment,galaxy_score',
    change: str = '',
    data_points: int = 24,
    start: int or None = None, 
    end: int or None = None, 
):
    """
    Parameters:
        key: Your API key
        symbol: A comma-separated list of symbols to fetch data for
        interval: Provide an interval string value of either "hour" or "day". Defaults to "hour" if ommited
        time_series_indicators: A comma-separated list of metrics to include in the time series values. All available metrics provided if parameter is ommited
        change: A comma-separated list of change intervals to provide metrics for. 1d,1w,1m,3m,6m,1y. 
            Output will include the sum of the selected interval (such as 3 months) the previous sum of the time period before and the percent change
        data_points: Number of time series data points to include for the asset. Maximum of 720 data points accepted, to not use time series data set data_points=0
        start: A unix timestamp (seconds) of the earliest time series point to provide. 
            Use in combination with data_points to start at a certain hour or day and provide X hours/days of data
        end: A unix timestamp (seconds) of the latest time series point to provide. 
            Use in combination with data_points to provide the most recent X data points leading up to a certain time.
    """
    baseUrl = 'https://api.lunarcrush.com/v2?'
    params = f'data=assets&key={key}&symbol={symbol}&interval={interval}&time_series_indicators={time_series_indicators}&data_points={str(data_points)}'
    contents = urllib.request.urlopen(f'{baseUrl}{params}').read()
    with open(os.path.join(dataFolder, 'assets.json'), 'wb+') as f:
        f.write(contents)

#getASSETS()

def analyzeAssets(path):
    with open(path, 'r') as f:
        data = json.load(f)
    print(data)

analyzeAssets(r'C:\Users\rick\Desktop\doge\LunarCRUSH\data\assets.json')
