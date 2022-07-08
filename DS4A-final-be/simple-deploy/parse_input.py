import numpy as np
import os 
from PIL import Image
import tensorflow as tf

class Neural_Network_Tester:

    def __init__(self):
        self.model = None
        self.data = None
        self.ground_t = None

    def load_data(self, folder_path, images_folder_name, ground_truth_file_name, img_size:tuple):
        """
        Load the images and ground truth from path
        """
        images = []
        for img_name in os.listdir('/'.join([folder_path, images_folder_name])):
            images.append(Image.open(img_name).resize(img_size))
        
        # To numpy array
        self.data = np.asarray(images)

        # Load the classes of the images
        classes = []
        with open('/'.join([folder_path, ground_truth_file_name], mode='r')) as file:
            for line in file:
                classes.append(line.split('_')[1])

        self.ground_t = np.asarray(classes)

    def load_model(self, model_dir):
        self.model = tf.keras.models.load_model(model_dir)

    def test_model(self):
        results = self.model.evaluate(self.data, self.ground_t, return_dict=True)
        return results