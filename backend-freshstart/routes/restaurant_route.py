from flask import Blueprint, request
from controllers.restaurant_controller import get_restaurants, get_restaurant_info, add_restaurant_info, update_restaurant_info

# Define a blueprint
restaurant_bp = Blueprint('restaurant_bp', __name__)

# route for general restaurant information
@restaurant_bp.route('/restaurant/get', methods=['GET'])
def get_infos():
    return get_restaurants()

# route for specific restaurant information
@restaurant_bp.route('/restaurant/get/<id>', methods=['GET'])
def get_info(id):
    return get_restaurant_info(id)

# route to add an restaurant
@restaurant_bp.route('/restaurant/add', methods=['POST'])
def add_info():
    return add_restaurant_info(request)

# route to update an restaurant
@restaurant_bp.route('/restaurant/update', methods=['POST'])
def update_info():
    return update_restaurant_info(request)
