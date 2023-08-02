const ws = require('ws');

const wss = new ws.Server(
    {
        port: 5000,
    }, () => console.log('serverStarted'));


wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        message = JSON.parse(message);
        ws.room = message.room;

        switch (message.event) {
            case 'message':
                broadcastMessage(message, message.room);
                break;
            case 'connection':
                broadcastMessage(message, message.room);
                break
            case 'close':
                broadcastMessage(message, message.room);
                break
        }
    })
})

const broadcastMessage = (message, room) => {
    wss.clients.forEach((client) => {
        if (client.room === room) {
            client.send(JSON.stringify(message))
        }
    })
}