const Koa = require("koa");
const Router = require("@koa/router");
const http = require("http");
const socketio = require("socket.io");

const app = new Koa();
const router = new Router();

const server = http.createServer(app.callback());
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("send", (data) => {
    console.log("i recieved data");
    socket.emit("send", "data from server : )");
  });

  socket.on("disconnect", (data) => {
    console.log("client socket disconnected");
  });
});

router.get("/", (ctx) => (ctx.body = "hello"));

app.use(router.routes());

module.exports = server;
