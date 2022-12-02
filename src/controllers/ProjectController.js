import { routes } from "./routers";

export class ProjectController {
    constructor(networkService) {
        this.networkService = networkService;
    }

    getMembersInProject({projectId}){
        return this.networkService.request({
            method: "GET",
            url: routes.project.getMembersInProject.replace(":project-id", projectId),
            data: null,
        });
    }

}
