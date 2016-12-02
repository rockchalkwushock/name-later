import mongoose from 'mongoose';

import { app } from './server';
import { MONGO_URL, PORT } from './config';

export const startServer = (callback) => {
  // DEVELOPEMENT SERVER
  mongoose.connect(MONGO_URL, err => {
    if (err && callback) callback(err);
  // PRODUCTION SERVER
    app.listen(PORT, () => {
      const message = err ? console.warn('Warning:', err) :
                            console.log(`Server listening on localhost:${PORT}`);
      if (callback) callback(message);
    });
  });
};
