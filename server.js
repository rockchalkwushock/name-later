import express from 'express';
import { Server } from 'http';

const app = express();
const server = Server(app);
const port = process.env.PORT || 3000;

server.listen(port, err => {
  const message = err ? `Error: ${err}` :
                        `Server listening on localhost:${port}`;
  return console.log(message);
});
