import requests
import json
import random
import time
import csv

edgexip = '172.28.48.1'
i = 0

if __name__ == "__main__":

    with open("./data.csv", 'r') as file:
        csvreader = csv.reader(file) 
        for row in csvreader:
            
            if i == 0: 
                i = i + 1
                continue

            url = 'http://%s:49986/api/v1/resource/SensorValueCluster2/co2' % edgexip
            payload = int(row[1])
            headers = {'content-type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers, verify=False)
            print(response)

            time.sleep(5)