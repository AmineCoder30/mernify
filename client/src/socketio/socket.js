import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Replace with your server URL

const socket = io(SOCKET_URL, {
  withCredentials: true,
});

export default socket;
