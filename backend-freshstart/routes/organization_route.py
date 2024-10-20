from flask import Blueprint, request
from controllers.organization_controller import get_organizations, get_organization_info, add_organization_info, update_organization_info

# Define a blueprint
organization_bp = Blueprint('organization_bp', __name__)

# route for general organization information
@organization_bp.route('/organization/get', methods=['GET'])
def get_infos():
    return get_organizations()

# route for specific organization information
@organization_bp.route('/organization/get/<id>', methods=['GET'])
def get_info(id):
    return get_organization_info(id)

# route to add an organization
@organization_bp.route('/organization/add', methods=['POST'])
def add_info():
    return add_organization_info(request)

# route to update an organization
@organization_bp.route('/organization/update', methods=['POST'])
def update_info():
    return update_organization_info(request)
