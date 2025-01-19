const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-error')
const urlService = require('../services/url-shorten-service')

class UrlShortController {
    async shorten(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const message = errors.errors.map((error) => error.msg).join('\n')
                return next(ApiError.BadRequest(message, errors.errors))
            }

            const { originalUrl, expiresAt, alias } = req.body
            if (!originalUrl) {
                return next(ApiError.BadRequest('Отсутствует поле originalUrl'))
            }

            const shortenUrl = await urlService.shorten(originalUrl, expiresAt, alias)
            res.json(shortenUrl)
        }
        catch(e) {
            next(e)
        }
    }

    async redirect(req, res, next) {
        try {
            const { alias } = req.params
            if (!alias) {
                return next(ApiError.BadRequest('Отсутствует alias'))
            }
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''

            const originalUrl = await urlService.processClick(alias, ip)
            res.redirect(originalUrl)
        }
        catch(e) {
            next(e)
        }
    }

    async getInfoAboutUrl(req, res, next) {
        try {
            const { alias } = req.params
            const urlData = await urlService.getInfoAboutUrl(alias)
            res.json(urlData)
        }
        catch(e) {
            next(e)
        }
    }

    async analytics(req, res, next) {
        try {
            const { alias } = req.params
            const { clickCount, lastIps } = await urlService.analytics(alias)
            res.json({
                clickCount,
                lastIps,
            })
        }
        catch(e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { alias } = req.params
            await urlService.delete(alias)
            res.sendStatus(200)
        }
        catch(e) {
            next(e)
        }
    }
}

module.exports = new UrlShortController()
