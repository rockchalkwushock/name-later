import { PASSWORD, USER } from './config.js';

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL ||
                            global.MONGO_URL ||
                            (process.env.NODE_ENV === 'production' ?
                                 `mongodb://${USER}:${PASSWORD}@ds119728.mlab.com:19728/name_later` :
                                 'mongodb://localhost/name-later-dev');
