const express = require('express'),
      router = express.Router(),
      botTemplates = require('../forms/bot-templates');

router.get('/bot-template/:name', function(req, res, next) {
  res.json(botTemplates[req.params.name]);
});

module.exports = router;
