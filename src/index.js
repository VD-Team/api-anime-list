const server = require('./server')
const port = process.env.PORT || 3000

const databaseConnection = require('./database/database')
const formidable = require('formidable')

server.listen(port, () => console.log(`Server listing in port ${port}`))

// ******************* Users *******************
server.get('/users', (req, res) => {
    try {
        let id = req.query.id
        if (id == undefined) throw "Id not specified"
        databaseConnection.query('SELECT * FROM person', (error, results) => {
            if (error) throw "User not found"
            if (results == undefined) throw "User not found"
            let found = false
            for (let i = 0; i < results.length; i++) {
                const person = results[i];
                if (person.id == id) {
                    res.send(new Person(person))
                    found = true
                }
            }
            if (!found) throw "User not found"
        })
        databaseConnection.end()
    } catch (error) {
        res.send({
            error
        })
    }
})

server.post('/users', (req, res) => {
    res.send('Saving a new user')
})

server.put('/users', (req, res) => {
    res.send('Updating a new user')
})

// ******************* Favorites *******************


class Person {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.email = data.email
        this.password = data.password
        this.genre = data.genre
        this.confirmation = data.confirmation
    }
}