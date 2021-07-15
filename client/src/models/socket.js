import socketIOClient from 'socket.io-client'
const serverEndpoint = "http://localhost:3001";
const socket = socketIOClient(serverEndpoint, {
    transports: ['websocket']
})

export default socket