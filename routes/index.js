const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      multer = require('multer'),
      fs = require('fs'),
      im = require('imagemagick'),
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

const uploadPath = __dirname + '/../public/uploads/';
const upload = multer({
  dest: uploadPath
})

router.post('/upload-image', upload.single('file'), (req, res) => {
  var filename = Date.now() +
    req.file.originalname.replace(/\s+/g, '-').toLowerCase() + '.jpg';
  /*
  fs.rename('public/uploads/' + req.file.filename, 'public/uploads/' + filename, function(err) {
    res.json({
      url: '/uploads/' + filename
    });
  });
  */

  im.resize({
    srcPath: uploadPath + req.file.filename,
    dstPath: uploadPath + filename,
    quality: 0.8,
    format: 'jpg',
    progressive: false,
    width:   300
  }, function(err, stdout, stderr){
    res.json({
      url: '/uploads/' + filename
    });
  });

});

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
