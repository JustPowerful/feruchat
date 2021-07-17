import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import socket from '../models/socket'

import './css/Chat.scss'
import './css/Index.scss'

function Index(){
    const [roomname, setRoomname] = useState('')
    const [btnclicked, setBtnclicked] = useState(false)
    const [response, setResponse] = useState(undefined)

    function handleChange(event) {
        setRoomname(event.target.value)
    }

    function submitChange(event) {
        event.preventDefault()
        socket.emit('create-room', roomname)
        setBtnclicked(true)
    }
    
    useEffect(() => {
        socket.on('room-created', (res) => {
            setResponse(res)
        })
    }, [])
    

    return(
        <>
            <br/><br/><br/>
            <h1>Welcome to feruchat</h1>
            <br/>
            <div className="roomForm">
                <h2>Insert the room name</h2>
                <p>Please insert the room name that you want to join or create if it doesn't exist</p>
                <form>
                    <input className="input-res" placeholder="ROOM NAME" onChange={handleChange} value={roomname}></input>
                    <button className="roomBtn" onClick={(event) => { submitChange(event) }}>Done</button>
                </form>
            </div>

            {
                btnclicked && response ? 
                <Redirect to={`/room/${roomname}`}/>
                :
                null
            }
        </>
    )
}

export default Index