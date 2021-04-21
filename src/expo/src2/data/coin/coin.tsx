
export { coinType }

const coinMetric0 = {
  "status": {
      "elapsed": 116,
      "timestamp": "2021-04-21T18:47:49.524686017Z"
  },
  "data": {
      "parameters": {
          "asset_key": "dogecoin",
          "asset_id": "7d793fa7-5fc6-432a-b26b-d1b10769d42e",
          "start": "2020-08-08T18:47:49.448833177Z",
          "end": "2021-04-21T18:47:49.448833177Z",
          "interval": "1d",
          "order": "ascending",
          "format": "json",
          "timestamp_format": "unix-milliseconds",
          "columns": [
              "timestamp",
              "revenue_usd"
          ]
      },
      "schema": {
          "metric_id": "min.rev.usd",
          "description": "The sum USD value of all miner revenue, which constitutes fees plus newly issued native units, represented as the US dollar amount earned if all native units were sold at the closing price on the same day.",
          "values_schema": {
              "timestamp": "Time in milliseconds since the epoch (1 January 1970 00:00:00 UTC)",
              "revenue_usd": "The sum USD value of all miner revenue during the specified time interval"
          },
          "minimum_interval": "1d",
          "source_attribution": [
              {
                  "name": "Coinmetrics",
                  "url": "https://coinmetrics.io"
              },
              {
                  "name": "Kaiko",
                  "url": "https://www.kaiko.com/"
              }
          ]
      },
      "values": [ [ 1, 2 ] ]
  }
}
type coinType = { [metricID: string]: typeof coinMetric0 }
