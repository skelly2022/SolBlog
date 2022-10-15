const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// const socketapp = express();

// const http = require("http");

// const { Server } = require("socket.io");
// const cors = require("cors");
// socketapp.use(cors());
// const socketserver = http.createServer(app);
// const socketPORT = 5001;


// socketapp.get('/',(req,res) => {
//   res.write(`<h1>Socket IO Start on Port : ${PORT} </h1>`);
// });

// const io = new Server(socketserver, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
// console.log(`User Connected: ${socket.id}`);

// socket.on("join_room", (data) => {
//   // console.log(data);
//     // socket.join(data.room);
//     // socket.broadcast.to(data.room).emit("player_joined", data);
//     let rooms = io.sockets.adapter.rooms;
//     let room = rooms.get(data.room);
//   if (room == undefined){
//       socket.join(data.room);
//       socket.broadcast.to(data.room).emit("player_joined", data);
//       console.log("hey");}
//   else if (room.size == 1){
//       socket.join(data.room);
//       socket.to(data.room).emit("player_joined", data);
//       console.log(room.size)
//   }
//   else if (room.size == 2){
// console.log('hey')  }
// })

// socket.on("send_message", (data) => {
//   console.log(data);
//   socket.broadcast.to(data.room).emit("receive_message", data);
// });

// });

// socketserver.listen(socketPORT, () => {
//     console.log("server is running");
// });

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
