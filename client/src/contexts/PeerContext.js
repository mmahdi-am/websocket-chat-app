import React, { createContext ,useState} from 'react'
import { Peer } from "peerjs";

const peerContext = createContext()
const myPeer = new Peer({
  debug :3
});

function PeerContext({ children }) {
    const [myPeerId, setMyPeerId] = useState();
 
    myPeer.on("open", function () {

        setMyPeerId(myPeer.id);
      });
    

    

  return (
    <peerContext.Provider value={{myPeer,myPeerId}}>{children}</peerContext.Provider>
  )
}


export function usePeerContext() {
  return React.useContext(peerContext)
}

export default PeerContext