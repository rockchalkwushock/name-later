export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL ||
                            global.MONGO_URL ||
                            (process.env.NODE_ENV === 'production' ?
                                 'mongodb://heroku_4qnzkffb:ns2hggqal9jsopk5icdh92lumi@ds119598.mlab.com:19598/heroku_4qnzkffb' :
                                 'mongodb://localhost/name-later-dev');
