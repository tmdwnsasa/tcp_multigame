import net from 'net';
import { config } from './config/config.js';

const server = net.createServer((socket) => {
  console.log(`Client connected from : ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', (data) => {
    console.log(data);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (err) => {
    console.log(`Socket error : ${err}`);
  });
});

server.listen(config.server.port, () => {
  console.log(`서버가 ${config.server.host}:${config.server.port}에서 실행중입니다.`);
  console.log(server.address());
});
