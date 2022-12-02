const host = "http://192.168.31.197:";
export const routes = {
    authentication: {
        login:
            host+"8080/flab/authentication/public/api/v1/accounts/account/login",
        register:
            host+"8080/flab/authentication/public/api/v1/accounts/account",
        forgot:
            host+"8080/flab/authentication/public/api/v1/accounts/:id/password/reset",
        changePassword:
            host+"8080/flab/authentication/public/api/v1/accounts/:account-id/password",
    },
    laboratory: {
        getLaboratory:
            host+"8083/flab/lab/public/api/v1/laboratories",
        getLaboratoryById:
            host+"8083/flab/lab/public/api/v1/laboratories/:lab-id",
        getAllMemberInLaboratory:
            host+"8083/flab/lab/public/api/v1/laboratories/:lab-id/members",
        getListMaterialByLabId:
            host+"8083/flab/lab/public/api/v1/materials"
    },
    forum: {
        getQuestionDetail:
            host+"8081/flab/forum/public/api/v1/questions/",
        addQuestion: host+"8081/flab/forum/public/api/v1/questions/question",
        updateQuestion: host+"8081/flab/forum/public/api/v1/questions/",
        postComment: host+"8081/flab/forum/public/api/v1/questions/:question-id/comment",
        postAnswer: host+"8081/flab/forum/public/api/v1/questions/:question-id/answer",

    },
    material: {
        getMaterialById:
            host+"8083/flab/lab/public/api/v1/materials/:material-id",
    },
    repository: {
        getFolderByRepositoryId:
            host+"8082/flab/repository/public/api/v1/folders/:repository-id/folders",
        getAllRepository:
            host+"8082/flab/repository/public/api/v1/repositories/all",
    },
    account: {
        getAccountInfo: host+"8084/flab/account/public/api/v1/profiles/:profile-id"
    }
};
