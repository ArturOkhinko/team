const db = require('../models/index')

class ClickRepository {
    async create(ip, urlId) {
        return await db.Click.create({ ip, urlId })
    }
}

module.exports = new ClickRepository()
