from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/login")
def login():
    return {
        "users": ["Alex", "Bob", "Frank"],
        "token": "secret-token"
    }


@app.route("/chart-data/<user>")
def chart_data(user):

    if user == "Alex":
        return {
            "users": ["Alex", "Bob", "Frank"]
        }
    elif user == "Bob":
        return {}

app.run()