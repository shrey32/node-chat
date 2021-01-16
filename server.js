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

io.on('connection', (socket) => {
    console.log(socket.toString() + ' a user connected')

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})