# -*- coding: utf8 -*-
import json, requests

functions = {
  'fetch': fetch
}

def main(event, context):
  return functions[event['function']](event['args'])

def fetch(url):
  r = requests.get(url).text
  return r
