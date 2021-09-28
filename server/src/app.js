const Koa = require("koa");
const Router = require("@koa/router");
const http = require("http");

const app = new Koa();
const router = new Router();

router.get("/", (ctx) => (ctx.body = "hello"));

app.use(router.routes());

const server = http.createServer(app.callback());

module.exports = server;
