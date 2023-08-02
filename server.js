const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve file statis dari folder 'public'
app.use(express.static('./public')); //kenapa cannot get /? karena kita belum buat route untuk /, jadi kita buat route untuk / di bawah ini jadi kalau ada request ke / maka akan diarahkan ke /public/index.html
// Route untuk halaman yang tidak ditemukan buat rute 
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/video.html');
});


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Meneruskan pesan 'stream' dari klien ke semua klien lainnya
  socket.on('stream', (data) => {
    socket.broadcast.emit('stream', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
