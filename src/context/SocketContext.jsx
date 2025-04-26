import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const host = import.meta.env.VITE_URL || "http://localhost:5000";

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const authToken = localStorage.getItem("token");
  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.user.id;

      const socket = io(host, {
        query: { userId }, // Pass userId as a query parameter
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.on("newMessage", (message) => {
        console.log("New message received:");
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authToken, host]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
