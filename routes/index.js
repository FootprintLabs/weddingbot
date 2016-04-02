const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      multer = require('multer'),
      fs = require('fs'),
      User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/dashboard');
  } else {
    const messages = req.flash();
    const data = {};

    if (messages.error) {
      data.error = messages.error;
    }

    res.render('index', data);
  }
});

router.get('/dashboard', isLoggedIn, (req, res) => {
  if (req.user) {
    res.render('dashboard', {
      user: req.user
    });
  } else {
    res.redirect('/');
  }
});

var upload = multer({
  dest: 'public/uploads/',
  rename: function (fieldname, filename) {
    console.log(filename);
    return Date.now() + filename.replace(/\W+/g, '-').toLowerCase();
  }
})

router.post('/upload-image', upload.single('file'), (req, res) => {
  var filename = Date.now() + req.file.originalname.replace(/\s+/g, '-').toLowerCase();
  fs.rename('public/uploads/' + req.file.filename, 'public/uploads/' + filename, function(err) {
    res.json({
      url: '/uploads/' + filename
    });
  });
});

/*
router.post('/login', passport.authenticate('local', { failureRedirect: '/', failureFlash: true }), function(req, res, next) {
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/dashboard');
  });
});
*/

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
