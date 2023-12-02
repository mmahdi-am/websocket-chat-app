import React, { createContext ,useState} from 'react'
import { Peer } from "peerjs";
const peerScreenShareContext = createContext()
const myPeer = new Peer({
  debug :3
});

function PeerScreenShareContext({ children }) {
    const [myPeerId, setMyPeerId] = useState();
    myPeer.on("open", function () {
    
        setMyPeerId(myPeer.id);
      });
    

    

  return (
    <peerScreenShareContext.Provider value={{myPeer,myPeerId}}>{children}</peerScreenShareContext.Provider>
  )
}


export function usePeerScreenShareContext() {
  return React.useContext(peerScreenShareContext)
}

export default PeerScreenShareContext