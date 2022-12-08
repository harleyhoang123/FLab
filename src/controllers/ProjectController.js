import { routes } from "./routers";

export class ProjectController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  getMembersInProject({ projectId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.project.getMembersInProject.replace(":project-id", projectId),
      data: null,
    });
  }

  addMembersToProject({ projectId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.project.addMemberToProject.replace(":project-id", projectId),
      data: {
        memberId: requestData.memberId,
      },
    });
  }
}
