import {routes} from "./routers";

export class WorkSpaceController {
    constructor(networkService) {
        this.networkService = networkService;
    }
    getAllSprint({projectId}) {
        return this.networkService.request({
                method: 'GET',
                url: routes.workSpace.getAllSprint.replace(":workspace-id", projectId),
                data: null
            }
        );
    }
    getTaskDetail({taskId}) {
        return this.networkService.request({
                method: 'GET',
                url: routes.workSpace.getTaskDetail.replace(":task-id", taskId),
                data: null
            }
        );
    }
    getSubTaskDetail({subTaskId}) {
        return this.networkService.request({
                method: 'GET',
                url: routes.workSpace.getSubTaskDetail.replace(":subtask-id", subTaskId),
                data: null
            }
        );
    }
}