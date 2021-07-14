import React from 'react'


function Message(props) {
    return(
        <div className={`message ${props.isCurrent ? 'currentMessage' : null}`}>
            <div className="messageUsername">{props.username}</div>
            <div className="messageContent">{props.content}</div>
        </div>
    )
}

export default Message