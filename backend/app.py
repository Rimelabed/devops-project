from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/hello")
def hello():
    return jsonify(message="Hello from Backend Flask!")

@app.route("/status")
def status():
    return jsonify(status="OK", version="1.0.0")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
