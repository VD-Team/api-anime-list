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

class Anime {
    constructor(data) {
        this.id = data.id
        this.userId = data.userId
        this.status = data.status
        this.startDate = data.startDate
        this.nota = data.nota
        this.endDate = data.endDate
        this.progress = data.progress
        this.rewatch = data.rewatch
        this.title = data.title
        this.image_url = data.image_url
    }
}

module.exports = { Person }