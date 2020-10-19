const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/chart.js/dist/'));
io.on('connection', (socket) => {
    console.log('a user connected');
});
const parser = new Readline();
const port = new SerialPort('COM4', {
    baudRate: 115200
});
port.pipe(parser);
parser.on('data', line => {
    const data = line.toString().trim();
    io.emit('light_sensor', {data});
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
