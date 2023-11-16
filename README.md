# Backend-NodeJS


 # API Endpoints README

This document provides an overview of the endpoints available in the API, including their purposes and expected usage.

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [User Endpoints](#user-endpoints)
4. [Group Endpoints](#group-endpoints)
5. [Association Endpoints](#association-endpoints)

## 1. Introduction

This API serves as a platform for managing users, groups, and associations between users and groups. It includes authentication mechanisms to ensure secure access to the available endpoints.

## 2. Authentication

### 2.1 Login
- **Endpoint:** `POST /login`
- **Description:** Authenticate a user and generate a JWT token for subsequent requests.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response:**
  - Successful Login:
    ```json
    {
      "email": "user@example.com",
      "token": "generated-jwt-token"
    }
    ```
  - Authentication Failure:
    ```json
    {
      "message": "Not authorized"
    }
    ```

## 3. User Endpoints

### 3.1 Create User
- **Endpoint:** `POST /users`
- **Description:** Create a new user.
- **Authentication:** Requires a valid JWT token with superadmin role.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - Successful Creation:
    ```json
    {
      "name": "test",
      "email": "test@gmail.com",
      "password": "$2b$10$9RlczxBrZtehW4aGo/CxYee2.FjLSdeebh7dbT1YPPquQzjYdxqhS",
      "groups": [],
      "_id": "6555912c5c35167ae96e6afd",
      "createdAt": "2023-11-16T03:49:00.556Z",
      "updatedAt": "2023-11-16T03:49:00.556Z",
      "role": "user",
      "__v": 0
    }
    ```
  - User Already Exists:
    ```json
    {
      "message": "User already exists"
    }
    ```

### 3.2 Get All Users
- **Endpoint:** `GET /users`
- **Description:** Retrieve a list of all users.
- **Authentication:** Requires a valid JWT token.
  - Successful Retrieval:
    ```json
    [
      {
          "_id": "65557ca9418f423a13089801",
          "name": "Jualian Bolaños",
          "email": "julbol@outlook.com",
          "password": "$2b$10$cgeiEq9utwC.x1Np4x5uaOIUaYAPVkFyt7tYXcq/3a96rbfknCkTe",
          "groups": [
              "6555866abfacf340cfe5fb6d"
          ],
          "createdAt": "2023-11-16T02:21:29.985Z",
          "updatedAt": "2023-11-16T03:07:45.060Z",
          "role": "user",
          "__v": 0
      },
      {
          "_id": "65557cbf418f423a13089804",
          "name": "Leonardo Bustamante",
          "email": "leobust@outlook.com",
          "password": "$2b$10$CGPgFi2dbGad7dAqLoJmHOB29t.YcH6mU33ABzaiya1xgCZVVG3ay",
          "groups": [],
          "createdAt": "2023-11-16T02:21:51.679Z",
          "updatedAt": "2023-11-16T02:21:51.679Z",
          "role": "user",
          "__v": 0
      }
    ]
    ```

### 3.3 Get User by ID
- **Endpoint:** `GET /users/:id`
- **Description:** Retrieve user details by user ID.
- **Authentication:** Requires a valid JWT token.
- **Response:**
  - Successful Retrieval:
    ```json
    {
      "_id": "65557cbf418f423a13089804",
      "name": "Leonardo Bustamante",
      "email": "leobust@outlook.com",
      "password": "$2b$10$CGPgFi2dbGad7dAqLoJmHOB29t.YcH6mU33ABzaiya1xgCZVVG3ay",
      "groups": [],
      "createdAt": "2023-11-16T02:21:51.679Z",
      "updatedAt": "2023-11-16T02:21:51.679Z",
      "role": "user",
      "__v": 0
    }
    ```
  - User Not Found:
    ```json
    {
      "message": "User not found"
    }
    ```

### 3.4 Update User
- **Endpoint:** `PUT /users/:id`
- **Description:** Update user details by user ID.
- **Authentication:** Requires a valid JWT token with superadmin role.
- **Request Body:**
  ```json
  {
    "name": "Juan Camilo Zorrilla",
    "email": "juanmiloz@hotmail.com",
    "password":"Password"
  }
  ```
- **Response:**
  - Successful Update:
    ```json
    {
      "_id": "65557cec418f423a1308980a",
      "name": "Juan Camilo Zorrilla",
      "email": "juanmiloz@hotmail.com",
      "password": "$2b$10$UxN6KKJ98tZglh8Nun33E.0b9o2FlK4z4Xgkfwi6jJT9S5ewH0nzy",
      "groups": [
          "6555866abfacf340cfe5fb6d",
          "6555869cbfacf340cfe5fb73",
          "655586a8bfacf340cfe5fb76"
      ],
      "createdAt": "2023-11-16T02:22:36.455Z",
      "updatedAt": "2023-11-16T03:54:33.483Z",
      "role": "user",
      "__v": 0
    }
    ```
  - User Not Found:
    ```json
    {
      "message": "User not found"
    }
    ```

### 3.5 Delete User
- **Endpoint:** `DELETE /users/:id`
- **Description:** Delete a user by user ID.
- **Authentication:** Requires a valid JWT token with superadmin role.
- **Response:**
  - Successful Deletion:
    ```json
    {
      "message": "User deleted successfully"
    }
    ```
  - User Not Found:
    ```json
    {
      "message": "User not found"
    }
    ```

### 3.6 Get User's Groups
- **Endpoint:** `GET /users/:id/group`
- **Description:** Retrieve the groups to which a user belongs.
- **Authentication:** Requires a valid JWT token.

## 4. Group Endpoints

### 4.1 Create Group
- **Endpoint:** `POST /groups`
- **Description:** Create a new group.
- **Authentication:** Requires a valid JWT token.
- **Request Body:**
  ```json
  {
    "name": "Example Group"
  }
  ```
- **Response:**
  - Successful Creation:
    ```json
    {
      "name": "Example Group",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```
  - Group Already Exists:
    ```json
    {
      "message": "Group already exists"
    }
    ```

### 4.2 Get All Groups
- **Endpoint:** `GET /groups`
- **Description:** Retrieve a list of all groups.
- **Authentication:** Requires a valid JWT token.

### 4.3 Get Group by ID
- **Endpoint:** `GET /groups/:id`
- **Description:** Retrieve group details by group ID.
- **Authentication:** Requires a valid JWT token.
- **Response:**
  - Successful Retrieval:
    ```json
    {
      "name": "Example Group",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```
  - Group Not Found:
    ```json
    {
      "message": "Group not found"
    }
    ```

### 4.4 Update Group
- **Endpoint:** `PUT /groups/:id`
- **Description:** Update group details by group ID.
- **Authentication:** Requires a valid JWT token.
- **Request Body:**
  ```json
  {
    "name": "Updated Group Name"
  }
  ```
- **Response:**
  - Successful Update:
    ```json
    {
      "name": "Updated Group Name",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```
  - Group Not Found:
    ```json
    {
      "message": "Group not found"
    }
    ```

### 4.5 Delete Group
- **Endpoint:** `DELETE /groups/:id`
- **Description:** Delete a group by group ID.
- **Authentication:** Requires a valid JWT token.
- **Response:**
  - Successful Deletion:
    ```json
    {
      "message": "Group deleted successfully"
    }
    ```
  - Group Not Found:
    ```json
    {
      "message": "Group not found"
    }
    ```

### 4.6 Get Group's Users
- **Endpoint:** `GET /groups/:id/users`
- **Description:** Retrieve the users belonging to a group.
- **Authentication:** Requires a valid JWT token.

## 5. Association Endpoints

### 5.1 Add User to Group
- **Endpoint:** `POST /associations/:groupID/:userID`
- **Description:** Add a user to a group.
- **Authentication:** Requires a valid JWT token.
- **Response:**
  - Successful Addition:
    ```json
    {
      "message": "User successfully added to the group"
    }
    ```
  -

 User Already in Group:
    ```json
    {
      "message": "The user is already in the group"
    }
    ```

### 5.2 Remove User from Group
- **Endpoint:** `DELETE /associations/:groupID/:userID`
- **Description:** Remove a user from a group.
- **Authentication:** Requires a valid JWT token.
- **Response:**
  - Successful Removal:
    ```json
    {
      "message": "User successfully removed from the group"
    }
    ```
  - User Not in Group:
    ```json
    {
      "message": "The user is not in the group"
    }
    ```



# Project Execution Guide

This guide provides step-by-step instructions on how to set up and run the project. The project is built with Yarn and TypeScript, using technologies such as Express, MongoDB with Mongoose, JWT for authentication, and Zod for schema validation.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or accessible)

## Installation

1. Clone the project repository to your local machine:

    ```bash
    https://github.com/juanmiloz/Backend-NodeJS.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Backend-NodeJS
    ```

3. Install dependencies using Yarn:

    ```bash
    yarn install
    ```

## Configuration

1. Create a `.env` file in the project root and configure the following environment variables:

    ```env
    PORT=3000
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
    ```

    Replace `your-mongodb-connection-string` with the connection string for your MongoDB instance and `your-secret-key` with a secret key for JWT token generation.

## Build

Compile TypeScript files to JavaScript:

```bash
yarn build
```

## Run the Application

Start the server:

```bash
yarn start
```

The server will be running at `http://localhost:3000` (or the port specified in your `.env` file).

## Development Mode

If you want to run the application in development mode with automatic restarts on file changes, use:

```bash
yarn dev
```

This uses `nodemon` and `ts-node` to watch for changes in the `src` directory.

## Testing Endpoints

You can use a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the provided endpoints documented in the [API Endpoints README](#api-endpoints-readme).

Make sure to include the necessary headers and request payloads according to the endpoint requirements.
