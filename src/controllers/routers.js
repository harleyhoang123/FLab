import {account, forum, laboratory, notification, repository, workspace} from "./ip";

export const routes = {
    authentication: {
        login:
            account + "/flab/account/public/api/v1/accounts/account/login",
        register:
            account + "/flab/account/public/api/v1/accounts/account",
        forgot:
            account + "/flab/account/public/api/v1/accounts/:id/password/reset",
        changePassword:
            account + "/flab/account/public/api/v1/accounts/:account-id/password",
    },
    laboratory: {
        getLaboratory:
            laboratory + "/flab/lab/public/api/v1/laboratories",
        getLaboratorySuggestion:
            laboratory + "/flab/lab/public/api/v1/laboratories/suggestion",
        //Testing
        getLaboratoryById:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id",
        getAllMemberInLaboratory:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/members",
        getListMaterialByLabId:
            laboratory + "/flab/lab/public/api/v1/materials",
        getMembersInLaboratory: "",
        createProjectInLaboratory: "",
        createLaboratory:
            laboratory + "/flab/lab/public/api/v1/laboratories/laboratory",
        removeMemberFromLaboratory:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/members/:member-id",
        deleteLaboratory:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id",
        updateLaboratory:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id",
        addMemberToLab:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/members/member",
        applyToLab:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/apply",
        updateMemberRole:
            laboratory + "/flab/lab/public/api/v1/members/:member-id",
        getAllRequest:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/applications",
        getRequestDetail:
            laboratory + "/flab/lab/public/api/v1/laboratories/applications/:application-id",
        reviewRequest:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/:application-id",
    },
    forum: {
        getQuestionDetail: forum + "/flab/forum/public/api/v1/questions/",
        addQuestion: forum + "/flab/forum/public/api/v1/questions/question",
        updateQuestion: forum + "/flab/forum/public/api/v1/questions/",
        postComment:
            forum + "/flab/forum/public/api/v1/questions/:question-id/comment",
        postAnswer:
            forum + "/flab/forum/public/api/v1/questions/:question-id/answer",
        getListQuestion: forum + "/flab/forum/public/api/v1/questions",
        closeQuestion: forum + "/flab/forum/public/api/v1/questions/",
        postCommentToAnswer: forum + "/flab/forum/public/api/v1/answers/",
        deleteComment: forum + "/flab/forum/public/api/v1/comments/",
        deleteAnswer: forum + "/flab/forum/public/api/v1/answers/",
    },
    material: {
        getMaterialById:
            laboratory + "/flab/lab/public/api/v1/materials/:material-id",
        getMaterialByLabId:
            laboratory + "/flab/lab/public/api/v1/laboratories/:laboratory-id/materials",
        updateMaterial:
            laboratory + "/flab/lab/public/api/v1/laboratories/:laboratory-id/materials/:material-id",
        addMaterial:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/material",
        orderMaterial:
            laboratory + "/flab/lab/public/api/v1/laboratories/:laboratory-id/:material-id/order",
    },
    repository: {
        getFolderDetail:
            repository + "/flab/repository/public/api/v1/folders/:folder-id",
        getFolderByRepositoryId:
            repository + "/flab/repository/public/api/v1/folders/:repository-id/folders",
        createFolderInRepository:
            repository + "/flab/repository/public/api/v1/repositories/:repository-id/folder",
        createSubFolder:
            repository + "/flab/repository/public/api/v1/folders/:folder-id",
        downloadFile:repository + "/flab/repository/public/api/v1/files/:file-id",
        addFileToFolder:
            repository + "/flab/repository/public/api/v1/folders/:folder-id/file",
        updateFolder:
            repository + "/flab/repository/public/api/v1/folders/:folder-id",
        updateFile: repository + "/flab/repository/public/api/v1/files/:file-id",
    },
    account: {
        getAccountInfo:
            account + "/flab/account/public/api/v1/profiles/:profile-id",
        updateAccountInfo:
            account + "/flab/account/public/api/v1/profiles/:profile-id",
    },
    project: {
        getProjectByLabId:
            laboratory + "/flab/lab/public/api/v1/projects/:lab-id/projects",
        getProjectDetailById:
            laboratory + "/flab/lab/public/api/v1/projects/:project-id",
        getAllMemberInProject:
            laboratory + "/flab/lab/public/api/v1/projects/:project-id/members",
        removeMemberInProject:
            laboratory + "/flab/lab/public/api/v1/projects/:project-id/members/:member-id",
        removeProject:
            laboratory + "/flab/lab/public/api/v1/projects/:lab-id/:project-id",
        createProject:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/project",
        updateProject:
            laboratory + "/flab/lab/public/api/v1/laboratories/:laboratory-id/projects/:project-id",
        addMemberToProject:
            laboratory + "/flab/lab/public/api/v1/projects/:project-id/members/member",
    },
    news: {
        getListNews: notification + "/flab/notification/public/api/v1/news",
        getNewsByNewsId: notification + "/flab/notification/public/api/v1/news/",
        createNews: notification + "/flab/notification/public/api/v1/news/news",
    },
    workSpace: {
        getAllSprint:
            workspace + "/flab/workspace/public/api/v1/sprints/:workspace-id/sprints",
        getTaskDetail:
            workspace + "/flab/workspace/public/api/v1/tasks/:task-id",
        getSubTaskDetail:
            workspace + "/flab/workspace/public/api/v1/subtasks/:subtask-id",
        getAllMemberInWorkspace:
            workspace + "/flab/workspace/public/api/v1/workspaces/:workspace-id",
    },
    member: {
        getMemberDetail:
            account + "/flab/account/public/api/v1/profiles/:profile-id",
    },
};
