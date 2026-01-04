Cost Manager RESTful Web Services 

Welcome to the Cost Manager RESTful Web Services project! This application was developed as part of the Asynchronous Server-Side Development course. It provides a backend system for managing users’ expenses, generating monthly reports, and supporting efficient cost tracking and budgeting.

The project strictly follows the official course requirements and implements all mandatory features, endpoints, and architectural constraints.

📊 Database

Database Type: MongoDB (MongoDB Atlas)

The database design follows the Computed Design Pattern to efficiently generate and store monthly reports for past months.

Collections
1️⃣ users (Default User Exists)
Property	Type	Example
id	Number	123123
first_name	String	"mosh"
last_name	String	"israeli"
birthday	Date	"1990-01-01"

⚠️ Important: id and _id are different properties and must not be mixed.

Default User in Database:

{
  "id": 123123,
  "first_name": "mosh",
  "last_name": "israeli",
  "birthday": "1990-01-01"
}
2️⃣ costs (Initially Empty)

Each document represents a single cost item.

Property	Type
description	String
category	String
userid	Number
sum	Double
date	Date

Supported Categories:

food

health

housing

sports

education

Costs are added only for existing users. Adding costs with dates in the past is not allowed.

3️⃣ logs

The logs collection stores log entries created using the Pino logging library.

Log records are created:

For every HTTP request received by the server

Whenever an endpoint is accessed

🛠️ Application

The application is built using:

Node.js

Express.js

Mongoose

MongoDB Atlas

Pino

dotenv (.env)

It exposes RESTful Web Services that can be consumed by a frontend client.

🚀 API Endpoints
1️⃣ Add User

POST /api/add

Purpose: Add a new user to the system.

Required Parameters:

id

first_name

last_name

birthday

Example Request:

{
  "id": 123123,
  "first_name": "mosh",
  "last_name": "israeli",
  "birthday": "1990-01-01"
}
2️⃣ Add Cost Item

POST /api/add

Purpose: Add a new cost item for an existing user.

Required Parameters:

description

category

userid

sum

If the date is not provided, the server assigns the current date and time.

Example Request:

{
  "userid": 123123,
  "description": "Groceries",
  "category": "food",
  "sum": 100
}
3️⃣ Monthly Report

GET /api/report

Purpose: Retrieve a monthly cost report for a specific user.

Required Query Parameters:

id

year

month

Computed Design Pattern:

Reports for past months are calculated once and saved

Future requests for the same past report return the stored result

Example Request:

/api/report?id=123123&year=2025&month=11

Example Response:

{
  "userid": 123123,
  "year": 2025,
  "month": 11,
  "costs": [
    { "food": [ { "sum": 100, "description": "Groceries", "day": 10 } ] },
    { "health": [] },
    { "housing": [] },
    { "sports": [] },
    { "education": [] }
  ]
}
4️⃣ Get User Details

GET /api/users/:id

Purpose: Retrieve details of a specific user.

Response Includes:

first_name

last_name

id

total (total sum of all user costs)

5️⃣ Get All Users

GET /api/users

Returns a list of all users in the system.

6️⃣ Developers Team

GET /api/about

Returns a JSON document containing only the first and last names of the development team members.

7️⃣ Logs

GET /api/logs

Returns all log records stored in the logs collection.

❗ Error Handling

All error responses are returned as JSON objects and include at least:

id

message

🔄 Processes

The project includes four separate processes:

Logs handling

User-related operations

Cost-related operations and reports

Administrative operations (e.g., developers information)

🧪 Unit Tests

Unit tests were developed for all endpoints

The testing language and libraries were chosen by the development team

⚙️ Environment Variables (.env)

Example:

PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
🌐 Deployment

The project is deployed on a web-connected server

Each process runs independently

The deployment URL is provided as part of the submission requirements

📌 Submission Default Data

At submission time, the database contains only one imaginary user:

id: 123123
first_name: mosh
last_name: israeli
📝 Notes

All incoming data is validated

The code follows the official course JavaScript Style Guide

Required comments were added to the code

© Final Project – Asynchronous Server-Side Development Course
