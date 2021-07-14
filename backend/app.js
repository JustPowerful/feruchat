const io = require('socket.io')(3001, {
    cors: {
        origin: "*",
    },
})

io.on('connection', (socket) => {
    socket.on('user-login', (username) => {
        console.log(`${username} logged in`)
    })
})