const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Импортируем пакет cors

const app = express();
app.use(cors()); // Используем cors

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Разрешаем запросы с указанного домена (React-приложение)
    methods: ["GET", "POST"]
  }
});

const rooms = [{ roomName: "Vlad", users: [], messages: [] }]; // Объект для хранения информации о комнатах

io.on('connection', (socket) => {
  console.log('A user connected');

  io.emit('roomsUpdate', rooms)

  socket.on('createRoom', (roomName, callback) => {
    if (!rooms.some(room => room.roomName === roomName)) {
      rooms.push({roomName: roomName, users: [], messages: []});
      callback({ success: true });
      io.emit('roomsUpdate', rooms)
    } else {
      callback({ success: false, message: 'Room already exists' });
    }
  });

  socket.on('joinRoom', (roomName, callback) => {
    const room = rooms.find(room => room.roomName === roomName);
    if (room && room.users.length < 10) {
      room.users.push(socket.id);
      console.log(room.users)
      socket.join(roomName);
      callback({ success: true });
      io.emit('roomsUpdate', rooms)
      io.to(roomName).emit('roomUsersUpdate', room.users);
      io.to(roomName).emit('messagesUpdate', room.messages);
    } else {
      callback({ success: false, message: 'Room is full or does not exist' });
    }
  });

  socket.on('enterMessage', (roomName, message, callback) => {
    const room = rooms.find(room => room.roomName === roomName);

    if (room) {
      room.messages.push({message, user: socket.id})
      console.log(room)
      callback({ success: true });
      io.to(roomName).emit('messagesUpdate', room.messages);
    }
  })

  socket.on('leaveRoom', (roomName, callback) => {
    const room = rooms.find(room => room.roomName === roomName);
    if (room) {
      room.users = room.users.filter(id => id !== socket.id);
      socket.leave(roomName);
      callback({ success: true });
      io.to(roomName).emit('roomUsersUpdate', room.users);
      if (room.users.length === 0) {
        delete rooms[roomName];
      }
      io.emit('roomsUpdate', rooms)
    } else {
      callback({ success: false, message: 'Room does not exist' });
    }
  });

  socket.on('disconnect', () => {
      const currentRoom = rooms.find(room => room.users.some(id => id === socket.id));

      if (currentRoom) {
        currentRoom.users = currentRoom.users.filter(id => id !== socket.id);
        io.to(currentRoom).emit('roomUsersUpdate', currentRoom.users);
      }
      io.emit('roomsUpdate', rooms)
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
