from flask import Flask, request

app = Flask(__name__)


@app.route("/login")
def login():
    return {
        "users": ["Alex", "Bob", "Frank"]
    }


@app.route("/chart-data/<user>")
def chart_data(user):

    if user == "Alex":
        return {
            "users": ["Alex", "Bob", "Frank"]
        }
    elif user == "Bob":
        return {}
