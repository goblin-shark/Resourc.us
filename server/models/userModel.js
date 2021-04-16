const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: [true, "can't be blank"] },
  lastname: { type: String },
  email: { type: String, required: [true, "can't be blank"], unique: true, index: true },
  hash: { type: String, required: [true, "can't be blank"], min: [8, 'Not enough characters'] }
}, { timestamps: true });

const saltRounds = 10;
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('hash')) return next();
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.hash, saltRounds, function (err, hash) {
      if (err) return next(err);
      user.hash = hash;
      next()
    });
  });
});


var User = mongoose.model('User', userSchema);

module.exports = { User };