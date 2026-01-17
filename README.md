# Cost Manager - Microservices Architecture

This project implements four separate microservices for a Cost Manager RESTful API.

## Project Structure

```
Final-Project---Node.js-/
├── logs-service/          # Logs microservice (port 3003)
│   ├── server.js
│   └── package.json
├── users-service/         # Users microservice (port 3001)
│   ├── server.js
│   └── package.json
├── costs-service/         # Costs microservice (port 3002)
│   ├── server.js
│   └── package.json
├── admin-service/         # Admin microservice (port 3004)
│   ├── server.js
│   └── package.json
├── models/                # Shared MongoDB models
├── routes/                # Shared route files
├── utils/                 # Shared utilities
├── tests/                 # Unit tests
├── app.js                 # Integration test app
└── .env                   # Environment variables (shared)
```

## Installation & Running

### Local Development

Install dependencies for all services:

```bash
cd logs-service && npm install && cd ..
cd users-service && npm install && cd ..
cd costs-service && npm install && cd ..
cd admin-service && npm install && cd ..
npm install  # Install root dependencies for testing
```

Start each service in separate terminals:

```bash
# Terminal 1: Logs Service
cd logs-service && npm start

# Terminal 2: Users Service
cd users-service && npm start

# Terminal 3: Costs Service
cd costs-service && npm start

# Terminal 4: Admin Service
cd admin-service && npm start
```

### Running Tests

```bash
npm test
```

## Services & Endpoints

- **Logs Service** (port 3003): `GET /api/logs`
- **Users Service** (port 3001): 
  - `GET /api/users`
  - `GET /api/users/:id`
  - `POST /api/add` (add user)
- **Costs Service** (port 3002): 
  - `POST /api/add` (add cost)
  - `GET /api/report?id=USER_ID&year=YEAR&month=MONTH`
- **Admin Service** (port 3004): `GET /api/about`

## Deployment

Each service can be deployed independently:

```bash
# Deploy logs-service
cd logs-service && npm start

# Deploy users-service
cd users-service && npm start

# Deploy costs-service
cd costs-service && npm start

# Deploy admin-service
cd admin-service && npm start
```

For production deployment on platforms like Render, Heroku, or Railway, use the respective `server.js` as the entry point for each service.

## Environment Variables

Create `.env` file in project root with:

```
MONGO_URI=mongodb+srv://...
LOGS_PORT=3003
USERS_PORT=3001
COSTS_PORT=3002
ADMIN_PORT=3004
NODE_ENV=production
```

## Shared Resources

- `models/`: MongoDB schemas (user.js, cost.js, log.js, report.js)
- `routes/`: API route handlers used by all services
- `utils/`: Helper functions (errorResponse.js)

