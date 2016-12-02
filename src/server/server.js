import express from 'express';
import { Server } from 'http';

import { PORT } from './config';

const app = express();
const server = Server(app);

app.use(express.static('build'));

server.listen(PORT, err => {
  const message = err ? `Error: ${err}` :
                        `Server listening on localhost:${PORT}`;
  return console.log(message);
});
