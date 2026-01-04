# Cost Manager – RESTful Web Services

## General Description

This project was developed as part of the **Asynchronous Server-Side Development** course. It implements a RESTful backend system for managing costs (Cost Manager) and is intended to serve as the server side for a future client application.

The system enables user management, adding cost items, generating monthly reports, viewing logs, and accessing administrative information, fully complying with the official course requirements.

---

## Technologies

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Pino (Logging)
* dotenv (.env)
* JavaScript (according to the course Style Guide)

---

## Project Structure (Conceptual)

```
project-root/
│
├── models/              # Mongoose schemas and MongoDB interaction
│   ├── user.model.js
│   ├── cost.model.js
│   └── log.model.js
│
├── routes/              # REST API endpoints
│   ├── users.js
│   ├── costs.js
│   ├── reports.js
│   └── admin.js
│
├── services/            # Business logic (including Computed Design Pattern)
├── logs/                # Log handling (dedicated process)
├── tests/               # Unit tests
│
├── app.js               # Express app initialization
├── server.js            # Server entry point
├── .env                 # Environment variables
├── package.json
└── README.md
```

---

## Database

The system uses **MongoDB Atlas** and includes at least the following collections:

### Users Collection

Required fields:

* `id` (Number)
* `first_name` (String)
* `last_name` (String)
* `birthday` (Date)

> Note: `id` and `_id` are different properties and must not be mixed.

### Costs Collection

Required fields:

* `description` (String)
* `category` (String) – supported categories: food, health, housing, sports, education
* `userid` (Number)
* `sum` (Double)
* `date` (Date – automatically generated if not provided)

### Logs Collection

Log records are saved for:

* Every HTTP request received by the server
* Every endpoint access

---

## API Endpoints

### Add User

**POST** `/api/add`

Request Body (JSON):

```json
{
  "id": 123123,
  "first_name": "mosh",
  "last_name": "israeli",
  "birthday": "1990-01-01"
}
```

---

### Add Cost Item

**POST** `/api/add`

Request Body (JSON):

```json
{
  "description": "choco",
  "category": "food",
  "userid": 123123,
  "sum": 12
}
```

---

### Monthly Report

**GET** `/api/report?id=123123&year=2025&month=11`

The report generation follows the **Computed Design Pattern**:

* Reports for past months are stored and reused for future requests
* Reports for the current or future months are calculated dynamically

---

### Get User Details

**GET** `/api/users/:id`

Returns:

* `first_name`
* `last_name`
* `id`
* `total` (total costs for the user)

---

### Get All Users

**GET** `/api/users`

---

### Developers Team

**GET** `/api/about`

Returns a JSON document containing only:

* `first_name`
* `last_name`

---

### Logs

**GET** `/api/logs`

---

## Error Handling

All error responses are returned as JSON objects and include at least:

* `id`
* `message`

---

## Processes

The project includes **four processes**:

1. Logs handling
2. User-related operations
3. Cost-related operations and reports
4. Administrative operations (e.g., developers information)

---

## Unit Tests

* Unit tests were developed for all endpoints
* The testing language and libraries were chosen by the development team

---

## Environment Variables (.env)

Example:

```
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
```

---

## Deployment

* The project is deployed on a web-connected server
* Each process runs separately
* The deployment URL is submitted via the required form

---

## Submission Default Data

At submission time, the database contains a single imaginary user only:

```
id: 123123
first_name: mosh
last_name: israeli
```

---

## Notes

* All incoming data is validated
* The code follows the official course JavaScript Style Guide
* Required comments were added to the code

---

© Final Project – Asynchronous Server-Side Development Course
