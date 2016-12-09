import mongoose from 'mongoose';

import { server } from './index';
import { MONGO_URL, PORT } from '../../config/env';

export const startServer = (callback) => {
  // DEVELOPEMENT SERVER
  mongoose.Promise = global.Promise;
  mongoose.connect(MONGO_URL, err => {
    if (err && callback) callback(err);
  // PRODUCTION SERVER
    server.listen(PORT, () => {
      const message = err ? console.warn('Warning:', err) :
                            console.log(`Server listening on localhost:${PORT}`);
      if (callback) callback(message);
    });
  });
};
