const io = require('socket.io')(3001, {
    cors: {
        origin: "*",
    },
})

const rooms = {}

io.on('connection', (socket) => {
    socket.on('create-room', room => { 
        if (room != null && room != "") {
            if (rooms[room] != null) {
                // This knows that the room is already created so it justs sends a response
                socket.emit('room-created', true)
            } else {
                // This creates the room
                rooms[room] = {users: {}}
                socket.emit('room-created', true)
            }
        }
        else {
            socket.emit('room-created', false)
        }

        console.log(rooms)
    })

    socket.on('user-login', data => {
        rooms[data.roomname]["users"][socket.id] = data.username
        
        console.log(rooms)
    })
})