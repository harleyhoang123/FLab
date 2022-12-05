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
    getListQuestion(){
        return this.networkService.request(
            {
                method: 'GET',
                url: routes.forum.getListQuestion,
                data: null
            }
        );
    }
    addQuestion({title, problem,triedCase, tag}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.forum.addQuestion,
            data: {
                title: title,
                problem: problem,
                triedCase: triedCase,
                tag: [tag]
            },
        });
    }
    updateQuestion({title, problem,triedCase, tag, questionId}) {
        return this.networkService.request({
            method: 'PUT',
            url: routes.forum.updateQuestion+ questionId,
            data: {
                title: title,
                problem: problem,
                triedCase: triedCase,
                tag: tag
            },
        });
    }
    closeQuestion({questionId}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.forum.updateQuestion+ questionId,
            data: null
        });
    }
    postComment({content,questionId}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.forum.postComment.replace(":question-id", questionId) ,
            data: {
                content: content
            },
        });
    }
    postAnswer({content,questionId}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.forum.postAnswer.replace(":question-id", questionId) ,
            data: {
                content: content
            },
        });
    }
    postCommentToAnswer({content,answerId}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.forum.postCommentToAnswer+ answerId ,
            data: {
                content: content
            },
        });
    }
    deleteComment({commentId}) {
        return this.networkService.request({
                method: 'DELETE',
                url: routes.forum.deleteComment + commentId,
                data: null
            }
        );
    }
    deleteAnswer({answerId}) {
        return this.networkService.request({
                method: 'DELETE',
                url: routes.forum.deleteAnswer + answerId,
                data: null
            }
        );
    }
}