const host = "http://192.168.31.197:";
export const routes = {
  authentication: {
    login:
      host + "8080/flab/authentication/public/api/v1/accounts/account/login",
    register: host + "8080/flab/authentication/public/api/v1/accounts/account",
    forgot:
      host +
      "8080/flab/authentication/public/api/v1/accounts/:id/password/reset",
    changePassword:
      host +
      "8080/flab/authentication/public/api/v1/accounts/:account-id/password",
  },
  laboratory: {
    getLaboratory: host + "8083/flab/lab/public/api/v1/laboratories",
    getLaboratoryById:
      host + "8083/flab/lab/public/api/v1/laboratories/:lab-id",
    getAllMemberInLaboratory:
      host + "8083/flab/lab/public/api/v1/laboratories/:lab-id/members",
    getListMaterialByLabId: host + "8083/flab/lab/public/api/v1/materials",
    getMembersInLaboratory: "",
    createProjectInLaboratory: "",
    createLaboratory:
      host + "8083/flab/lab/public/api/v1/laboratories/laboratory",
    removeMemberFromLaboratory:
      host +
      "8083/flab/lab/public/api/v1/laboratories/:lab-id/members/:member-id",
    deleteLaboratory: host + "8083/flab/lab/public/api/v1/laboratories/:lab-id",
  },
  forum: {
    getQuestionDetail: host + "8081/flab/forum/public/api/v1/questions/",
    addQuestion: host + "8081/flab/forum/public/api/v1/questions/question",
    updateQuestion: host + "8081/flab/forum/public/api/v1/questions/",
    postComment:
      host + "8081/flab/forum/public/api/v1/questions/:question-id/comment",
    postAnswer:
      host + "8081/flab/forum/public/api/v1/questions/:question-id/answer",
    getListQuestion: host + "8081/flab/forum/public/api/v1/questions",
    closeQuestion: host + "8081/flab/forum/public/api/v1/questions/",
    postCommentToAnswer: host + "8081/flab/forum/public/api/v1/answers/",
    deleteComment: host + "8081/flab/forum/public/api/v1/comments/",
    deleteAnswer: host + "8081/flab/forum/public/api/v1/answers/",
  },
  material: {
    getMaterialById:
      host + "8083/flab/lab/public/api/v1/materials/:material-id",
  },
  repository: {
    getFolderByRepositoryId:
      host +
      "8082/flab/repository/public/api/v1/folders/:repository-id/folders",
    getAllRepository:
      host + "8082/flab/repository/public/api/v1/repositories",
  },
  account: {
    getAccountInfo:
      host + "8084/flab/account/public/api/v1/profiles/:profile-id",
  },
  project: {
    getProjectByLabId:
      host + "8083/flab/lab/public/api/v1/projects/:lab-id/projects",
    getProjectDetailById:
      host + "8083/flab/lab/public/api/v1/projects/:project-id",
    getAllMemberInProject:
      host + "8083/flab/lab/public/api/v1/projects/:project-id/members",
    removeMemberInProject:
      host +
      "8083/flab/lab/public/api/v1/projects/:project-id/members/:member-id",
    removeProject:
      host + "8083/flab/lab/public/api/v1/projects/:lab-id/:project-id",
  },
  news: {
    getListNews: host + "8888/flab/notification/public/api/v1/news",
    getNewsByNewsId: host + "8888/flab/notification/public/api/v1/news/",
    createNews: host + "8888/flab/notification/public/api/v1/news/news",
  },
  workSpace:{
    getAllSprint: host + "8085/flab/workspace/public/api/v1/sprints/:workspace-id/sprints",
    getTaskDetail: host + "8085/flab/workspace/public/api/v1/tasks/:task-id",
    getSubTaskDetail: host + "8085/flab/workspace/public/api/v1/subtasks/:subtask-id"
  }
};
