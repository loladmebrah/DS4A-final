from flask import Flask

app = Flask(__main__)

@app.route("/")
def home_process():
    return "<p>Uff que serviciooo!!!</p>"