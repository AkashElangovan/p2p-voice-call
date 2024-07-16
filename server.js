const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
//
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {};
app.use(express.static('public'));
app.use(express.json());

// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };
  res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful' });
});

// Signaling server
io.on('connection', (socket) => {
  socket.on('join', (username) => {
    socket.username = username;
    socket.broadcast.emit('user-connected', username);
  });

  socket.on('call-user', (data) => {
    io.to(data.to).emit('call-made', {
      offer: data.offer,
      from: socket.username
    });
  });

  socket.on('make-answer', (data) => {
    io.to(data.to).emit('answer-made', {
      answer: data.answer,
      from: socket.username
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', socket.username);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
