const Router = require("express");
const UrlShortenController = require("../controllers/url-shorten-controller");
const router = Router()
const aliasValidator = require("../validators/alias")

router.post('/shorten', aliasValidator, UrlShortenController.shorten)
router.get('/:alias', UrlShortenController.redirect)
router.get('/info/:alias', UrlShortenController.getInfoAboutUrl)
router.delete('/delete/:alias', UrlShortenController.delete)
router.get('/analytics/:alias', UrlShortenController.analytics)
module.exports = router
