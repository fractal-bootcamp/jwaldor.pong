// src/index.js
import client from "client";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import CacheService from "services/gameStateServices";
import { Server } from "socket.io";

const app: Express = express();
const { createServer } = require("node:http");
const port = process.env.PORT || 3000;

// const jwt = require("express-jwt");

let bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

const origins = ["https://multipong.onrender.com"];

const server = createServer(app);
const io = new Server({
  cors: {
    origin: "*",
  },
});
io.listen(4000);

function broadcastStates() {
  const newgames = CacheService.updateGames();
  newgames.forEach((gameState, roomName) => {
    // io.to(socketId).emit(/* ... */);
    io.to(roomName).emit("newstate", gameState);
    console.log("io", roomName, gameState);
    // console.log(io.in(roomName).fetchSockets());
  });
}

setInterval(() => broadcastStates(), 10);

let socketRoomMap = new Map();

io.on("connection", (socket) => {
  io.emit("gamelist", CacheService.listRooms());
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("adduser", (user) => {
    CacheService.addName(user, socket.id);
    io.emit("newuser", CacheService.listUsers());
  });
  socket.on("moveup", () => {
    console.log("moveup: " + socket.id);
    CacheService.updateStateMove("up", socket.id, socketRoomMap.get(socket.id));
  });
  socket.on("movedown", () => {
    console.log("movedown: " + socket.id);
    CacheService.updateStateMove(
      "down",
      socket.id,
      socketRoomMap.get(socket.id)
    );
  });
  socket.on("movenone", () => {
    console.log("movenone: " + socket.id);
    CacheService.updateStateMove(
      "none",
      socket.id,
      socketRoomMap.get(socket.id)
    );
  });
  socket.on("startaroom", (roomName) => {
    CacheService.blankGame(roomName);
    console.log("room added");
    io.emit("gamelist", CacheService.listRooms());
  });

  socket.on("joinroom", (roomName) => {
    console.log("joining room", roomName);
    socket.join(roomName);
    socketRoomMap.set(socket.id, roomName);
    CacheService.addPlayerGame(roomName, socket.id);
  });
  // socket.on("joinroom", (p1, p2) => {
  //   console.log("joining room");
  //   CacheService.initializeGame(p1, p2);
  //   socket.join(p2);
  //   const otherid = CacheService.getId(p2);
  //   console.log("otherid", [otherid as string]);
  //   io.in([otherid as string]).socketsJoin(p2);

  //   io.to(p2).emit("test", "Hello " + p1 + p2);
  // });
});

// app.post("/register-user", (req: Request, res: Response) => {
//   CacheService.addName(req.body.username);
//   io.emit("newuser", CacheService.listUsers());
//   return res.send({});
// });

app.get("/active-list", (req: Request, res: Response) => {
  return res.send({ userlist: CacheService.listUsers() });
});

app.get("/rooms", (req: Request, res: Response) => {
  return res.send({ userlist: CacheService.listRooms() });
});

app.get("/", (req: Request, res: Response) => {
  return res.send("Express + TypeScript Server");
});

// app.post("/user", async (req: Request, res: Response) => {
//   const userdata = req.body;
//   const found_user = await client.user.findFirst({
//     data: { email: userdata.email, password: userdata.password },
//   });
//   if (found_user) {
//     const token = jwt.sign({ userId: found_user.id }, "your-secret-key", {
//       expiresIn: "1h",
//     });
//   }
//   res.send("Express + TypeScript Server");
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
