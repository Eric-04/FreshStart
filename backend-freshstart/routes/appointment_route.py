from flask import Blueprint, request
from controllers.appointment_controller import get_appointment_info, add_appointment_info, update_appointment_info

# Define a blueprint
appointment_bp = Blueprint('appointment_bp', __name__)

# Route for general contact information
@appointment_bp.route('/appointment/get/<id>')
def get_info(id):
    return get_appointment_info(id)

# Route to add a contact
@appointment_bp.route('/appointment/add', methods=['POST'])
def add_info():
    return add_appointment_info(request)

# Route to get a specific contact
@appointment_bp.route('/appointment/add/get', methods=['GET'])
def update_info():
    return update_appointment_info(request)
