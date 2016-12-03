import mongoose, { Schema } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { isEmail } from 'validator';

const AuthSchema = new Schema({
  local: {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
      validate: [isEmail, 'Valid email required.']
    },
    password: String,
  }
});

AuthSchema.pre('save', function (next) {
  if (!this.isModified('local.password')) next();
  const salt = 10;
  const data = this.local.password;
  hash(data, salt, (err, hashed) => {
    if (err) next(err);
    this.local.password = hashed;
    next();
  });
});

AuthSchema.methods.comparePassword = function (candidatePassword, callback) {
  const encrypted = this.local.password;
  compare(candidatePassword, encrypted, (err, isMatch) => {
    if (err) callback(err);
    callback(null, isMatch);
  });
};

const Auth = mongoose.model('auths', AuthSchema);

export default Auth;
