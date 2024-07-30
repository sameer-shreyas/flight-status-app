# Flight Status App

This is a full-stack web application for monitoring flight status and receiving notifications.

## Setup

### Frontend

1. Navigate to the `FLIGHT-STATUS-APP` directory.
2. Create a `.env` file with the following content:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    VITE_Key=your_key
    ```
3. Run the frontend application:
    ```bash
    npm install
    npm run dev
    ```

### Backend

1. Navigate to the `flight-status-backend` directory.
2. Create a `.env` file with the following content:
    ```env
    DB_CONNECTION_STRING=your_database_connection_string
    ```
3. Place the Firebase Admin SDK JSON file in a `secrets` directory:
    ```bash
    mkdir secrets
    mv path/to/flight-status-f1e30-firebase-adminsdk-drs37-126dd64435.json secrets/
    ```
4. Run the backend application:
    ```bash
    pip install -r requirements.txt
    flask run
    ```

## License

[MIT](LICENSE)
