var app = require('express')()
var http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
})

app.get('/', (req, res) => {
    res.send('<h1>Insta Chat</h1>')
})

/*io.on('connection', (socket) => {
    console.log(socket.toString() + ' a user connected')

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})*/

io.on('connection', socket => {

    // Get the chatID of the user and join in a room of the same chatID
    chatID = socket.handshake.query.chatID
    socket.join(chatID)
    console.log(chatID + '{' + socket.id + '}, joined')

    console.log(socket.rooms);
    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        socket.leave(chatID)
        console.log(chatID + '{' + socket.id + '}, left')
    })

    // Send message to only a particular user
    socket.on('send_message', message => {
        console.log('message received on server ' + JSON.stringify(message))

        receiverId = message.receiverId

        // Send message to only that particular room
        socket.in(receiverId + '').emit('receive_message', message)
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})