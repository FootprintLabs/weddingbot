const express = require('express'),
      router = express.Router(),
      aboutForm = require('../forms/aboutyou');

router.get('/aboutyou', function(req, res, next) {
  res.render('form', aboutForm);
});

module.exports = router;
