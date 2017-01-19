'use strict';

const express = require('express');
const router = express.Router();
const app = express();

// respond with "hello world" when a GET request is made to the homepage
router.use('/',  (req, res) => {
  res.send('transfer');
})

module.exports = router;
