import express from 'express';
import bodyParser from 'body-parser';

import { startServer } from './startup';
import { PORT } from '../../config/env';
import authRoute from './modules/Auth/routes';

export const app = express();

app.use(express.static('build'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', PORT);
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', [authRoute]);


if (require.main === module) {
    startServer(err => { if (err) console.error(err); });
}
