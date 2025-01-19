
export function getAliasByShortUrl(shortUrl) {
    const url = new URL(shortUrl)
    return url.pathname.slice(1)
}
