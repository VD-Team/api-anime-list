const server = require('./server')
const model = require('./model')
const port = process.env.PORT || 3000

const databaseConnection = require('./database/database')
const { commit } = require('./database/database')
const { get } = require('./server')

server.listen(port, () => console.log(`Server listing in port ${port}`))

// ******************* Users *******************
server.post('/login', (req, res) => {
    let error = undefined;
    let email = req.body.email
    let password = req.body.password
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
                            res.send(new model.Person(person))
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
        let person = new model.Person(data)
        let query = `INSERT INTO person (name, email, password, genre, confirmation) VALUES ('${person.name}', '${person.email}', '${person.password}', '${person.genre}', ${person.confirmation})`
        databaseConnection.query(query, (err, result) => {
            if (err) throw "Error whent it is saving data on database"
            person.id = result.insertId
            res.send(person)
        })
    } catch (error) {
        res.send({
            error
        })
    }
})

// TODO: PUT Request 
server.put('/users', (req, res) => {
    res.send('Updating a new user')
})

// ******************* Favorites *******************

server.get('/anime', (req, res) => {
    let { userId, animeUrl } = req.query
    res.send({
        userId: Number(userId),
        animeUrl
    })
})

server.post('/anime', (req, res) => {
    let animeRawData = req.body
    try {
        if (!animeRawData) throw "Invalid anime"
    } catch (error) {
        res.send({ error })
    }
})