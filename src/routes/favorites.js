const server = require('./server')

server.get('/favorites', (req, res) => {
    res.send('favorites')
})

server.post('/favorites', (req, res) => {
    res.send('saving a new favorite')
})

server.delete('/favorites', (req, res) => {
    res.send('delete a favorite')
})