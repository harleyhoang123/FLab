import {WorkSpaceController} from "../controllers/WorkSpaceController";
import {NetworkService} from "../networking";

export const getAllSprint =
    (projectId, taskId,subTaskId,sprintId, navigation) =>
        async (dispatch, _, { networkService }) => {
            try {
                const workSpaceController = new WorkSpaceController(networkService);
                console.log("Project ID in getAllSprint: " + projectId);
                const response = await workSpaceController.getAllSprint({projectId});
                console.log("Data getAllSprintis : " + JSON.stringify(response));
                let responseTaskDetail = null;
                if(taskId != null){
                    responseTaskDetail = await workSpaceController.getTaskDetail({taskId});
                }
                let responseSubTaskDetail = null;
                if(subTaskId != null){
                    responseSubTaskDetail = await workSpaceController.getSubTaskDetail({subTaskId});
                }
                console.log("Response task detail in get all sprint: "+ JSON.stringify(responseTaskDetail))
                navigation.push("Backlog", {
                    projectId: projectId,
                    sprintId :sprintId,
                    data: response.data.data,
                    taskDetail: responseTaskDetail,
                    subTaskDetail:responseSubTaskDetail
                });
            } catch ({ data }) {
                console.log(
                    "Error when get getAllSprint " + JSON.stringify(data)
                );
            }
        };
export const getTaskDetail =
    (taskId) =>
        async () => {
            const networkService = new NetworkService();
            try {
                const workSpaceController = new WorkSpaceController(networkService);
                console.log("taskId in Action: " + taskId);
                const response = await workSpaceController.getTaskDetail({taskId});
                console.log("Data getTaskDetail : " + JSON.stringify(response));
                return response.data;
            } catch ({ data }) {
                console.log(
                    "Error when get getTaskDetail " + JSON.stringify(data)
                );
            }
        };
export const getSubTaskDetail =
    (subTaskId) =>
        async () => {
            const networkService = new NetworkService();
            try {
                const workSpaceController = new WorkSpaceController(networkService);
                console.log("subTaskId in Action: " + subTaskId);
                const response = await workSpaceController.getSubTaskDetail({subTaskId});
                console.log("Data getSubTaskDetail : " + JSON.stringify(response));
                return response.data;
            } catch ({ data }) {
                console.log(
                    "Error when get getSubTaskDetail " + JSON.stringify(data)
                );
            }
        };