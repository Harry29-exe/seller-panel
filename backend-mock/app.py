import math
import random

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/login")
def login():
    return {
        "users": ["Alex", "Bob", "Frank"],
        "token": "secret-token"
    }


def generate_chart_value(rand, i, length, multiplayer):
    return (math.cos((4 * math.pi) * (i / length)) + 1.2) * rand.uniform(0.75, 1.5) * multiplayer


low_multiplayer = 0.6
high_multiplayer = 1.4


def generate_first_chart_value(rand, multiplayer):
    return rand.uniform(low_multiplayer * multiplayer, high_multiplayer * multiplayer)


def generate_next_chart_value(rand, multiplayer, last_value):
    return ((rand.uniform(last_value * low_multiplayer, last_value * high_multiplayer)
             + last_value
             + generate_first_chart_value(rand, multiplayer))
            / 3)


def generate_data1(length, seed, multiplayer):
    rand = random.Random(seed)
    multi = multiplayer * 10
    data = [{
        "x": 1,
        "y1": generate_first_chart_value(rand, multi),
        "y2": generate_first_chart_value(rand, multi)
    }]
    for i in range(1, length):
        data.append({
            "x": i + 1,
            "y1": generate_next_chart_value(rand, multi, data[i - 1]["y1"]),
            "y2": generate_next_chart_value(rand, multi, data[i - 1]["y2"])
        })

    return data


def generate_data2(length, seed, multiplayer):
    rand = random.Random(seed)
    multi = multiplayer * 1
    data = []
    for i in range(length):
        data.append({
            "x": i + 1,
            "y1": generate_chart_value(rand, i, length, multi),
            "y2": generate_chart_value(rand, i, length, multi)
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
        "yearValue": generate_data1(12, 1 + seed, 3500),
        "monthValue": generate_data1(31, 2 + seed, 350),
        "dayValue": generate_data1(24, 3 + seed, 35),
        "yearUnits": generate_data1(12, 4 + seed, 100),
        "monthUnits": generate_data1(31, 5 + seed, 10),
        "dayUnits": generate_data1(24, 6 + seed, 1)
    }


@app.route("/opinions")
def opinions():
    return {}


app.run()
