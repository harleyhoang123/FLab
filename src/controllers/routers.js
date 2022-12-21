import {account, forum, laboratory, notification, repository, workspace} from "./ip";
import {
    addTag,
    changeAvatar,
    deleteCVbyAccountId, deleteTag, getAccountAdmin, getAllMemberInProject, getAllTag,
    getCVbyAccountId,
    getLaboratoryByAccountId, getListOrderByAccountId,
    getListOrderByLabId, getProfileDetail,
    responseOrder, returnOrder,
    reviewRequest, updateProfileCv, updateTag, uploadProfileCv
} from "../networking/CustomNetworkService";

export const routes = {
    laboratory: {
        getLaboratory:
            laboratory + "/flab/lab/public/api/v1/laboratories",
        getLaboratorySuggestion:
            laboratory + "/flab/lab/public/api/v1/laboratories/suggestion",
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
        getAllMemberInLab:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/members",
        deleteMaterial:
            laboratory + "/flab/lab/public/api/v1/laboratories/:laboratory-id/materials/:material-id",
        getListMaterial:
            laboratory + "/flab/lab/public/api/v1/laboratories/:laboratory-id/materials",
        getListOrderByLabId:
            laboratory + "/flab/lab/public/api/v1/laboratories/:laboratory-id/orders",
        responseOrder:
            laboratory + "/flab/lab/public/api/v1/materials/:order-id",
        reviewRequest:
            laboratory + "/flab/lab/public/api/v1/laboratories/:lab-id/:application-id",
        getListOrderByAccountId:
            laboratory + "/flab/lab/public/api/v1/laboratories/:laboratory-id/:account-id/materials",
        returnOrder:
            laboratory + "/flab/lab/public/api/v1/materials/orders/:order-id",
    },
    forum: {
        getQuestionDetail:
            forum + "/flab/forum/public/api/v1/questions/",
        addQuestion:
            forum + "/flab/forum/public/api/v1/questions/question",
        updateQuestion:
            forum + "/flab/forum/public/api/v1/questions/",
        postComment:
            forum + "/flab/forum/public/api/v1/questions/:question-id/comment",
        postAnswer:
            forum + "/flab/forum/public/api/v1/questions/:question-id/answer",
        getListQuestion:
            forum + "/flab/forum/public/api/v1/questions",
        closeQuestion:
            forum + "/flab/forum/public/api/v1/questions/",
        postCommentToAnswer:
            forum + "/flab/forum/public/api/v1/answers/",
        deleteComment:
            forum + "/flab/forum/public/api/v1/comments/",
        deleteAnswer:
            forum + "/flab/forum/public/api/v1/answers/",
        getQuestionDetailCustom:
            forum + "/flab/forum/public/api/v1/questions/:question-id",
        addAnswer:
            forum + "/flab/forum/public/api/v1/questions/:question-id/answer",
        addCommentToQuestion:
            forum + "/flab/forum/public/api/v1/questions/:question-id/comment",
        addCommentToAnswer:
            forum + "/flab/forum/public/api/v1/answers/:answer-id",
        deleteAnswerCustom:
            forum + "/flab/forum/public/api/v1/questions/:question-id/:answer-id",
        deleteCommentInQuestion:
            forum + "/flab/forum/public/api/v1/comments/:question-id/:comment-id",
        deleteCommentInAnswer:
            forum + "/flab/forum/public/api/v1/answers/:answer-id/:comment-id",
        editComment:
            forum + "/flab/forum/public/api/v1/comments/:comment-id",
        editAnswer:
            forum + "/flab/forum/public/api/v1/answers/:answer-id",
        voteQuestion:
            forum + "/flab/forum/public/api/v1/questions/:question-id/vote",
        getAllTag:
            forum + "/flab/forum/public/api/v1/tags",
        addTag:
            forum + "/flab/forum/public/api/v1/tags/tag",
        updateTag:
            forum + "/flab/forum/public/api/v1/tags/:tag-id",
        deleteTag:
            forum + "/flab/forum/public/api/v1/tags/:tag-id",
    },
    repository: {
        getFolderDetail:
            repository + "/flab/repository/public/api/v1/folders/:folder-id",
        getFolderByRepositoryId:
            repository + "/flab/repository/public/api/v1/repositories/:repository-id/folders",
        createFolderInRepository:
            repository + "/flab/repository/public/api/v1/repositories/:repository-id/folder",
        createSubFolder:
            repository + "/flab/repository/public/api/v1/folders/:folder-id",
        downloadFile:
            repository + "/flab/repository/public/api/v1/files/:file-id",
        addFileToFolder:
            repository + "/flab/repository/public/api/v1/folders/:folder-id/file",
        updateFolder:
            repository + "/flab/repository/public/api/v1/folders/:folder-id",
        updateFile:
            repository + "/flab/repository/public/api/v1/files/:file-id",
        deleteFolderInRepository:
            repository + "/flab/repository/public/api/v1/repositories/:repository-id/:folder-id",
        getListFolder:
            repository + "/flab/repository/public/api/v1/repositories/:repository-id/folders",
        deleteFolder:
            repository + "/flab/repository/public/api/v1/folders/:folder-id/folders/:sub-folder-id",
        deleteFile:
            repository + "/flab/repository/public/api/v1/folders/:folder-id/files/:file-id",
        getListFolderDetail:
            repository + "/flab/repository/public/api/v1/folders/:folder-id",

    },
    account: {
        getAccountInfo:
            account + "/flab/account/public/api/v1/profiles/:profile-id",
        updateAccountInfo:
            account + "/flab/account/public/api/v1/profiles/:profile-id",
        login:
            account + "/flab/account/public/api/v1/accounts/account/login",
        register:
            account + "/flab/account/public/api/v1/accounts/account",
        forgot:
            account + "/flab/account/public/api/v1/accounts/password/reset",
        changePassword:
            account + "/flab/account/public/api/v1/accounts/:account-id/password",
        getMemberDetail:
            account + "/flab/account/public/api/v1/profiles/:profile-id",
        getAllMember:
            account + "/flab/account/public/api/v1/accounts",
        getAllCVOfAccount:
            account + "/flab/account/public/api/v1/profiles/:account-id/cv",
        uploadProfileCv:
            account + "/flab/account/public/api/v1/cv/:profile-id",
        getCVbyAccountId:
            account + "/flab/account/public/api/v1/profiles/:account-id/cv",
        deleteCVbyAccountId:
            account + "/flab/account/public/api/v1/cv/:profile-id/:cv-id",
        updateProfileCv:
            account + "/flab/account/public/api/v1/cv/:cv-id",
        changeAvatar:
            account + "/flab/account/public/api/v1/profiles/:profile-id/avatar",
        getProfileDetail:
            account + "/flab/account/public/api/v1/profiles/:profile-id",
        getAccountTag:
            account + "/flab/account/public/api/v1/accounts",
    },
    notification: {
        getListNews:
            notification + "/flab/notification/public/api/v1/news",
        getNewsByNewsId:
            notification + "/flab/notification/public/api/v1/news/",
        createNews:
            notification + "/flab/notification/public/api/v1/news/news",
        updateNews:
            notification + "/flab/notification/public/api/v1/news/:news-id",
        getNewsDetail:
            notification + "/flab/notification/public/api/v1/news/:news-id",
        deleteNews:
            notification + "/flab/notification/public/api/v1/news/:news-id",
        commentToNews:
            notification + "/flab/notification/public/api/v1/news/:news-id/comment",
        commentToComment:
            notification + "/flab/notification/public/api/v1/comments/:comment-id/comment",
        editCommentNews:
            notification + "/flab/notification/public/api/v1/comments/:comment-id",
        deleteCommentInNews:
            notification + "/flab/notification/public/api/v1/news/:new-id/:comment-id",
        deleteCommentInComment:
            notification + "/flab/notification/public/api/v1/comments/:comment-id/:subcomment-id",
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
        createSprint:
            workspace + "/flab/workspace/public/api/v1/sprints/:workspace-id/sprint",
        getListSprint:
            workspace + "/flab/workspace/public/api/v1/sprints/:workspace-id/sprints",
        getTaskDetail:
            workspace + "/flab/workspace/public/api/v1/tasks/:task-id",
        getSubTaskDetail:
            workspace + "/flab/workspace/public/api/v1/subtasks/:subtask-id",
        deleteSprint:
            workspace + "/flab/workspace/public/api/v1/sprints/:workspace-id/sprints/:sprint-id",
        createTask:
            workspace + "/flab/workspace/public/api/v1/tasks/:workspace-id/:sprint-id/task",
        getListTask:
            workspace + "/flab/workspace/public/api/v1/sprints/:sprint-id",
        updateSprint:
            workspace + "/flab/workspace/public/api/v1/sprints/:workspace-id/:sprint-id",
        updateStatusSprint:
            workspace + "/flab/workspace/public/api/v1/sprints/:workspace-id/:sprint-id",
        getSprintDetail:
            workspace + "/flab/workspace/public/api/v1/sprints/:sprint-id",
        deleteSubTask:
            workspace + "/flab/workspace/public/api/v1/subtasks/:task-id/subtasks/:subtask-id",
        updateSubTask:
            workspace + "/flab/workspace/public/api/v1/subtasks/:workspace-id/:subtask-id",
        assignSubTask:
            workspace + "/flab/workspace/public/api/v1/subtasks/:workspace-id/:subtask-id",
        createSubTask:
            workspace + "/flab/workspace/public/api/v1/subtasks/:workspace-id/:task-id/subtask",
        getListSubTask:
            workspace + "/flab/workspace/public/api/v1/tasks/:task-id",
        updateTask:
            workspace + "/flab/workspace/public/api/v1/tasks/:workspace-id/:task-id",
        assignTask:
            workspace + "/flab/workspace/public/api/v1/tasks/:workspace-id/:task-id",
        deleteTask:
            workspace + "/flab/workspace/public/api/v1/tasks/:sprint-id/tasks/:task-id",
    },

};
