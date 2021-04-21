
import urllib.request
from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

def request(url):
    contents = urllib.request.urlopen(url).read()
    print(contents)

def requestCoinMarketCap(APIKey):
    url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
    session = Session()
    session.headers.update({
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': APIKey,
    })
    print(json.loads(session.get(url, params={
        'start':'1',
        'limit':'50',
        'convert':'USD'
    }).text))

# LunarCRUSH: Social Listening For Crypto
# https://lunarcrush.com/developers/docs
LunarCRUSHAPIKey = 'qrevgi1s23ijtr1mnkreg'
url = f'https://api.lunarcrush.com/v2?data=assets&key={LunarCRUSHAPIKey}&symbol=LTC'
#request(url)

# Messari: trades, market data (VWAP), quantitative metrics, qualitative information
url = f'https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd'
#request(url)

# Nomics: Price, crypto market cap, supply, and all-time high data
NomicsAPIKey = '0c47b5a3426140c3f5f77ed7c9ebf699'
url = f'https://api.nomics.com/v1/currencies/ticker?key={NomicsAPIKey}&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR&per-page=100&page=1'
#request(url)

# CoinMarketCap: known for being the go-to place for checking cryptocurrency and token prices. CoinMarketCap was recently acquired by Binance
CoinMarketCapAPIKey = 'a786719f-964b-4be8-818e-979c5e89b494'
#requestCoinMarketCap(CoinMarketCapAPIKey)

# CoinGecko: live pricing, trading volume, tickers, exchanges, historical data, coin info & images, developer & community stats, events, global markets, and CoinGecko Beam coins & exchanges status updates
url = f'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
request(url)
