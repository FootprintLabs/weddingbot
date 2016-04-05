const mongoose = require('mongoose'),
      User = require('../models/user');

mongoose.connect('mongodb://localhost/weddingbot');

const user = new User({
  name: 'Chris McCoy and Ciara Viehweg',
  username: 'chris@footprintlabs.co',
  image: 'chris.jpg'
});

User.remove({}, function(err) {
  console.log('Collection \'users\' removed.');
  User.register(user, 'weddingbot', (err, newUser) => {
    console.log('New user added:');
    console.log(newUser);
    mongoose.connection.close()
  });
});




