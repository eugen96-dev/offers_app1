var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/index', { layout: 'admin/main-layout', title: 'Offers Admin-Pannel' });
});

module.exports = router;
