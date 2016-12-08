import passport from 'passport';
import LocalStrategy from 'passport-local';

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

passport.use(localLogin);
