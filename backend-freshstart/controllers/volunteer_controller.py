from flask import jsonify, Request
from mongodb import mongo_db

def get_volunteer_info(id):
    volunteers = mongo_db.get_volunteer_collection()
    volunteer = volunteers.find_one({"id" : id})
    if volunteer is None:
        return jsonify({"error": "Volunteer not found"}), 404
    result = {k : volunteer[k] for k in volunteer if k != 'id' and k != '_id'}
    return jsonify(result), 201

def add_volunteer_info(request : Request):
    data = request.get_json()
    volunteers = mongo_db.get_volunteer_collection()

    volunteer = {
        "id": data.get('id'),
        "name": data.get('name'),
        "city": data.get('city'),
        "state": data.get('state')
    }
    result = volunteers.insert_one(volunteer)
    return jsonify({"message": "Volunteer added successfully!", "Volunteer": volunteer['name']}), 201

def update_volunteer_info(request : Request):
    data = request.get_json()
    volunteers = mongo_db.get_volunteer_collection()

    result = volunteers.update_one(
        {"id": data.get('id')},
        {"$set": {
            "name": data.get('name'),
            "city": data.get('city'),
            "state": data.get('state')
        }}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Volunteer not found"}), 404
    else:
        return jsonify({"message": "Volunteer updated successfully!", "Volunteer": volunteers['name']}), 201