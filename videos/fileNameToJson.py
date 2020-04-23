import os
import json

directory = os.fsencode('./')
videos = []

for file in os.listdir(directory):
  filename = os.fsdecode(file)
  if filename.endswith(".mp4") : 
    print(filename)
    videos.append(filename)

with open('videos.json','w') as f:
  json.dump(videos,f)
print('finished')
