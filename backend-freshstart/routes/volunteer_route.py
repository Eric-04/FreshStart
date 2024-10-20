from flask import Blueprint, request
from controllers.volunteer_controller import get_volunteer_info, add_volunteer_info, update_volunteer_info

# Define a blueprint
volunteer_bp = Blueprint('volunteer_bp', __name__)

# Route for general contact information
@volunteer_bp.route('/volunteer/get/<id>')
def get_info(id):
    return get_volunteer_info(id)

# Route to add a contact
@volunteer_bp.route('/volunteer/add', methods=['POST'])
def add_info():
    return add_volunteer_info(request)

# Route to get a specific contact
@volunteer_bp.route('/volunteer/add/get', methods=['GET'])
def update_info():
    return update_volunteer_info(request)
