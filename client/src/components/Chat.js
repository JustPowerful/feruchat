import React, { useEffect, useState } from 'react'

import './css/Chat.css'
import { FiSend } from 'react-icons/fi'

import Message from './Message'

// Socket
import Login from './Login'
import socket from '../models/socket'
import { useParams } from 'react-router-dom'

function Chat()
{
    // states
    const [users, setUsers] = useState([])

    // url parameters
    const { roomname } = useParams() 

    function submitUsername(username) {
        socket.emit('user-login', {roomname, username})
    }


    return(
        <>
            <Login submitFunc={submitUsername}/>

            <div className="chat">
                <div className="chatHeader">
                    <h3>{roomname}</h3>
                    <p>{users.join(', ')}</p>
                </div>
    
                <div className="chatContent">
                        
    
                        {/* This is a message sent from the current user */}
                        <Message username="user1" content="Welcome to our chat website here you can have fun!"/>
                        <Message username="user2" content="Nice lemme try!" isCurrent={true}/>
                    
    
                </div>
    
                
                    <div className="chatBottom">
                        <form id="chat-form">
                            <input type="text" id="chat-input"></input>
                            <button><FiSend/></button>
                        </form>
                    </div>
                    {/* Just for box shadow */}
                    <div className="chatInputIndicator"></div>
                
            </div>
        </>
    )
    
}

export default Chat