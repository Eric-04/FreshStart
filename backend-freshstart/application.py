from flask import Flask, jsonify, request
from flask_cors import CORS

import os
from dotenv import load_dotenv
from pathlib import Path

def setup_port():
    # load .env file
    dotenv_path = Path(__file__).resolve().parent / '.env'
    load_dotenv(dotenv_path=dotenv_path)

    # get the port
    STATUS = os.getenv('STATUS')

    if STATUS == 'development':  port = os.getenv('DEV_PORT')
    elif STATUS == 'production': port = os.getenv('PROD_PORT')
    else: raise ValueError("no status")

    return port

application = Flask(__name__)
CORS(application)

@application.route('/', methods=['GET'])
def home():
    return "this is the main page"

@application.route('/', methods=['POST'])
def post_data():
    # Retrieve data from the request's JSON payload
    request_data = request.get_json()

    # Your logic to process or store the data goes here
    processed_data = {'message': 'Data received successfully', 'received_data': request_data}

    # put data into DBMS
    # result = collection.insert_many(request_data)

    return jsonify(processed_data)

if __name__ == '__main__':
    PORT = setup_port()

    application.run(debug=True, port=PORT)