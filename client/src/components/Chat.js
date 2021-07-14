import React from 'react'

import './css/Chat.css'
import { FiSend } from 'react-icons/fi'

import Message from './Message'

// Socket
import socketIOClient from 'socket.io-client'
import Login from './Login'

const serverEndpoint = "http://localhost:3001";
const socket = socketIOClient(serverEndpoint, {
    transports: ['websocket']
})

class Chat extends React.Component
{
    constructor(props)
    {
        super(props)
        this.submitUsername = this.submitUsername.bind(this)
    }

    submitUsername(username) {
        socket.emit('user-login', username)
    }

    render() {
        return(
            <>
                <Login submitFunc={this.submitUsername}/>

                <div className="chat">
                    <div className="chatHeader">
                        <h3>Room Name</h3>
                        <p>user1, user2</p>
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
}

export default Chat