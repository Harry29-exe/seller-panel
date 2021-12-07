import math
import random

from flask import Flask, jsonify
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


@app.route("/opinions/<user>")
def opinions(user):
    if user == "Alex":
        return jsonify([
            {
                "rating": 2,
                "name": "Bob",
                "comment": "Sed rhoncus porta turpis ac ornare. Fusce accumsan, ante nec suscipit venenatis, nulla nisl venenatis diam, a commodo nulla justo ac libero."
            },
            {
                "rating": 4,
                "name": "Emma",
                "comment": "Sed vitae ante in risus tincidunt cursus in vitae odio. Phasellus rhoncus interdum nisi vitae tincidunt. Sed suscipit diam libero,"
                           " nec sagittis massa consectetur nec. Donec dignissim felis mauris, eget pellentesque sapien elementum a. Proin mollis luctus metus nec "
                           "lobortis. Vestibulum id venenatis mauris. Donec mollis scelerisque turpis. In vel arcu a nunc feugiat porta vitae at ante. Curabitur ac"
                           " tortor pulvinar, interdum nulla quis, fermentum mauris. Vestibulum purus est, dignissim quis sodales at, vulputate at orci. Suspendisse "
                           "molestie cursus velit, ut suscipit dolor eleifend sed. Aenean euismod vestibulum sapien, ut tincidunt lacus cursus at. Pellentesque non lorem elit. "
                           "In hac habitasse platea dictumst. Cras nec elit sit amet massa vehicula cursus."
            },
            {
                "rating": 4,
                "name": "Alice",
                "comment": "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus tempor nunc non quam congue condimentum."
            },
            {
                "rating": 5,
                "name": "Steve"
            },
            {
                "rating": 5,
            },
            {
                "rating": 3,
                "name": "John",
                "comment": "Phasellus viverra lacus ut sapien fermentum volutpat."
            },
            {
                "rating": 1,
                "name": "Barbra"
            }
        ])
    else:
        return jsonify([])


@app.route("/orders-count/<user>")
def get_orders_count(user):
    if user == "Alex":
        return {
            "notSend": 16,
            "notPaid": 21,
            "returns": 5
        }
    elif user == "Frank":
        return {
            "notSend": 13,
            "notPaid": 9,
            "returns": 3
        }
    else:
        return {
            "notSend": 0,
            "notPaid": 0,
            "returns": 0
        }

app.run()
