import React, { useState } from 'react'

function Login(props)
{
    const [username, setUsername] = useState(undefined)

    function handleChange(event) {
        setUsername(event.target.value)
    }

    return(
        <div className="modalBackground">
                <div className="cpModal">
                    <div className="cpContent">
                        <h2>Login</h2>
                        <p>Please enter your username to join the room.</p>
                        <input className="input-res" placeholder="USERNAME" onChange={handleChange} value={username}></input>
                        <button className="cpSubmitBtn" onClick={() => {props.submitFunc(username)}}>Join</button>
                    </div>
                </div>
        </div>
    )
}

export default Login