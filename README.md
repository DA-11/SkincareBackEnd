# SkincareBackEnd
Express Backend with API's for a Skincare website 
This repository contains the backend code for a skincare website built using Express.js. It provides a comprehensive set of APIs for managing users, products, shopping carts, and orders. The backend is integrated with MongoDB using Mongoose for data storage and retrieval, and it utilizes JSON Web Tokens (JWT) for user authentication and Bcrypt for password hashing.

Please note that this project does not currently include a payment API,for which I plan to work on soon.

This backend uses JWT (JSON Web Tokens) for user authentication. To access protected endpoints, you need to include a valid JWT in the Authorization header of your requests.

To obtain a JWT token, you can use the /Login endpoint to log in with valid credentials. The server will respond with a token that you can use for subsequent authenticated requests.
Authorization: Bearer your-token-here.

