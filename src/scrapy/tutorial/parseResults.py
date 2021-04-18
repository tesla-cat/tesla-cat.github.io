
from scrapy.selector import Selector
import pathlib, os, json

parentPath = pathlib.Path(__file__).parent.absolute()

files = [ f'quotes-{page+1}.html' for page in range(146) ]

allResults = []

def safeText(text):
    return '' if text is None else text 

for fileName in files:
    with open(os.path.join(parentPath, fileName), 'r', encoding='utf-8') as f:
        body = f.read()
    # rooms-item fl-wrap
    results = Selector(text=body).css('.rooms-item')
    for i, result in enumerate(results):
        image = result.css('img').attrib['data-original']
        name =  result.css('.ayanEffects').css('a::text').get()
        tags =  result.css('.list-single-tags').css('a::text').getall()

        info = []
        for infoItem in result.css('h5'):
            key = safeText( infoItem.css('::text').get() )
            value = safeText( infoItem.css('span::text').get() )
            try:
                info.append( key + value )
            except Exception as e:
                print(str(e), key, value)
                assert 0
        results[i] = { "image": image, "name": name, "info": info, "tags": tags }
        allResults.append(results[i])
        #print(len(allResults), results[i]["name"])

with open(os.path.join(parentPath, 'girls.json'), 'w') as f:
    json.dump(allResults, f)
    