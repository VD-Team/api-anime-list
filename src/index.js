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

// ******************* Favorites *******************
server.delete('/anime', (req, res) => {
    let { userId, id } = req.query
    try {
        if (userId == null || id == null) throw 'Invalid data'
        let query = `DELETE FROM favorito WHERE favorito.id = ${Number(id)} AND favorito.userId = ${Number(userId)}`
        databaseConnection.query(query, (err, result) => {
            if (err) throw "Error whent it is deleting data on database"
            res.send({
                userId: Number(userId),
                id: Number(id)
            })
        })
    } catch (error) {
        res.send({ error })
    }
    
})

server.get('/animes', (req, res) => {
    let { userId, id } = req.query
    try {
        if (userId == null) throw 'Invalid anime id'
        if (id != null) {
            let query = `SELECT * FROM favorito WHERE favorito.userId = ${Number(userId)} AND favorito.id = ${Number(id)}`
            databaseConnection.query(query, (error, results, fields) => {
                if (error) throw 'Error on quering process'
                if (results == undefined) throw 'Results is empty'
                let favorito = results[0]
                res.send(new model.Anime(favorito))
            })
        } else {
            let query = `SELECT * FROM favorito WHERE favorito.userId = ${userId}`
            databaseConnection.query(query, (error, results, fields) => {
                if (error) throw 'Error on quering process'
                if (results == undefined) throw 'Results is empty'
                let favoritos = []
                for (let index = 0; index < results.length; index++) {
                    const favorito = results[index];
                    favoritos.push(new model.Anime(favorito))
                    res.send(favoritos)
                }
            })
        }
    } catch (error) {
        res.send({ error })
    }
    
})

server.post('/anime', (req, res) => {
    let animeRawData = req.body
    try {
        if (!animeRawData) throw "Invalid anime"
        let anime = new model.Anime(data)
        let query = `INSERT INTO favorito(id, userId, status, nota, progress, rewatch, title, image_url) VALUES (${anime.id}, ${anime.userId}, '${anime.status}', ${anime.nota}, ${anime.progress}, ${anime.rewatch}, '${anime.title}', '${anime.image_url}')`
        databaseConnection.query(query, (err, result) => {
            if (err) throw "Error whent it is saving data on database"
            res.send(anime)
        })
    } catch (error) {
        res.send({ error })
    }
})