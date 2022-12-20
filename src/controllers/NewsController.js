import {routes} from './routers';
import {notification} from "./ip";
export class NewsController {
    constructor(networkService) {
        this.networkService = networkService;
    }
    getNewsDetailByNewsId({ newsId }){
        return this.networkService.request(
            {
                method: 'GET',
                url: routes.notification.getNewsByNewsId + newsId,
                data: null
            }
        );
    }
    getListNews(){
        return this.networkService.request(
            {
                method: 'GET',
                url: routes.notification.getListNews,
                data: null
            }
        );
    }
    createNews({title, content,thumbnail}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.notification.createNews,
            data: {
                title: title,
                content: content,
                thumbnail: thumbnail
            },
        });
    }
}