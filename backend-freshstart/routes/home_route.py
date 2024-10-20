from flask import Blueprint, request
from controllers.restaurant_controller import get_restaurant_info, add_restaurant_info, update_restaurant_info

# Define a blueprint
home_bp = Blueprint('home_bp', __name__)

@home_bp.route('/')
def home():
    return "Welcome to the Flask app with MongoDB!"