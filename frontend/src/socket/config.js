/**
 * config file for the socket in the frontend
 * port is 8000 to be able to link with the backend
 */
import io from "socket.io-client";

const socket = io('http://localhost:8000');

export { socket };