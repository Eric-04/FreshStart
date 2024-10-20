from flask import jsonify, Request
from mongodb import mongo_db

def get_appointments():
    appointments = mongo_db.get_appointment_collection()
    appointment = appointments.find()
    if appointment is None:
        return jsonify({"error": "Appointments not found"}), 404
    result = []
    for app in appointment:
        result.append({k : app[k] for k in app if k != 'id' and k != '_id'})
    return jsonify(result), 201

def get_appointment_info(id):
    appointments = mongo_db.get_appointment_collection()
    appointment = appointments.find_one({"id" : id})
    if appointment is None:
        return jsonify({"error": "Appointment not found"}), 404
    result = {k : appointment[k] for k in appointment if k != 'id' and k != '_id'}
    return jsonify(result), 201

def add_appointment_info(request : Request):
    data = request.get_json()
    appointments = mongo_db.get_appointment_collection()

    appointment = {
        "id": data.get('id'),
        "restaurant_name": data.get('restaurant_name'),
        "day": data.get('day'),
        "start_time": data.get('start_time'),
        "end_time": data.get('end_time'),
        "pounds": data.get('pounds')
    }
    result = appointments.insert_one(appointment)
    return jsonify({"message": "Appointment added successfully!", "appointment": appointment['restaurant_name']}), 201

def update_appointment_info(request : Request):
    data = request.get_json()
    appointments = mongo_db.get_appointment_collection()

    result = appointments.update_one(
        {"id": data.get('id')},
        {"$set": {
            "restaurant_name": data.get('restaurant_name'),
            "day": data.get('day'),
            "start_time": data.get('start_time'),
            "end_time": data.get('end_time'),
            "pounds": data.get('pounds')
        }}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Appointment not found"}), 404
    else:
        return jsonify({"message": "Appointment updated successfully!", "appointment": appointments['restaurant_name']}), 201