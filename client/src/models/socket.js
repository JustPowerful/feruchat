import socketIOClient from 'socket.io-client'
const url = window.location.hostname
const serverEndpoint = "http://" + url + ":3001";
console.log(serverEndpoint)
const socket = socketIOClient(serverEndpoint, {
    transports: ['websocket']
})

export default socket