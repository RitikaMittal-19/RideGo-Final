import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/UserContext.jsx';
import CaptainContext from './context/CaptainContext.jsx'; // ✅ Add this import
import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
    <BrowserRouter>
      <UserContext>
        <CaptainContext>
          <App />
        </CaptainContext>
      </UserContext>
    </BrowserRouter>
    </SocketProvider>
  </StrictMode>
);