const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  name: String,
  username: String,
  password: String,
  image: String,
  created: { type: Date, default: Date.now }
}, {
  collection: 'users'
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
