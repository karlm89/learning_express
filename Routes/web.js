const express = require('express')
const router = express.Router()
const members = require('../Models/Members')

router.get('/', (req, res) => {
  res.render('index', { title: 'Hello from Handlebars', members })
})

module.exports = router
