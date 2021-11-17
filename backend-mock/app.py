import math
import random

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


def generate_data(length, seed, multiplayer):
    rand = random.Random(seed)
    data = []
    for i in range(length):
        data.append({
            "x": i+1,
            "y1": (math.cos( (4 * math.pi) * (i / length) ) + 1.2) * rand.uniform(0.75, 1.5) * multiplayer,
            "y2": (math.cos( (4 * math.pi) * (i / length) ) + 1.2) * rand.uniform(0.75, 1.5) * multiplayer
        })

    return data


@app.route("/chart-data/<user>")
def chart_data(user):
    seed = 0
    if user == "Alex":
        seed = 0
    elif user == "Bob":
        seed = 100
    elif user == "Frank":
        seed = 1000

    return {
        "yearValue": generate_data(12, 1 + seed, 1000),
        "monthValue": generate_data(31, 2 + seed, 100),
        "dayValue": generate_data(24, 3 + seed, 10),
        "yearUnits": generate_data(12, 4 + seed, 100),
        "monthUnits": generate_data(31, 5 + seed, 10),
        "dayUnits": generate_data(24, 6 + seed, 1)
    }


app.run()
