const newsApi = 'http://18.234.222.106:3011/news';
const storeApi = 'http://18.234.222.106:3011/stores';

export const getNews = () => new Promise((resolve, reject) => {
    fetch(newsApi)
        .then(response => response.json())
        .then(responseJson => resolve(responseJson.data))
        .catch(error => reject(error));
});

export const getEverlyStore = () => new Promise((resolve, reject) => {
    fetch(storeApi)
        .then(response => response.json())
        .then(responseJson => resolve(responseJson.data))
        .catch(error => reject(error));
});