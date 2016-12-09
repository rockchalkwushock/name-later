import { isEmail } from 'validator';
import User from './model';

const message = {
  required: 'is required',
  notEmail: 'You must provided a valid email',
  success: 'You have successfully register!',
  duplicateEmail: 'A user already exist with this email'
};

const setUserInfo = user => ({
  email: user.local.email,
  id: user._id // eslint-disable-line
});

// LOGIN

export const login = (req, res, next) => {
  const user = setUserInfo(req.user);
  res.send({ success: true, user });
  next();
};

// SIGNUP

export const signup = (req, res) => {
  const { email, password } = req.body;
  const { duplicateEmail, notEmail, required, success } = message;

  if (!email) {
    return res.status(422).json({ success: false, message: `An email ${required}` });
  } else if (!isEmail(email)) {
    return res.status(422).json({ success: false, message: notEmail });
  }

  if (!password) {
    return res.status(422).json({ success: false, message: `An password ${required}` });
  }

  const newUser = new User({ local: { email, password } });

  newUser.save()
         .then(user => {
           const addedUser = res.status(201).json({
             success: true,
             message: success,
             user: { email: user.local.email, id: user._id } // eslint-disable-line
           });
           return addedUser;
         })
         .catch(error => {
           let err;
           if (error.code === 11000) {
             err = duplicateEmail;
           } else if (error.errors.email) {
             err = error.errors.email.message;
           }
           const notAdded = res.status(422).json({ success: false, err });
           return notAdded;
         });
};
