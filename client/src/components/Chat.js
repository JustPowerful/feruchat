import React, { useEffect, useRef, useState } from 'react'

import './css/Chat.css'
import { FiSend } from 'react-icons/fi'

import Message from './Message'

// Socket
import Login from './Login'
import socket from '../models/socket'
import { useParams } from 'react-router-dom'

import { animateScroll } from 'react-scroll'

function Chat()
{
    
    

    // states
    const [users, setUsers] = useState([])
    const [toggleLogin, setToggleLogin] = useState(false)

    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState('')

    function scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "chatContent"
        })
    }

    useEffect(scrollToBottom, [messages])

    useEffect(() => {
        // If user connected
        socket.on('user-connected', username => {
            setMessages(m => ([...m, {username: '--ROOM BUTLER--', content: `${username} joined the room chat.`, current: false}]))
        })

        // If user disconnected
        socket.on('user-disconnected', username => {
            setMessages(m => ([...m, {username: '--ROOM BUTLER--', content: `${username} disconnected from the room chat.`, current: false}]))
        })

        // If other's in the room received a message
        socket.on('chat-message', message => {
            // console.log(message.message, message.username)
            setMessages(m => ([...m, {username: message.username, content: message.message, current: false}]))
        })



    }, [])

    

    // url parameters
    const { roomname } = useParams() 

    function submitUsername(username) {
        socket.emit('new-user', roomname, username)
        setToggleLogin(true)
    }

    function onMessageChange(event)
    {
        setCurrentMessage(event.target.value)
    }

    function onSendMessage(event)
    {
        event.preventDefault()
        socket.emit('send-chat-message', roomname, currentMessage)
        setMessages(m => ([...m, {username: 'CURRENT_USER', content: currentMessage, current: true}]))
        setCurrentMessage('')
    }


    return(
        <>
            {
                !toggleLogin ? 
                <Login submitFunc={submitUsername}/>
                : 
                null
            }

            <div className="chat">

                <div className="chatHeader">
                    <h3>{roomname}</h3>
                    <p>{users.join(', ')}</p>
                </div>
    
                
                <div className="chatContent" id="chatContent">
                        {
                            messages.map(message => (
                                <Message username={message.username} content={message.content} isCurrent={message.current}/>
                            ))
                            
                        }
                </div>
                

                
                    <div className="chatBottom">
                        <form id="chat-form">
                            <input type="text" id="chat-input" onChange={(event) => {onMessageChange(event)}} value={currentMessage}/>
                            <button onClick={(event) => {onSendMessage(event)}}><FiSend/></button>
                        </form>
                    </div>
                    {/* Just for box shadow */}
                    {/* <div className="chatInputIndicator"></div> */}
                
            </div>
        </>
    )
    
}

export default Chat