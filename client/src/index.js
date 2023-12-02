import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/Home/Home';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Room from './screens/Room/Room';
import SocketContext from './contexts/SocketContext'
import PeerContext from './contexts/PeerContext';
import ThemeProvider from 'react-bootstrap/ThemeProvider'

import './fonts/AIranianSans.ttf';
import Contact from './screens/Contact/Contact';
import Rooms from './screens/Rooms/Rooms';
import PeerScreenShareContext from './contexts/PeerScreenShareContext';



ReactDOM.render(
  <SocketContext>
  <PeerScreenShareContext>

  <PeerContext>

  <ThemeProvider dir='rtl'>

  <BrowserRouter>
    <Routes>
      <Route path="/" index element={<App />}/>
      <Route path="/contact-us" index element={<Contact />}/>
      <Route path="/rooms" element={<Rooms />}/>
      <Route path="room/:teamId" element={<Room />} />
    </Routes>
  </BrowserRouter>
  </ThemeProvider>

  
  </PeerContext>
  </PeerScreenShareContext>
  </SocketContext>,
  document.getElementById('root')
);

