from flask import Blueprint, request
from controllers.volunteer_controller import get_volunteer_info, add_volunteer_info, update_volunteer_info

# Define a blueprint
volunteer_bp = Blueprint('volunteer_bp', __name__)

# route for specific volunteer information
@volunteer_bp.route('/volunteer/get/<id>', methods=['GET'])
def get_info(id):
    return get_volunteer_info(id)

# route to add a volunteer
@volunteer_bp.route('/volunteer/add', methods=['POST'])
def add_info():
    return add_volunteer_info(request)

# route to update a volunteer
@volunteer_bp.route('/volunteer/update', methods=['POST'])
def update_info():
    return update_volunteer_info(request)
