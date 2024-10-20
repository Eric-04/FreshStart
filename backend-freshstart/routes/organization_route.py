from flask import Blueprint, request
from controllers.organization_controller import get_organization_info, add_organization_info, update_organization_info

# Define a blueprint
organization_bp = Blueprint('organization_bp', __name__)

# Route for general contact information
@organization_bp.route('/organization/get/<id>')
def get_info(id):
    return get_organization_info(id)

# Route to add a contact
@organization_bp.route('/organization/add', methods=['POST'])
def add_info():
    return add_organization_info(request)

# Route to get a specific contact
@organization_bp.route('/organization/add/get', methods=['GET'])
def update_info():
    return update_organization_info(request)
