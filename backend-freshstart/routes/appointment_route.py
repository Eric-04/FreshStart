from flask import Blueprint, request
from controllers.appointment_controller import get_appointments, get_appointment_info, add_appointment_info, update_appointment_info

# Define a blueprint
appointment_bp = Blueprint('appointment_bp', __name__)

# route for general appointment information
@appointment_bp.route('/appointment/get', methods=['GET'])
def get_infos():
    return get_appointments()

# route for specific appointment information
@appointment_bp.route('/appointment/get/<id>', methods=['GET'])
def get_info(id):
    return get_appointment_info(id)

# route to add an appointment
@appointment_bp.route('/appointment/add', methods=['POST'])
def add_info():
    return add_appointment_info(request)

# route to update an appointment
@appointment_bp.route('/appointment/update', methods=['POST'])
def update_info():
    return update_appointment_info(request)
