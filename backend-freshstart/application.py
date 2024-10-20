from flask import Flask
from flask_cors import CORS

import os
from dotenv import load_dotenv
from pathlib import Path

from routes.home_route import home_bp
from routes.organization_route import organization_bp
from routes.restaurant_route import restaurant_bp

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

application.register_blueprint(home_bp)
application.register_blueprint(organization_bp)
application.register_blueprint(restaurant_bp)

if __name__ == '__main__':
    application.run(debug=True, port=PORT)