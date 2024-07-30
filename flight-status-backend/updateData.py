import random
from datetime import datetime, timedelta
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv() 

db_connection_string = os.getenv('DB_CONNECTION_STRING')

MONGO_URI = db_connection_string
client = MongoClient(MONGO_URI)
db = client['Flights-Data']
flights_collection = db['Cluster1']

cities = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Pune", "Jaipur", "Goa"]
flight_status = ["On Time", "Delayed", "Cancelled"]
gates = ["A1", "A2", "B1", "B2", "C1", "C2"]

def random_date(start, end):
    return start + timedelta(days=random.randint(0, int((end - start).days)))

def generate_flight_data(num_flights):
    flights = []
    for _ in range(num_flights):
        departure_city = random.choice(cities)
        arrival_city = random.choice(cities)
        while departure_city == arrival_city:
            arrival_city = random.choice(cities)
        
        start_date = datetime.now()
        end_date = start_date + timedelta(days=90)  # 3 months range
        departure_time = random_date(start_date, end_date)
        arrival_time = departure_time + timedelta(hours=random.randint(1, 5))  # random flight duration between 1 to 5 hours
        
        flight = {
            "flightNumber": f"AI{random.randint(100, 999)}",
            "departureCity": departure_city,
            "arrivalCity": arrival_city,
            "status": random.choice(flight_status),
            "departureTime": departure_time.isoformat(),
            "arrivalTime": arrival_time.isoformat(),
            "gate": random.choice(gates)
        }
        flights.append(flight)
    
    return flights

# Generate 100 random flights
num_flights = 100
random_flights = generate_flight_data(num_flights)

# Insert the random flights into the collection
flights_collection.insert_many(random_flights)
print(f"{num_flights} random flights data inserted.")
