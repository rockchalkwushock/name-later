import mongoose from 'mongoose';
import { MONGO_URL } from '../config/env';

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect(MONGO_URL);
  mongoose.connection
          .once('open', () => { done(); })
          .on('error', error => { console.warn('Warning', error); });
});

// beforeEach((done) => {
//   const { auth } = mongoose.connection.collections;
//   console.log(auth);
//   auth.drop(() => {
//     done();
//   });
// });

after((done) => {
  const { users } = mongoose.connection.collections;
  users.drop(() => {
    done();
  });
});

/*
  TODO:
  1. Make Auth collection in mLab.
*/
