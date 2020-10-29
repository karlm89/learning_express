const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const logger = require('./Middleware/logger')

const app = express()

// init logger
app.use(logger)

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'app' }))
app.set('view engine', 'handlebars')

// init Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// API Routes
app.use('/api', require('./Routes/api'))

// Web Routes
app.use('/', require('./Routes/web'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
