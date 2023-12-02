import React from 'react'

function RoomCode({setSnackBarState,navigator,location}) {

    function handleCopyRoomId() {
        navigator.clipboard.writeText(location.pathname.replace("/room/", ""));
        setSnackBarState({ state: true, msg: " room Id was copied" });
      }


  return (
    <div
              style={{
                display: "flex",
                flexGrow:"1",
                alignItems: "center"
                
              }}
            >
              <p>Share this code with your friends (click to copy)</p>
              <span
                onClick={handleCopyRoomId}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  marginLeft:"1rem"
                }}
              >
                {location.pathname.replace("/room/", "")}
              </span>
            </div>
  )
}

export default RoomCode