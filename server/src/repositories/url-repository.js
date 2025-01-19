const db = require('../models/index')

class UrlRepository {
    async create(originalUrl, alias, expiresAt) {
        return await db.Url.create({originalUrl, alias, expiresAt})
    }

    async findByUrl(originalUrl) {
        return await db.Url.findOne({
            where: {
                originalUrl
            }
        })
    }

    async findByAlias(alias) {
        return await db.Url.findOne({
            where: {
                alias
            },
        })
    }

    async findByAliasWithClicks(alias) {
        return await db.Url.findOne({
            where: {
                alias
            },
            include: [
                {
                    model: db.Click,
                    as: 'clicks',
                    attributes: [ 'id', 'ip', 'createdAt' ]
                }
            ],
        })
    }

    async remove(alias) {
        return await db.Url.destroy({
            where: {
                alias
            },
        })
    }
}

module.exports = new UrlRepository()
