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
  transport: ["polling"],
});

io.of("/api").on("connection", (socket) => {
  console.log("client connected : )");

  socket.on("send", (data) => {
    console.log(`server recieved data from client: ${data}`);
    socket.emit("send", `data from server : ), your socket id is ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("client socket disconnected : (");
  });
});

router.get("/api/home", (ctx) => {
  console.log("get: /api/home");
  console.log(ctx.header);
  console.log(ctx.headers);
  ctx.body = "home";
});

router.get("/api/nav", (ctx) => {
  console.log("get: /api/nav");
  console.log(ctx.header);
  ctx.body = "nav";
});

app.use(cors({ origin: "*" }));
app.use(router.routes());

module.exports = server;
