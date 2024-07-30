
import React, { useState, useEffect } from 'react';
import './App.css';
import FlightStatus from './components/FlightStatus.jsx';
import NotificationComponent from './components/Notification.jsx'; // Import with alias
import { messaging, getToken, onMessage } from './firebase-config.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
const App = () => {
  const [flights, setFlights] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({
    flightNumber: '',
    arrivalCity: '',
    departureCity: '',
    date: ''
  });
  const Key = import.meta.env.VITE_Key;

  const fetchFlights = () => {
    const { flightNumber, arrivalCity, departureCity, date } = filters;
    let query = `http://localhost:5000/api/filtered-flights?`;
    if (flightNumber) query += `flightNumber=${flightNumber}&`;
    if (arrivalCity) query += `arrivalCity=${arrivalCity}&`;
    if (departureCity) query += `departureCity=${departureCity}&`;
    if (date) query += `date=${date}&`;

    if (query === 'http://localhost:5000/api/filtered-flights?') {
      // If no filters are applied, skip fetching data
      setFlights([]);
      setNotifications([]);
      return;
    }

    
    fetch(query.slice(0, -1))  // Remove trailing "&"
      .then(response => response.json())
      .then(data => {
        setFlights(data);
        const flightNotifications = data.map(flight => `Flight ${flight.flightNumber} is ${flight.status.toLowerCase()}.`);
        setNotifications(flightNotifications);
      })
      .catch(error => console.error('Error fetching flight data:', error));
  };

  useEffect(() => {
    fetchFlights();
  }, [filters]);

  // Request permission to receive notifications
  useEffect(() => {
    if ('Notification' in window) {
      window.Notification.requestPermission().then(permission => { // Use window.Notification
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // Get the token
          getToken(messaging, { vapidKey: Key }).then((currentToken) => {
            if (currentToken) {
              console.log('FCM Token:', currentToken);
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });

          // Listen for messages
          onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            // Handle the received message here
          });
        } else {
          console.log('Unable to get permission to notify.');
        }
      }).catch(err => console.error('Error requesting notification permission:', err));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <Header />
      <div className="filter-section">
        <input
          type="text"
          name="flightNumber"
          placeholder="Flight Number"
          value={filters.flightNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="arrivalCity"
          placeholder="Arrival City"
          value={filters.arrivalCity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="departureCity"
          placeholder="Departure City"
          value={filters.departureCity}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={filters.date}
          onChange={handleInputChange}
        />
        <button onClick={fetchFlights}>Apply Filters</button>
      </div>
      {flights.length > 0 ? (
  <>
    <div className="flight-list">
      {flights.map((flight, index) => (
        <FlightStatus key={index} flight={flight} />
      ))}
    </div>
    <div className="notification-list">
      {notifications.map((message, index) => (
        <NotificationComponent key={index} message={message} />
      ))}
    </div>
  </>
) : (
  <div className="placeholder-content p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-indigo-600 mb-4">IndiGo App with Benefits</h1>
    <p className="mb-4 text-gray-700">
      You can now bid adieu to the hassles that can impede your amazing flight experience with India's leading airline, IndiGo! With its top-notch connectivity, on-time performance, hassle-free travel, and courteous service, IndiGo has built its reputation as one of India's most reliable airlines. From hassle-free flight booking to smooth journeys, IndiGo makes flying effortless in all possible ways.
    </p>
    <p className="mb-4 text-gray-700">
      Once you book your flight tickets with IndiGo, you can check the flight status on the go from anywhere and at any time. IndiGo’s intuitive and user-friendly mobile app, as well as the website, lets you enjoy the convenience of checking your flight PNR status in a few simple steps which include entering your PNR number and other details related to your booking. When there is so much to offer, it's hard to imagine a better way to book your flights than with IndiGo, which meets all your travel needs in one place!
    </p>
    <h2 className="text-xl font-semibold text-indigo-500 mb-2">Why should you check flight status?</h2>
    <p className="mb-4 text-gray-700">
      There are instances when due to unforeseen circumstances, such as weather changes, the original flight schedule is impacted and compromised, due to which passengers may have to wait for several hours at the airport. Nevertheless, IndiGo values the time of its passengers and so to make your journey smoother, we recommend you use the 'flight tracker’ feature that can provide you with live flight updates. The flight tracker feature is applicable for both international and domestic flights so that passengers can keep a check on their flight schedule.
    </p>
    <p className="mb-4 text-gray-700">
      The flight tracker option not just helps you check the current status of your flight but also lets you plan your departure to the airport accordingly. Moreover, the flight tracker option available on the website is beneficial as you can plan your trip as per the current status, enabling you to plan your day ahead or even plan connecting flights to other destinations.
    </p>
    <h2 className="text-xl font-semibold text-indigo-500 mb-2">How to track PNR status?</h2>
    <p className="mb-4 text-gray-700">
      It's now possible to track flight PNR in real-time for all domestic flights, international flights as well as codeshare flights with IndiGo.
    </p>
    <p className="mb-4 text-gray-700">
      So, follow these steps and stay updated about your flight PNR status:
      <ol className="list-decimal list-inside ml-4 mb-4">
        <li>Visit the website goIndiGo.in or the IndiGo mobile app.</li>
        <li>Click on the ‘Flight Status’ tab on your respective device.</li>
        <li>Enter the departing and arriving destination.</li>
        <li>Enter your date of travel, flight number as well as PNR or booking reference number.</li>
        <li>After you have entered all the required information, click on the ‘Search Flight’ icon and get the relevant information on your flight status.</li>
      </ol>
    </p>
    <p className="mb-4 text-gray-700">
      Apart from the above-mentioned steps, there are certain points that you must keep in mind when you are booking flights with IndiGo, some of which are listed below:
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Remember to mention your own email ID and mobile number while making your booking, as IndiGo sends emails and SMS regarding any change in the flight status to the registered contact details.</li>
        <li>Along with tracking the flight status, also remember to do a free web check-in for both domestic and international flights.</li>
        <li>Also, stay updated on both domestic and international travel guidelines by visiting the state-wise guidelines section on the website.</li>
      </ul>
    </p>
    <h2 className="text-xl font-semibold text-indigo-500 mb-2">Track the live status for all your IndiGo flights</h2>
    <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
      <li>Domestic flight status</li>
      <li>International flight status</li>
      <li>Delhi to Pune Flight Status</li>
      <li>Mumbai to Delhi Flight Status</li>
      <li>Chandigarh to Delhi Flight Status</li>
      <li>Delhi to Mumbai Flight Status</li>
      <li>Pune to Delhi Flight Status</li>
      <li>Chennai to Delhi Flight Status</li>
      <li>Delhi to Ahmedabad Flight Status</li>
      <li>Delhi to Hyderabad Flight Status</li>
      <li>Delhi to Kolkata Flight Status</li>
      <li>Delhi to Chennai Flight Status</li>
      <li>Hyderabad to Delhi Flight Status</li>
      <li>Mumbai to Nagpur Flight Status</li>
      <li>Delhi to Indore Flight Status</li>
      <li>Surat to Delhi Flight Status</li>
      <li>Delhi to Surat Flight Status</li>
      <li>Delhi to Goa Flight Status</li>
      <li>Ahmedabad to Delhi Flight Status</li>
      <li>Kolkata to Delhi Flight Status</li>
      <li>Patna to Delhi Flight Status</li>
      <li>Mumbai to Chennai Flight Status</li>
      <li>Pune to Nagpur Flight Status</li>
      <li>Ranchi to Delhi Flight Status</li>
      <li>Delhi to Srinagar Flight Status</li>
      <li>Kolkata to Mumbai Flight Status</li>
      <li>Nagpur to Pune Flight Status</li>
      <li>Delhi to Bagdogra Flight Status</li>
      <li>Mumbai to Goa Flight Status</li>
      <li>Delhi to Patna Flight Status</li>
      <li>Chennai to Mumbai Flight Status</li>
    </ul>
    <h2 className="text-xl font-semibold text-indigo-500 mb-2">Frequently Asked Questions</h2>
    <p className="mb-4 text-gray-700"><strong>How can I get the real-time flight status?</strong></p>
    <p className="mb-4 text-gray-700">You can get a real-time status of IndiGo flights by taking advantage of the flight tracker feature.</p>
    <p className="mb-4 text-gray-700"><strong>How to track flight PNR status online?</strong></p>
    <p className="mb-4 text-gray-700">To track the flight PNR status, simply visit the flight status option on the IndiGo website or mobile app and enter the required information such as travel date, PNR number, flight number and others.</p>
    <p className="mb-4 text-gray-700"><strong>Can I use the flight tracker feature for IndiGo’s domestic and international flights?</strong></p>
    <p className="mb-4 text-gray-700">Yes, you can use IndiGo’s flight status to stay updated on both your domestic and international flights as well as codeshare flights.</p>
    <p className="mb-4 text-gray-700"><strong>Will I be informed of any delay if my scheduled IndiGo flight gets delayed or cancelled?</strong></p>
    <p className="mb-4 text-gray-700">Yes, in case of delay or cancellation, IndiGo takes the responsibility to notify passengers about the same on their registered mobile number or email ID.</p>
    <p className="mb-4 text-gray-700"><strong>What if I do not know IndiGo’s flight number for checking the flight status?</strong></p>
    <p className="mb-4 text-gray-700">Don't worry if you don't know the flight number, as you will find it on the flight ticket emailed to your registered email address by IndiGo.</p>
    <p className="mb-4 text-gray-700"><strong>What can I do if I am unable to track the flight status?</strong></p>
    <p className="mb-4 text-gray-700">In case you face any kind of inconvenience while checking the flight status, you can always contact our support team or alternatively chat with Dottie, our AI-powered chat assistant, to get all your queries sorted.</p>
    <div className="mt-6">
    <h2 className="text-lg font-bold text-indigo-600">2000+ Daily flights</h2>
    <h2 className="text-lg font-bold text-indigo-600">80+ Domestic Destinations</h2>
    <h2 className="text-lg font-bold text-indigo-600">30+ International Destinations</h2>
    <h2 className="text-lg font-bold text-indigo-600">500 Mn+ happy passengers</h2>
    <h2 className="text-lg font-bold text-indigo-600">300+ Fleet tall</h2>
    </div>
  </div>
)}


      <Footer />
    </div>
  );
};

export default App;
