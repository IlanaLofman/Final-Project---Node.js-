#  Cost Manager RESTful Web Services 

Welcome to the **Cost Manager RESTful Web Services** project.
This backend application was developed as part of the *Asynchronous Server-Side Development* course and enables users to manage expenses, track spending, and generate monthly cost reports.

The project fully complies with the official course requirements.

---

## 📊 Database

**Database Type:** MongoDB (MongoDB Atlas)

The database design implements the **Computed Design Pattern** for efficient generation and reuse of monthly reports.

### Collections

#### users

* `id` (Number)
* `first_name` (String)
* `last_name` (String)
* `birthday` (Date)

⚠️ `id` and `_id` are different properties and are not mixed.

**Default User:**

```json
{
  "id": 123123,
  "first_name": "mosh",
  "last_name": "israeli",
  "birthday": "1990-01-01"
}
```

#### costs

* `description` (String)
* `category` (String)
* `userid` (Number)
* `sum` (Double)
* `date` (Date)

**Supported Categories:** food, health, housing, sports, education

#### logs

* Stores log records created using **Pino**
* Logs are written for every HTTP request and endpoint access

---

## 🛠️ Application

Built with **Node.js**, **Express.js**, **Mongoose**, **MongoDB Atlas**, **Pino**, and **dotenv**.

---

## 🚀 API Endpoints

### Add User

**POST** `/api/add`

Required: `id`, `first_name`, `last_name`, `birthday`

---

### Add Cost Item

**POST** `/api/add`

Required: `description`, `category`, `userid`, `sum`

If the date is not provided, the server assigns the current date.

---

### Monthly Report

**GET** `/api/report?id=USER_ID&year=YYYY&month=MM`

Returns a monthly report grouped by categories.
Past-month reports are stored according to the **Computed Design Pattern**.

---

### Get User Details

**GET** `/api/users/:id`

Returns: `first_name`, `last_name`, `id`, `total`

---

### Additional Endpoints

* **GET** `/api/users` – list of all users
* **GET** `/api/about` – developers first and last names only
* **GET** `/api/logs` – list of all logs

---

## ❗ Error Handling

All errors are returned as JSON objects containing at least:

* `id`
* `message`

---

## 🔄 Processes

The system is implemented using **four processes**:

1. Logs handling
2. Users handling
3. Costs and reports handling
4. Administrative operations

---

## 🧪 Unit Tests

Unit tests were developed for all endpoints.

---

## ⚙️ Environment Variables

```
PORT=3000
MONGO_URI=MongoDB_Atlas_Connection_String
```

---

## 🌐 Deployment

The application is deployed on a web-connected server, with each process running independently.

---

## 📝 Notes

* All incoming data is validated
* The code follows the official JavaScript Style Guide

---

© Final Project – Asynchronous Server-Side Development Course
