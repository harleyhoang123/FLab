export const routes = {
  authentication: {
    login:
      "http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/account/login",
    logout: "/users/logout",
    register:
      "http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/account",
    forgot:
      "http://192.168.31.197:8080/flab/authentication/public/api/v1/accounts/:id/password/reset",
  },
  laboratory: {
    getLaboratory:
      "http://192.168.31.197:8083/flab/lab/public/api/v1/laboratories",
    getLaboratoryById:
      "http://192.168.31.197:8083/flab/lab/public/api/v1/laboratories/:lab-id",
  },
};
