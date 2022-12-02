export const routes = {
    authentication: {
        login:
            "http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/account/login",
        register:
            "http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/account",
        forgot:
            "http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/:id/password/reset",
        changePassword:
            "http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/:account-id/password",
    },
    laboratory: {
        getLaboratory:
            "http://192.168.31.197:8083/flab/lab/public/api/v1/laboratories",
        getLaboratoryById:
            "http://192.168.31.197:8083/flab/lab/public/api/v1/laboratories/:lab-id",
        getAllMemberInLaboratory:
            "http://192.168.31.197:8083/flab/lab/public/api/v1/laboratories/:lab-id/members",
        getListMaterialByLabId:
            "http://192.168.31.197:8083/flab/lab/public/api/v1/materials"
    },
    forum: {
        getQuestionDetail:
            "http://192.168.31.197:8081/flab/forum/public/api/v1/questions/",
        addQuestion: 'http://192.168.31.197:8081/flab/forum/public/api/v1/questions/question',
        updateQuestion: 'http://192.168.31.197:8081/flab/forum/public/api/v1/questions/',
        postComment: 'http://192.168.31.197:8081/flab/forum/public/api/v1/questions/:question-id/comment',
        postAnswer: 'http://192.168.31.197:8081/flab/forum/public/api/v1/questions/:question-id/answer'

    },
    material: {
        getMaterialById:
            "http://192.168.31.197:8083/flab/lab/public/api/v1/materials/:material-id",
    },
    repository: {
        getFolderByRepositoryId:
            "http://192.168.31.197:8082/flab/repository/public/api/v1/folders/:repository-id/folders",
        getAllRepository:
            "http://192.168.31.197:8082/flab/repository/public/api/v1/repositories/all",
    },
    account: {
        getAccountInfo: 'http://192.168.31.197:8084/flab/account/public/api/v1/profiles/:profile-id'
    }
};
