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

const offlineMessages = new Map();
const offlineUsers = new Set();

io.on('connection', socket => {



    // Get the userId of the user and join in a room of the same userId
    userId = socket.handshake.query.userId + '';
    socket.join(userId)
    console.log(userId + '{' + socket.id + '}, joined')

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        socket.leave(userId);
        offlineUsers.add(userId);
        console.log(userId + '{' + socket.id + '}, left')
    })

    // Send message to only a particular user
    socket.on('send_message', message => {
        console.log('message received on server ' + JSON.stringify(message))
        const receiverId = message.receiverId + ''

        if (message.message === 'offline' && message.senderId === message.receiverId) {
            pushOfflineMessages(socket, receiverId)
        } else {
            if (offlineUsers.has(receiverId)) {
                console.log(receiverId + ' is offline');
                if (offlineMessages.has(receiverId)) {
                    offlineMessages.get(receiverId).push(message);
                } else {
                    const messages = [];
                    messages.push(message);
                    offlineMessages.set(receiverId, messages);
                }
            } else {
                emitToPrivateChat(socket, receiverId, 'receive_message', message);
            }
        }
    });

    //Typing event
    socket.on('typing_from', data => {
        receiverId = data.receiverId
        emitToPrivateChat(socket, receiverId, 'typing_to', data);
    });

    //deleting event
    socket.on('deleting_from', data => {
        receiverId = data.receiverId
        emitToPrivateChat(socket, receiverId, 'deleting_to', data);
    });

})

http.listen(3000, () => {
    console.log('listening on *:3000')
})

/**
 *
 */
emitToPrivateChat = (socket, receiverId, eventName, data) => {
    socket.in(receiverId + '').emit(eventName, data);
}


/**
 *
 */
pushOfflineMessages = (socket, receiverId) => {
    if (offlineUsers.has(userId)) {
        const messageArr = offlineMessages.get(userId + '');
        if (messageArr && messageArr.length > 0) {
            console.log('message length->' + messageArr.length)
            for (let msg of messageArr) {
                console.log('pushing', msg);
                emitToPrivateChat(socket, receiverId, 'receive_message', msg);
            }
            offlineMessages.delete(userId + '');
            offlineUsers.delete(userId + '');
        }
    }
}