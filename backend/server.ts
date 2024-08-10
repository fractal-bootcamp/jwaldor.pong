// src/index.js
import client from "client";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import CacheService from "services/gameStateServices";
import { Server } from "socket.io";

const app: Express = express();
const { createServer } = require("node:http");
const port = process.env.PORT || 3000;

const jwt = require("express-jwt");

let bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

const server = createServer(app);
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});
io.listen(4000);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("moveup", (user, gameId) => {
    console.log("moveup: " + user);
    CacheService.updateStateMove("up", user, gameId);
  });
  socket.on("movedown", (user, gameId) => {
    console.log("movedown: " + user);
    CacheService.updateStateMove("down", user, gameId);
  });
});

app.post("/register-user", (req: Request, res: Response) => {
  CacheService.addName(req.body.username);
  io.emit("newuser", CacheService.listUsers());
  return res.send({});
});

app.get("/active-list", (req: Request, res: Response) => {
  return res.send({ userlist: CacheService.listUsers() });
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
