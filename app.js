const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('adminDashboard');
});


app.get('/coordinat', (req, res) => {
    res.render('coordinat');
});


let successfulProcesses = 0;
let failedProcesses = 0;


io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('coordinateUpdate', (data) => {
        console.log('Received coordinate update:', data);
        io.emit('coordinateUpdate', data);
    });
    
    socket.on('statusUpdate', (status) => {
        io.emit('statusUpdate', status);
       
        if (status === 'SUCCESS') {
            successfulProcesses += 1;
        } else if (status === 'FAILED') {
            failedProcesses += 1;
        }

        io.emit('updateData', { successful: successfulProcesses, failed: failedProcesses });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

module.exports = app;
