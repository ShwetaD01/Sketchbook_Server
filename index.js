const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors'); // Correct the import statement

const app = express();
const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3000' : 'https://main--curious-marzipan-421d93.netlify.app'
app.use(cors({ origin: URL }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:  URL
});

io.on("connect", (socket) => {
  console.log('server connected');


  socket.on('designPath',(arg)=>{
    socket.broadcast.emit('designPath', arg)
  })
  socket.on('drawLine',(arg)=>{
    socket.broadcast.emit('drawLine', arg)
  })
  socket.on('changeConfig',(arg)=>{
    socket.broadcast.emit('changeConfig', arg)
  })
});

httpServer.listen(5000);
