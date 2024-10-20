from flask import jsonify, Request
from mongodb import mongo_db

def get_organizations():
    organizations = mongo_db.get_organization_collection()
    organization = organizations.find()
    if organization is None:
        return jsonify({"error": "Organizations not found"}), 404
    result = []
    for app in organization:
        result.append({k : app[k] for k in app if k != 'id' and k != '_id'})
    return jsonify(result), 201

def get_organization_info(id):
    organizations = mongo_db.get_organization_collection()
    organization = organizations.find_one({"id" : id})
    if organization is None:
        return jsonify({"error": "Organization not found"}), 404
    result = {k : organization[k] for k in organization if k != 'id' and k != '_id'}
    return jsonify(result), 201

def add_organization_info(request : Request):
    data = request.get_json()
    organizations = mongo_db.get_organization_collection()

    organization = {
        "id": data.get('id'),
        "name": data.get('name'),
        "street_address": data.get('street_address'),
        "city": data.get('city'),
        "state": data.get('state'),
        "opening_time": data.get('opening_time'),
        "closing_time": data.get('closing_time')
    }
    result = organizations.insert_one(organization)
    return jsonify({"message": "Organization added successfully!", "organization": organization['name']}), 201

def update_organization_info(request : Request):
    data = request.get_json()
    organizations = mongo_db.get_organization_collection()

    result = organizations.update_one(
        {"id": data.get('id')},
        {"$set": {
            "name": data.get('name'),
            "street_address": data.get('street_address'),
            "city": data.get('city'),
            "state": data.get('state'),
            "opening_time": data.get('opening_time'),
            "closing_time": data.get('closing_time')
        }}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Organization not found"}), 404
    else:
        return jsonify({"message": "Organization updated successfully!", "organization": organizations['name']}), 201