import {routes} from './routers';
export class NewsController {
    constructor(networkService) {
        this.networkService = networkService;
    }
    getNewsDetailByNewsId({ newsId }){
        return this.networkService.request(
            {
                method: 'GET',
                url: routes.news.getNewsByNewsId + newsId,
                data: null
            }
        );
    }
    getListNews(){
        return this.networkService.request(
            {
                method: 'GET',
                url: routes.news.getListNews,
                data: null
            }
        );
    }
    createNews({title, content,thumbnail}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.news.createNews,
            data: {
                title: title,
                content: content,
                thumbnail: thumbnail
            },
        });
    }
}