const server = require('./server')
const port = process.env.PORT || 3000

const databaseConnection = require('./database/database')

server.listen(port, () => console.log(`Server listing in port ${port}`))

// ******************* Users *******************
server.get('/users', (req, res) => {
    let error = undefined;
    let email = req.query.email
    let password = req.query.password
    if (email == undefined || password == undefined) {
        error = "user not specified"
    }else{
        try {
            databaseConnection.query('SELECT * FROM person', (error, results) => {
                let found = false
                if (!error && results) {
                    for (let i = 0; i < results.length; i++) {
                        const person = results[i];
                        if (person.email == email && person.password == password) {
                            res.send(new Person(person))
                            found = true
                        }
                    }
                }
                if (!found){
                    error = "User not found"
                }
            })
        }catch(e) {
            res.send({error: "User not found"})
        }
    }
    if (error){
        res.send({error})
    }
})

server.post('/users', (req, res) => {
    try {
        let data = req.body
        if (!data) throw "Error of data not specified"
        let person = new Person(data)
        let query = `INSERT INTO person (name, email, password, genre, confirmation) VALUES ('${person.name}', '${person.email}', '${person.password}', '${person.genre}', ${person.confirmation})`
        databaseConnection.query(query, (err, result) => {
            if (err) throw "Error whent it is saving data on database"
        })
        res.send(person)
    } catch (error) {
        res.send({
            error
        })
    }
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