import express from 'express';
import bodyParser from 'body-parser';

import { startServer } from './startup';

export const app = express();

app.use(bodyParser.json());
app.use(express.static('build'));

// DEVELOPMENT || TESTING SERVER

if (require.main === module) {
    startServer(err => { if (err) console.error(err); });
}
