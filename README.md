# blog_app
# Node.js Blog Application with MongoDB and JWT Token Authentication

This is a simple blog application built with Node.js, MongoDB, and JWT token authentication. It allows users to create, read, update, and delete blog posts.

## Features

- User registration and login using JWT token authentication
- Create, read, update, and delete blog posts
- User authorization to ensure only authenticated users can perform certain actions
- MongoDB for data storage
- Express.js for handling HTTP requests and routes
- Mongoose as the ODM (Object Data Modeling) library for MongoDB
- Bcrypt for password hashing
- JWT (JSON Web Tokens) for user authentication and authorization

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tabishine/blog-app.git


2. Change into the project directory: ```bash
 cd blog-app
3. Install the dependencies: ```bash npm install

4. Set up the environment variables:  Create a .env file in the project root.
- Define the following environment variables in the .env file:
- MONGODB_URI: The connection URL for your MongoDB database.
- JWT_SECRET: A secret key for JWT token generation and verification.
5. Start the application: ```bash
npm start
6. Access the application in your browser at http://localhost:3000.

## API Routes

The application exposes the following API routes:

POST `/register` Register a new user.

POST `/login` Authenticate a user and generate a JWT token.

POST `/createpost` Create a new blog post.

PUT `/updatepost/:id` Update a specific blog post by ID.

DELETE `/deletepost/:id` Delete a specific blog post by ID.

