import mongoose from 'mongoose';

import { app } from './server';
import { MONGO_URL, PORT } from './config';

export const startServer = (callback) => {
  // DATABASE
  mongoose.connect(MONGO_URL, err => {
    if (err && callback) callback(err);
  // SERVER
    app.listen(PORT, () => {
      const message = err ? `Error: ${err}` :
                            `Server listening on localhost:${PORT}`;
      if (callback) callback(message);
    });
  });
};
