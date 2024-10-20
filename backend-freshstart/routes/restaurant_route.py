from flask import Blueprint, request
from controllers.restaurant_controller import get_restaurant_info, add_restaurant_info, update_restaurant_info

# Define a blueprint
restaurant_bp = Blueprint('restaurant_bp', __name__)

# Route for general contact information
@restaurant_bp.route('/restaurant/get/<id>')
def get_info(id):
    return get_restaurant_info(id)

# Route to add a contact
@restaurant_bp.route('/restaurant/add', methods=['POST'])
def add_info():
    return add_restaurant_info(request)

# Route to get a specific contact
@restaurant_bp.route('/restaurant/add/get', methods=['GET'])
def update_info():
    return update_restaurant_info(request)
