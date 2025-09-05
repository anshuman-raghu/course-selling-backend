# Course Selling Backend

This is a backend application for a course-selling platform. It provides APIs for user and admin authentication, course management, and course purchasing.

## Technologies Used

  * **Express.js**: Web framework for Node.js
  * **Mongoose**: MongoDB object modeling tool
  * **MongoDB**: NoSQL database
  * **bcrypt**: Password hashing library
  * **jsonwebtoken**: JSON Web Token implementation for authentication
  * **dotenv**: Loads environment variables from a `.env` file
  * **nodemon**: Utility that monitors for changes in your source and automatically restarts the server

## API Endpoints

The API is structured with separate routes for admin, user, and public course-related actions. The base URL for all endpoints is `http://localhost:3000/api/v1`.

### User Routes (`/api/v1/user`)

  * `POST /signup`: Register a new user
  * `POST /login`: Authenticate and log in a user, receiving a JWT token in return
  * `GET /purchased-courses`: Retrieve all courses purchased by the authenticated user

### Admin Routes (`/api/v1/admin`)

  * `POST /signup`: Register a new admin
  * `POST /login`: Authenticate and log in an admin, receiving a JWT token in return
  * `POST /create-course`: Create a new course. Requires an admin JWT token
  * `PUT /update-course/:courseId`: Update an existing course. Requires an admin JWT token and course ownership
  * `DELETE /delete-course/:courseId`: Delete a course. Requires an admin JWT token and course ownership
  * `GET /courses`: Retrieve all courses created by the authenticated admin

### Course Routes (`/api/v1/course`)

  * `GET /preview`: Get a preview of all available courses without authentication
  * `POST /purchase`: Purchase a course. Requires a user JWT token

## Postman Collection

A Postman collection is available for testing the API endpoints. You can import the `Course Selling Backend.postman_collection.json` file into your Postman application. The collection uses a `base_url` variable that is set to `http://localhost:3000/api/v1`.
