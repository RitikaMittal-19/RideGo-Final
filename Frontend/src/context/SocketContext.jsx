import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ['websocket'],
});

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('🟢 Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;