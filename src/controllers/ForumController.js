import {routes} from './routers';
export class ForumController {
    constructor(networkService) {
        this.networkService = networkService;
    }
    getQuestionDetailByQuestionId({ questionId }){
        return this.networkService.request(
            {
                method: 'GET',
                url: routes.forum.getQuestionDetail + questionId,
                data: null
            }
        );
    }
}