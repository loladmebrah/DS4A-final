import random
import tensorflow as tf
from flask import Flask, request, jsonify
from PIL import Image
from parse_input import Neural_Network_Tester

app = Flask(__name__)
PATH_TO_IMG_FOLDER = './files/data'
PATH_TO_MODEL_FOLDER = './files'

@app.route("/", methods=["GET", "POST"])
def home():
    return "<p>Le serveur est activé!!!</p>"

@app.route("/load-img", methods=['POST'])
def load_img():
    try:
        # Retrieves the image as binary data
        bin_img = request.files['image']
        code = request.files['code']
        ground_t = request.files['ground_t']
        id = request.files['id']

        # Sends the image
        img = Image.open(bin_img)
        img.save('files/{}.jpeg'.format(id))
        
        # Saves the class of the image
        with open('/files/data/{id}.txt'.format(id), 'w') as file:
            file.write('{}_{}'.format(id, ground_t))
            
    except Exception as e:
        print(e)

    # Success message 
    return jsonify({'msg': 'success'})

@app.route("/get-code", methods=['GET'])
def get_code():
    #return jsonify({'code': manager.get_unique_id()})
    return jsonify({'code': random.randint(0, 6666)})

@app.route("/load-model", methods=["POST"])
def load_model():

    # Retreives the model 
    bin_model = request.files['model']
    code = request.files['code']

    # Sends the model
    model = tf.saved_model.load(bin_model)
    model.save('files/{}.h5'.format(code))

    return jsonify({'msg': 'success'})

@app.route("/test-model", methods=["GET"])
def test_model():
    tester = Neural_Network_Tester()
    tester.load_data(PATH_TO_IMG_FOLDER)
    tester.load_model(PATH_TO_MODEL_FOLDER)

    results = tester.test_model()
    
    return jsonify(results)

app.run(host='0.0.0.0', port=80)


