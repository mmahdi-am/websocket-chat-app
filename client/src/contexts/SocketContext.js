import React, { createContext } from 'react'
import io from "socket.io-client";
const socketContext = createContext()
const socket = io.connect(process.env.REACT_APP_SERVER);
// const socket = io.connect('https://chat-io.iran.liara.run');

function SocketContext({ children }) {
  

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  )
}


export function useSocketContext() {
  return React.useContext(socketContext)
}

export default SocketContext