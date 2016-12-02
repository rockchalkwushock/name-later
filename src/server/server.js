import express from 'express';
import { Server } from 'http';
import path from 'path';

const app = express();
const server = Server(app);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

server.listen(port, err => {
  const message = err ? `Error: ${err}` :
                        `Server listening on localhost:${port}`;
  return console.log(message);
});
