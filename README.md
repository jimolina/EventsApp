
# 🚀 How to run this project locally

## 1. Clone the repository

```bash
git clone https://github.com/jimolina/EventsApp.git
cd your-repo
```

## 2. Create the .env file

Use this example file `.env.example` and create a new one called `.env`:

```bash
# MongoDB root credentials (used during container initialization)
MONGO_INITDB_ROOT_USERNAME=username_here
MONGO_INITDB_ROOT_PASSWORD=your_username_password_here

# Application MongoDB access (used by backend like Fastify)
MONGO_DB_NAME=events_db
MONGO_USER=username_here
MONGO_PASS=your_username_password_here
MONGO_HOST=mongo
MONGO_DB=events_db
MONGODB_URI=mongodb://username_here:your_username_password_here@mongo:27017/events_db?authSource=admin

```


## 3. Install dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../backend
npm install
```

## 4. Start the application with Docker Compose

From the project root, run:

```bash
docker-compose up --build
```

This will:

- Start the MongoDB container with predefined database and credentials.
- Run an initialization script that:
  - Creates the database `events_db`.
  - Creates the collection `events_entries` with some sample data.
- Start the backend at [http://localhost:3000](http://localhost:3000).
- Start the frontend at [http://localhost:5173](http://localhost:5173).

## 5. Verify the app in the browser

Open your browser at:

[http://localhost:5173](http://localhost:5173)

You should see the application running and be able to make requests to the backend using MongoDB as the database.

# 🛠 Requirements

- Docker and Docker Compose
- Node.js (v18 or higher recommended) — only needed if working outside Docker
