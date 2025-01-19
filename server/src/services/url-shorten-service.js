const ApiError = require('../exceptions/api-error')
const UrlRepository = require('../repositories/url-repository')
const ClickRepository = require('../repositories/click-repository')
const crypto = require('crypto')
const { LINK_TO_PLATFORM} = require('../consts.helper');
const db = require('../models/index')

class UrlShortenService {
    async shorten(originalUrl, expiresAt, customAlias = '') {
        const urlData = await UrlRepository.findByUrl(originalUrl)
        if (urlData) {
            throw ApiError.BadRequest('Такая ссылка уже существует')
        }

        let alias = await this.getAliasForCreateShortedUrl(customAlias)
        await UrlRepository.create(originalUrl, alias, expiresAt)
        return LINK_TO_PLATFORM + alias
    }

    async processClick (alias, ip) {
        const urlData = await this.getOriginalUrlByAlias(alias)
        await ClickRepository.create(ip, urlData.id)
        return urlData.originalUrl
    }

    async getOriginalUrlByAlias(alias) {
        const urlData = await UrlRepository.findByAlias(alias)
        if (!urlData) {
            throw ApiError.NotFound()
        }
        this.checkExpires(urlData.expiresAt)
        return urlData
    }

    async getInfoAboutUrl(alias) {
        const urlData = await UrlRepository.findByAliasWithClicks(alias)
        if (!urlData) {
            throw ApiError.BadRequest('Ссылки с таким hash не существует')
        }

        return {
            originalUrl: urlData.originalUrl,
            createdAt: urlData.createdAt,
            clickCount: urlData.clicks.length
        }
    }

    async analytics(alias) {
        const urlData = await UrlRepository.findByAliasWithClicks(alias)
        if (!urlData) {
            throw ApiError.BadRequest('Такой ссылки не существует')
        }

        const lastIps = await this.getIpsFromLastCLick(urlData.id)
        return {
            clickCount: urlData.clicks.length,
            lastIps,
        }
    }

    async delete(alias) {
        const urlData = await UrlRepository.remove(alias)
        if (!urlData) {
            throw ApiError.BadRequest('Такой ссылки не существует')
        }
    }

    async getIpsFromLastCLick (urlId, limit = 5){
        const lastClicks = await db.Click.findAll({
            where: {
                urlId,
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit,
        })
        return lastClicks.map((click) => click.ip)
    }

    async getAliasForCreateShortedUrl(customAlias) {
        let alias = null
        if (customAlias) {
            const urlData = await UrlRepository.findByAlias(customAlias)
            if (urlData) {
                throw ApiError.BadRequest('Такой алиас уже существует, выберите другой')
            }
            alias = customAlias
        }
        else {
            alias = crypto.randomBytes(3).toString('hex')
        }
        return alias
    }

    checkExpires(expiresAt) {
        if (!expiresAt) {
            return
        }

        const now = new Date(Date.now())
        const isExpires = expiresAt < now
        if (!isExpires) {
            throw ApiError.Gone('Время действия ссылки истекло')
        }
    }
}

module.exports = new UrlShortenService()
