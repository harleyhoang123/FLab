import {WorkSpaceController} from "../controllers/WorkSpaceController";
import {NetworkService} from "../networking";
import {getProjectById} from "./LaboratoryAction";
import {LaboratoryController} from "../controllers/LaboratoryController";

export const getAllSprint =
    (projectId, navigation) =>
        async (dispatch, _, { networkService }) => {
            try {
                const workSpaceController = new WorkSpaceController(networkService);
                console.log("Project ID in getAllSprint: " + projectId);
                const response = await workSpaceController.getAllSprint({projectId});
                console.log("Data getAllSprintis : " + JSON.stringify(response));
                const laboratoryController = new LaboratoryController(networkService);
                const projectDetail = await laboratoryController.getProjectDetail({
                    projectId,
                });
                navigation.push("Backlog", {
                    projectId: projectId,
                    data: response.data.data,
                    projectDetail:projectDetail.data.data
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