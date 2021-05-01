import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import "dotenv/config";
import http from "http";
import socketio from "socket.io";

import connect from '../src/database/Database';
import { router } from './router/router';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const server = http.createServer(app)
const io = socketio(server);

io.on('connection', (socket) => {
  const { id } = socket.handshake.query

  socket.on('disconnect', () => {
    console.log('Usuário se desconectou', id)
  })
})

app.use((request: Request | any, response: Response, next: NextFunction) => {
  request.io = io;

  return next();
});

const db = process.env.MONGO_URI as string ;
connect({db});

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
