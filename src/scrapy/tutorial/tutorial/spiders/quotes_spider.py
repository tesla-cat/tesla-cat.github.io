import scrapy

class QuotesSpider(scrapy.Spider):
    name = "quotes"
    start_urls = [
        f'https://chinese.javmodel.com/jav/homepages_list.php?page={page+1}' for page in range(146)
    ]

    def parse(self, response):
        page = response.url.split("page=")[-1]
        filename = f'quotes-{page}.html'
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log(f'Saved file {filename}')