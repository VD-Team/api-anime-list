const server = require('./server')

server.get('/users', (req, res) => {
    res.send('getting an user')
})

server.post('/users', (req, res) => {
    res.send('Saving a new user')
})