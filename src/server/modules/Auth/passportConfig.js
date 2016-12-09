import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as SpotifyStrategy } from 'passport-spotify';

import User from './model';

const localOptions = { usernameField: 'email' };

// LOCAL STRATEGY

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ 'local.email': email })
      .then(auth => {
        if (!auth) done(null, false);
        auth.comparePassword(password, (err, isMatch) => {
          if (err) done(err);
          if (!isMatch) done(null, false);
          done(null, auth);
        });
      })
      .catch(err => done(err));
});

// SPOTIFY STRATEGY

const spotifyOptions = {
  clientID: client_id,
  clientSecret: client_secret,
  callbackURL: 'http://localhost:8888/auth/spotify/callback'
};

const spotifyLogin = new SpotifyStrategy(spotifyOptions,
                (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ spotifyId: profile.id })
      .then(user => {
        if (!user) done(null, false);
        done(null, user);
      })
      .catch(err => done(err));
  User.findOrCreate({ spotifyId: profile.id }, (err, user) => done(err, user));
});

passport.use(localLogin);
passport.use(spotifyLogin);
