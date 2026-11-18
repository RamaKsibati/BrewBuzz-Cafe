
# BrewBuzz Backend

This is the backend server for the BrewBuzz Application, built using Node.js, Express.js, and PostgreSQL. It handles user authentication, database interactions, and other core backend functionality.


## 1. Project Overview

This project includes:  
- **Sign-Up API**: Allows users to register as `Customer` or `Business`.  
- **Login API**: Validates credentials and provides secure access.  
- **Database Integration**: Uses PostgreSQL for persistent storage.  

---

## 2. Technologies Used

- **Node.js**: JavaScript runtime environment.  
- **Express.js**: Fast, lightweight backend framework.  
- **PostgreSQL**: Relational database for data storage.  
- **Bcrypt**: Password hashing for security.  
- **Nodemon**: Development server with auto-reloading.  
- **Dotenv**: Environment variable management.  

---

## 3. Setup Instructions

### 3.1 Clone the Repository
```bash
git clone <repository-url>
cd brewbuzz-backend
```

### 3.2 Install Dependencies
```bash
npm install
```



### 3.4 Start the Server
- **Production mode**:
  ```bash
  npm start
  ```
- **Development mode (with live reload)**:
  ```bash
  npm run dev
  ```

---

## 4. Database Setup

### 4.1 Connect to PostgreSQL:
```bash
psql -U postgres
```

### 4.2 Create the `brewbuzz_db` database:
```bash
CREATE DATABASE brewbuzz_db;
```

### 4.3 Connect to the database:
```bash
\c brewbuzz_db
```



### 4.5 Verify the table creation:
```bash
\dt
```

---

## 5. Available APIs

### 5.1 Sign-Up API
- **Endpoint**: `POST /api/signup`
- **Description**: Registers a new user (Customer or Business).
- **Request Body**:
  ```json
  {
      "full_name": "John Doe",
      "email": "john@example.com",
      "password": "securePassword123",
      "state": "Michigan",
      "zipcode": "48104",
      "user_category": "Customer"
  }
  ```
- **Response**:
  ```json
  {
      "message": "User registered successfully",
      "user": {
          "id": 1,
          "email": "john@example.com",
          "user_category": "Customer"
      }
  }
  ```

### 5.2 Login API
- **Endpoint**: `POST /api/login`
- **Description**: Authenticates a user and verifies credentials.
- **Request Body**:
  ```json
  {
      "email": "john@example.com",
      "password": "securePassword123"
  }
  ```
- **Response**:
  ```json
  {
      "message": "Login successful",
      "user": {
          "id": 1,
          "full_name": "John Doe",
          "email": "john@example.com",
          "user_category": "Customer"
      }
  }
  ```

---

## 6. Run Commands

### 6.1 Install dependencies:
```bash
npm install
```

### 6.2 Run in production mode:
```bash
npm start
```

### 6.3 Run in development mode (with auto-reload):
```bash
npm run dev
```

### 6.4 Database migration (manual SQL setup):
```bash
psql -U postgres -d brewbuzz_db -f schema.sql
```

---

## 7. Dependencies

The project uses the following libraries:

```json
"dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "pg": "^8.11.0"
},
"devDependencies": {
    "nodemon": "^3.0.3"
}
```
