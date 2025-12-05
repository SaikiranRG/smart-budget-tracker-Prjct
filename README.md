# smart-budget-tracker-Prjct
The **Smart Budget Tracker** is a web-based application designed to help users manage their income and expenses efficiently.  
It provides secure authentication, expense tracking and budget visualization features.  

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Authentication:** JWT (JSON Web Tokens), bcrypt  
- **Testing:** Postman  
- **Version Control:** Git & GitHub  

## Contributors
Sai Kiran Reddy Gokula, Email: SaikiranReddyGokul@lewisu.edu

## Setup Instructions
See the setup_notes.md file for detailed setup steps.

## API Endpoints
### **POST /register**
Registers a new user.  

### **POST /login**
Authenticates user and returns JWT token.

### **GET /profile**
Fetches user profile (requires JWT token).  

### **POST /transactions**
Adds user transactions (requires JWT token).

### **GET /transactions**
Fetches user transactions (requires JWT token).

### **GET /summary**
Fetches Summary details (requires JWT token).

### **GET /category-totals**
Fetches total amount of each category details (requires JWT token).

### **GET /monthly-summary**
Fetches Monthly summary details (requires JWT token).

### **POST /goals**
Save or update a goal (requires JWT token).

### **GET /goals**
Fetches goal summary details (requires JWT token).

### **GET /export/csv**
Fetches all user transactions as a CSV file. (requires JWT token).

## Application
<URL> coming sooon.....