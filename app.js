const express = require('express')
const port = process.env.PORT || 3000

const app = express()

app.use('/api', require('./api/todos').router)

app.listen(port, () => {
	console.log('Listening on port: ' + port)
})

module.exports = app