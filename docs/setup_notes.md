# Setup Guide - Smart Budget Tracker

This guide provides step-by-step instructions to set up and run the Smart Budget Tracker project locally.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL Server](https://www.mysql.com/)
- [Git](https://git-scm.com/)
- Postman (optional, for testing APIs)

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
Test the API
Use Postman to test endpoints:
- **POST** `/register`
- **POST** `/login`
- **GET** `/profile` (use JWT token)

Refer to screenshots in `/docs/test_week1docx`.

## Troubleshooting
- **Database connection error:** Check credentials in `db.js` and ensure MySQL is running.  
- **JWT error:** Ensure `.env` file has a valid secret key.  
- **Port in use:** Change the `PORT` in `.env`.