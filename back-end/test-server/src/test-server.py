import requests
import os
import json
import base64

# Test url
url_post = 'http://127.0.0.1:5000/load-img'
url_get = 'http://127.0.0.1:5000/get-code'

# Get the current path
cur_path = os.getcwd()

# Changes the current directory to the parent folder
parent_path = cur_path.split('/')
parent_path.pop()
os.chdir('/'.join(parent_path))

code = requests.get(url_get).json()
print(code)

test_img = {
    'image': open('/'.join([os.getcwd(), 'test-imgs', 'input_67_7_11.jpg']), 'rb'),
    'code': code['code']
}

response = requests.post(url_post, files=test_img)
print(response.json())