import http from "http";
import express from 'express'
import cors from 'cors';
import { WebSocket } from 'ws';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig()
import logger from "morgan";
import WebSockets from "./utils/WebSockets.js";
import createError from 'http-errors';
import './helpers/init_mongodb.js';
import './helpers/init_redis.js';
import './helpers/contract_event_handlers.js';
import AuthRoute from './Routes/Auth.route.js';
import TransactionRoute from './Routes/Transaction.route.js';
import { decode } from './middlewares/jwt.js'

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/test',async (req, res, next) => {
  console.log("From odoo ===> ", req.body)
  res.send('');
});

app.get('/contract-events', function(req, res) {
  res.send('');
});

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1', TransactionRoute);

app.use('*', (req, res) => {
  createError.NotFound("API endpoint doesnt exist")
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT;
app.set("port", PORT);
app.set('view engine', 'ejs');
app.set('views', 'emailtemplates');

const server = http.createServer(app);

global.wss = new WebSocket.Server({ server });
global.wss.on('connection', WebSockets.connection);
server.listen(PORT, '0.0.0.0');

server.on("listening", () => {
  console.log(`Listening on all available network interfaces on port:: http://0.0.0.0:${PORT}/`);
});

