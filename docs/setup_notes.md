# Setup Guide - Smart Budget Tracker

This guide provides step-by-step instructions to set up and run the Smart Budget Tracker project locally.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL Server](https://www.mysql.com/)
- [Git](https://git-scm.com/)
- Postman (optional, for testing APIs)

## Clone the Repository
git clone <url>
cd smart-budget-tracker-Prjct/backend

##  Install Dependencies
Initialize Node and install required packages:
```bash
npm install
```

**Dependencies used:**
- express
- mysql2
- bcryptjs
- jsonwebtoken
- dotenv
- nodemon (for development)
- json2csv (csv export functionality)

## Configure the Database

1. Open MySQL and create a database:
   ```sql
   CREATE DATABASE smart_budget_tracker;
   ```

2. Import the schema:
   ```sql
   SOURCE backend/db/schema.sql;
   ```

3. Update your database credentials in `backend/config/db.js`:
   ```js
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'yourpassword',
     database: 'smart_budget_tracker'
   });

 ##  Create Environment Variables
In the project root, create a `.env` file:
```bash
JWT_SECRET=your_jwt_secret_key
PORT=4000
```
##Run the Server
```bash
npm start
```

Server should start on:
```
http://localhost:4000
```
Open smart-budget-tracker-Prjct/frontend/index.html
The frontend communicates automatically with the backend running on port 4000.

Test the API
Use Postman to test endpoints:
- **POST** `/register`
- **POST** `/login`
- **GET** `/profile` (use JWT token)
- **GET** `/transactions/:id` (use JWT token)
- **GET** `/transactions/` (use JWT token)
- **POST** `/transactions/` (use JWT token)
- **GET** `/summary/` (use JWT token)
- **GET** `/summmonthly-summaryary/` (use JWT token)
- **GET** `/category-totals/` (use JWT token)
- **POST** `/goals/` (use JWT token)
- **GET** `/goals/` (use JWT token)
- **GET** `/export/csv/` (use JWT token)

Refer to screenshots in `/docs/test_week1.docx`.
Refer to screenshots in `/docs/test_week2.docx`.
Refer to screenshots in `/docs/test_week3.docx`.
Refer to screenshots in `/docs/test_week4.docx`.
Refer to screenshots in `/docs/test_week5-6.docx`.

## Troubleshooting
- **Database connection error:** Check credentials in `db.js` and ensure MySQL is running.  
- **JWT error:** Ensure `.env` file has a valid secret key.  
- **Port in use:** Change the `PORT` in `.env`.