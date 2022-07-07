from flask import Flask, request, jsonify
from PIL import Image
from manager import ContainerManager

import numpy as np

app = Flask(__name__)
manager = ContainerManager()

@app.route("/")
def home():
    return "<p>Le serveur est activé!!!</p>"

@app.route("/load-img", methods=['POST'])
def load_img():
    bin_img = request.files['image']
    code = request.files['code']
    manager.create_container(code)

    manager.prune()
    return jsonify({'msg': 'success'})


@app.route("/get-code", methods=['GET'])
def get_code():
    return jsonify({'code': manager.get_unique_id()})

