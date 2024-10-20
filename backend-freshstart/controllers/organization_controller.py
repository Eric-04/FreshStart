from flask import jsonify, Request
from mongodb import mongo_db

def get_organization_info(id):
    organizations = mongo_db.get_organization_collection()
    organization = organizations.find_one({"id" : int(id)})
    if organization is None:
        return jsonify({"error": "Organization not found"}), 404
    result = {k : organization[k] for k in organization if k != 'id' and k != '_id'}
    return jsonify(result), 201

def add_organization_info(request : Request):
    data = request.get_json()
    organizations = mongo_db.get_organization_collection()
    organization_id = request.args.get('id', type=int)

    organization = {
        "id": organization_id,
        "name": data.get('name'),
        "street_address": data.get('address'),
        "city": data.get('city'),
        "state": data.get('state')
    }
    result = organizations.insert_one(organization)
    return jsonify({"message": "Organization added successfully!", "organization": organization['name']}), 201

def update_organization_info(request : Request):
    data = request.get_json()
    organizations = mongo_db.get_organization_collection()
    organization_id = request.args.get('id', type=int)

    result = organizations.update_one(
        {"id": organization_id},
        {"$set": {
            "name": data.get('name'),
            "address": data.get('address'),
            "city": data.get('city'),
            "state": data.get('state')
        }}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Organization not found"}), 404
    else:
        return jsonify({"message": "Organization updated successfully!", "organization": organizations['name']}), 201