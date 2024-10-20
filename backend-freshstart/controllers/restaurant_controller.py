from flask import jsonify, Request
from mongodb import mongo_db

def get_restaurant_info(id):
    restaurants = mongo_db.get_restaurant_collection()
    restaurant = restaurants.find_one({"id" : int(id)})
    if restaurant is None:
        return jsonify({"error": "Restaurant not found"}), 404
    result = {k : restaurant[k] for k in restaurant if k != 'id' and k != '_id'}
    return jsonify(result), 201

def add_restaurant_info(request : Request):
    data = request.get_json()
    restaurants = mongo_db.get_restaurant_collection()
    restaurant_id = request.args.get('id', type=int)

    restaurant = {
        "id": restaurant_id,
        "name": data.get('name'),
        "street_address": data.get('address'),
        "city": data.get('city'),
        "state": data.get('state')
    }
    result = restaurants.insert_one(restaurant)
    return jsonify({"message": "Restaurant added successfully!", "restaurant": restaurant['name']}), 201

def update_restaurant_info(request : Request):
    data = request.get_json()
    restaurants = mongo_db.get_restaurant_collection()
    restaurant_id = request.args.get('id', type=int)

    result = restaurants.update_one(
        {"id": restaurant_id},
        {"$set": {
            "name": data.get('name'),
            "address": data.get('address'),
            "city": data.get('city'),
            "state": data.get('state')
        }}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Restaurant not found"}), 404
    else:
        return jsonify({"message": "Restaurant updated successfully!", "restaurant": restaurants['name']}), 201