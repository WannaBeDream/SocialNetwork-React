import * as axios from 'axios';


  // TO DO ???
const instanceNews = axios.create({
    baseURL: 'https://newsapi.org/v2/',
    headers: {
        "X-Api-Key": "a1f2e6a922c648c2a88e4d800a3a3ad8"
    }
});

export const newsAPI = {
    getNews(currentNewsPage = 1, pageSize = 10) {
        return instanceNews.get(`top-headlines?country=us&page=${currentNewsPage}&pageSize=${pageSize}`)
            .then(response => {
                return response.data;
            });
        }
}



