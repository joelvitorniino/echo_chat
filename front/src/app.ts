import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import ejs from 'ejs';

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.set("views", path.join(__dirname, '../public'));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', (request: express.Request, response: express.Response) => {
    response.render('index.html')
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })
});

server.listen(3000, () => {
    console.log("Servidor iniciado!")
});