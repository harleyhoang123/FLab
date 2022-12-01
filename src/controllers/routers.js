export const routes = {
    authentication: {
        login: 'http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/account/login',
        register: 'http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/account',
        forgot: 'http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/password/reset',
        changePassword: 'http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/:account-id/password'
    },
    laboratory: {
        getLaboratory: 'http://192.168.31.197:8083/flab/lab/public/api/v1/laboratories/users/'
    },
    forum:{
        getQuestionDetail: 'http://192.168.31.197:8081/flab/forum/public/api/v1/questions/'
    }
};
