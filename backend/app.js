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

    socket.on('new-user', (roomname, username) => {
        socket.join(roomname)
        rooms[roomname]["users"][socket.id] = username
        socket.broadcast.to(roomname).emit('user-connected', username)
        console.log(rooms)
    })

    socket.on('send-chat-message', (roomname, message) => {
        socket.broadcast.to(roomname).emit('chat-message', {message: message, username: rooms[roomname].users[socket.id]})
    })

    socket.on('disconnect', () => {
        getUserRooms(socket).forEach(roomname => {
            socket.broadcast.to(roomname).emit('user-disconnected', rooms[roomname].users[socket.id])
            delete rooms[roomname].users[socket.id]
        })
        console.log(rooms)
    })
})

function getUserRooms(socket)
{
    return Object.entries(rooms).reduce((usernames, [username, roomname]) => {
        if(roomname.users[socket.id] != null) usernames.push(username)
        return usernames
    }, [])
}