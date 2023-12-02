import React, { useState, useRef, useEffect } from 'react'
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Button, ButtonGroup, } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';

const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    height: '600px',
    width: '100%'
};


function Board({ userSocket, yourID, roomID }) {

    const [path, setPath] = useState({})
    const [pickedColor, setPickedColor] = useState('red')
    const canvas = useRef()

    console.log(pickedColor)


    const sendData = (e) => {
        console.log(e)
        
        userSocket.emit('canvas', { roomId: roomID, sendBy: yourID, board: e })
        setPath(e)




    }






    useEffect(() => {
        userSocket.on('canvas', (body) => {
            if (body.sendBy !== yourID) {

                canvas.current.loadPaths(body.board)
            }

        })



    }, [])

    return (
        <div >
            <ReactSketchCanvas
                onStroke={sendData}

                ref={canvas}
                style={styles}
                strokeColor={pickedColor}
                strokeWidth={9}

            />
            <div>

                {canvas.current && (

                    <ButtonGroup className='w-100'>
                        <Button onClick={() => canvas.current.eraseMode(true)}>انتخاب پاک کن</Button>
                        <Button onClick={() => canvas.current.eraseMode(false)}>انتخاب قلم</Button>
                        <Dropdown>

                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                رنگ قلم
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item onClick={()=>setPickedColor('red')} >قرمز</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setPickedColor('blue')} >آبی</Dropdown.Item>
                                <Dropdown.Item  onClick={()=>setPickedColor('green')}>سبز</Dropdown.Item>
                                <Dropdown.Item  onClick={()=>setPickedColor('black')}>مشکی</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                    </ButtonGroup>
                )}

            </div>


        </div>
    )
}

export default Board