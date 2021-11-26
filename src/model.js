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

module.exports = { Person }