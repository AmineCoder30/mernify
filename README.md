# mernify
---

MERN Chat App

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, and Node.js) along with Socket.IO for real-time messaging. Users can send messages, upload images, and communicate seamlessly with one another in this full-stack chat application.

Features

User Authentication: Register and login with secure authentication.

Real-Time Messaging: Instant messaging using Socket.IO.

Image Uploading: Users can upload images to the chat, with a progress bar to track upload status.

Responsive Design: Works on both desktop and mobile devices.

Typing Indicators: Show typing indicators for active conversations.

Message History: Save chat history in MongoDB.

Notifications: Get notifications for new messages.


Technologies Used

Frontend: React, Redux (if applicable), CSS/SCSS

Backend: Node.js, Express

Database: MongoDB

Real-Time Communication: Socket.IO

File Upload: Multer (for image uploads)


Installation

1. Clone the repository

git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app


**2. Install dependencies**

Server-side dependencies: Navigate to the server folder and install dependencies.

`cd server
npm install`

Client-side dependencies: Navigate to the client folder and install dependencies.

`cd ../client
npm install`



**3. Environment Variables**

Create a .env file in the server directory with the following:

```PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key```


**4. Run the Application**

Start the server:

`cd ../server
npm start`

Start the client:

`cd ../client
npm start`



**5. Access the App**

Open your browser and go to http://localhost:3000.



Folder Structure

`mern-chat-app
│
├── server                # Backend (Node.js + Express)
│   ├── config            # Configuration files (DB connection, environment variables)
│   ├── controllers       # Controller functions for routes
│   ├── models            # Mongoose models
│   ├── routes            # API routes
│   ├── socket            # Socket.IO events and setup
│   └── index.js          # Main server file
│
└── client                # Frontend (React)
    ├── public            # Public assets
    ├── src
    │   ├── components    # React components
    │   ├── context       # Context API for state management
    │   ├── pages         # Pages (e.g., ChatPage, LoginPage)
    │   ├── services      # API calls and utilities
    │   └── App.js        # Main app file`

Usage

Sign Up: Register with a unique username and password.

Login: Authenticate with registered credentials.

Start a Chat: Start a chat with any online user.

Send Images: Upload and share images in real-time.

Get Notifications: Receive notifications for incoming messages.


Contributing

Feel free to open issues or submit pull requests for any bugs or feature requests.

License

This project is licensed under the MIT License.


---

Feel free to update any specific sections to reflect your app’s functionality or configuration accurately!


