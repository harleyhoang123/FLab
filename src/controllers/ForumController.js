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
    addQuestion({title, content, tag}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.forum.addQuestion,
            data: {
                title: title,
                content: content,
                tag: [tag]
            },
        });
    }
    updateQuestion({title, content, tag, questionId}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.forum.updateQuestion+ questionId,
            data: {
                title: title,
                content: content,
                tag: [tag]
            },
        });
    }
}