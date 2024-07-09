# Task Management API

This task involves creating a Task Management API designed for managing tasks and team members. The API provides endpoints to manage tasks and team members, as well as validate input data and maintain relationships between entities.

## Table of Contents

- [Task Overview](#task-overview)
- [Entities and Relationships](#entities-and-relationships)
- [Data Validation](#data-validation)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)

## Task Overview

The Task Management API is designed to manage tasks and team members efficiently. This API allows you to:

- Retrieve, create, update, and delete tasks.
- Retrieve, create, update, and delete team members.
- Maintain a one-to-many relationship between team members and tasks.

## Entities and Relationships

### Tasks

- **taskId**: Integer (Primary Key)
- **Name**: String (Required)
- **Description**: String (Required)
- **status**: String
- **startDate**: Date
- **endDate**: Date

### Team Members

- **memberId**: Integer (Primary Key)
- **Name**: String
- **Email**: String (Required, Must be a valid email format)

**Relationship:** One-to-Many between Team Members and Tasks. A single member can have multiple tasks.

## Data Validation

- **Tasks**: Ensure that `Name` and `Description` fields are not empty.
- **Team Members**: Ensure that the `Email` field is a valid email format.

## API Endpoints

### Tasks API

- **GET /api/task**: Retrieve a list of all tasks.
- **GET /api/task/{id}**: Retrieve a specific task by ID.
- **POST /api/task**: Add a new task.
- **PUT /api/task/{id}**: Update an existing task.
- **DELETE /api/task/{id}**: Delete a task.

### Team Members API

- **GET /api/member**: Retrieve a list of all members.
- **GET /api/member/{id}**: Retrieve a specific member by ID.
- **POST /api/member**: Create a new member.
- **PUT /api/member/{id}**: Update an existing member.
- **DELETE /api/member/{id}**: Delete a member.

## Postman Collection

You can use the provided Postman collection to interact with the API. Import the collection into Postman using the following link:

[Postman Collection](https://www.postman.com/orbital-module-participant-44486098/workspace/my-workspace/collection/27667807-996dc90c-adee-42eb-af9f-4a0060318144?action=share&source=collection_link&creator=27667807)

### Postman Collection Details

**Members Endpoints:**

- **Create Member**: `POST /api/member/`
  - Request Body:
    ```json
    {
      "name": "{{$randomFullName}}",
      "email": "{{$randomEmail}}"
    }
    ```
- **Get All Members**: `GET /api/member`
- **Get Member by ID**: `GET /api/member/:id`
- **Update Member**: `PUT /api/member/:id`
  - Request Body:
    ```json
    {
      "name": "{{$randomFullName}}",
      "email": "{{$randomEmail}}"
    }
    ```
- **Delete Member**: `DELETE /api/member/:id`

**Tasks Endpoints:**

- **Create Task**: `POST /api/task/`
  - Request Body:
    ```json
    {
      "memberId": 2,
      "name": "name{{$randomInt}}",
      "description": "task description",
      "startDate": "2024/07/10",
      "endDate": "2024/07/10"
    }
    ```
- **Get All Tasks**: `GET /api/task/`
- **Get Task by ID**: `GET /api/task/:id`
- **Update Task**: `PUT /api/task/:id`
  - Request Body:
    ```json
    {
      "name": "test",
      "description": "task description",
      "status": "pending",
      "startDate": "2024-07-12",
      "endDate": "2024-07-14",
      "memberId": 1
    }
    ```
- **Delete Task**: `DELETE /api/task/:id`

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the server
    ```bash
    npm start
    ```
    or you can run it on dev mode
   ```bash
    npm run dev
    ```

## Environment Variables Example

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT="5000"
DB_URL="Your DB URL here"
DB_DIALECT="Your DB Dialect here" #example: "postgres"
SALT_ROUNDS="8"
