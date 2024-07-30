
from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, messaging
from pymongo import MongoClient
import os
from dotenv import load_dotenv

cred = credentials.Certificate('./secrets/flight-status-f1e30-firebase-adminsdk-drs37-126dd64435.json')
firebase_admin.initialize_app(cred)

load_dotenv() 

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
db_connection_string = os.getenv('DB_CONNECTION_STRING')
MONGO_URI = os.getenv('MONGO_URI', db_connection_string)
client = MongoClient(MONGO_URI)
db = client['Flights-Data']
flights_collection = db['Cluster1']

@app.route('/api/flights', methods=['GET'])
def get_flights():
    flights = list(flights_collection.find({}, {'_id': 0}))  # Exclude the _id field
    return jsonify(flights)

@app.route('/api/filtered-flights', methods=['GET'])
def get_filtered_flights():
    flight_number = request.args.get('flightNumber')
    arrival_city = request.args.get('arrivalCity')
    departure_city = request.args.get('departureCity')
    date = request.args.get('date')

    query = {}
    if flight_number:
        query['flightNumber'] = flight_number
    if arrival_city:
        query['arrivalCity'] = arrival_city
    if departure_city:
        query['departureCity'] = departure_city
    if date:
        query['date'] = date

    flights = list(flights_collection.find(query, {'_id': 0}))
    return jsonify(flights)

@app.route('/api/send-notification', methods=['POST'])
def send_notification():
    request_data = request.get_json()
    message = messaging.Message(
        notification=messaging.Notification(
            title=request_data['title'],
            body=request_data['body'],
        ),
        token=request_data['token'],
    )
    response = messaging.send(message)
    return jsonify({'response': response})

@app.route('/api/update-flight-status', methods=['POST'])
def update_flight_status():
    request_data = request.get_json()
    flight_number = request_data['flightNumber']
    new_status = request_data['status']
    token = request_data['token']

    # Update the flight status in the database
    result = flights_collection.update_one(
        {'flightNumber': flight_number},
        {'$set': {'status': new_status}}
    )

    if result.matched_count:
        # Send notification
        message = messaging.Message(
            notification=messaging.Notification(
                title=f"Flight {flight_number} Update",
                body=f"The status of flight {flight_number} has changed to {new_status}.",
            ),
            token=token,
        )
        response = messaging.send(message)
        print('Successfully sent message:', response)

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
