const Koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");
const http = require("http");
const socketio = require("socket.io");

const app = new Koa();
const router = new Router();

const server = http.createServer(app.callback());
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("client connected : )");

  socket.on("send", (data) => {
    console.log(`server recieved data from client: ${data}`);
    socket.emit("send", "data from server : )");
  });

  socket.on("disconnect", () => {
    console.log("client socket disconnected");
  });
});

router.get("/api/home", (ctx) => {
  console.log("get: /");
  console.log(ctx.header);
  ctx.body = "home";
});

app.use(cors({ origin: "*" }));
app.use(router.routes());

module.exports = server;
