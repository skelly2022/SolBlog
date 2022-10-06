require('babel-register')({
    presets: ['env'],
    plugins: ['transform-async-to-generator']
})
// Import the rest of our application.
module.exports = require('./help.js');