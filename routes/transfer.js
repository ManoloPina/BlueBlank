'use strict';

const express = require('express');
const router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.all('/', (req, res) => {
  res.send(req.body);
})

module.exports = router;
