import $api from "@/http/index.js";

export default class ShortenerUrlService {
    static async shortener(originalUrl){
        return $api.post('/shorten', { originalUrl})
            .then((response) => response.data)
    }
}
