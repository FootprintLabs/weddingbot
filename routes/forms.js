const express = require('express'),
      router = express.Router(),
      formAboutYou = require('../forms/about-you');

router.get('/aboutyou', function(req, res, next) {
  res.render('form', formAboutYou);
});

module.exports = router;
