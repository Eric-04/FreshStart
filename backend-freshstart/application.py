from flask import Flask, jsonify, request
from flask_cors import CORS

import os
from dotenv import load_dotenv
from pathlib import Path

from mongodb import mongo_db

# load .env file
dotenv_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=dotenv_path)

# get the port
STATUS = os.getenv('STATUS')

if STATUS == 'development':  PORT = os.getenv('DEV_PORT')
elif STATUS == 'production': PORT = os.getenv('PROD_PORT')
else: raise ValueError("no status")

application = Flask(__name__)
CORS(application)

@application.route('/')
def home():
    return "Welcome to the Flask app with MongoDB!"

@application.route('/databases', methods=['GET'])
def get_databases():
    databases = mongo_db.list_databases()
    return jsonify(databases)

@application.route('/data/<db_name>', methods=['GET'])
def create_database(db_name):
    db = mongo_db.get_database(db_name)
    if db is not None:
        return jsonify({"message": f"Database '{db_name}' returned!"})
    return jsonify({"message": f"Database '{db_name}' not found!"})

if __name__ == '__main__':
    application.run(debug=True, port=PORT)