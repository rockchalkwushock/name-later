import mongoose, { Schema } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { isEmail } from 'validator';

const userSchema = new Schema({
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

userSchema.pre('save', function (next) {
  if (!this.isModified('local.password')) next();
  const salt = 10;
  const data = this.local.password;
  hash(data, salt, (err, hashed) => {
    if (err) next(err);
    this.local.password = hashed;
    next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  const encrypted = this.local.password;
  compare(candidatePassword, encrypted, (err, isMatch) => {
    if (err) callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model('users', userSchema);

export default User;
