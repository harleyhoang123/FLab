import { routes } from "./routers";

export class LaboratoryController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  getLaboratoryByAccountId({ accountId, page, size }) {
    return this.networkService.request({
      method: "GET",
      url: routes.laboratory.getLaboratory,
      data: null,
      params: {
        "account-id": accountId,
        page: page,
        size: size,
      },
    });
  }

  getLaboratoryById({ labId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.laboratory.getLaboratoryById.replace(":lab-id", labId),
      data: null,
    });
  }

  getAllMemberInLaboratory({ labId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.laboratory.getAllMemberInLaboratory.replace(":lab-id", labId),
      data: null,
    });
  }

  getListMaterialByLabId({ labId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.material.getMaterialByLabId.replace(":laboratory-id", labId),
      data: null,
    });
  }
  getProjectByLabId({ labId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.project.getProjectByLabId.replace(":lab-id", labId),
      data: null,
    });
  }

  getProjectDetail({ projectId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.project.getProjectDetailById.replace(
        ":project-id",
        projectId
      ),
      data: null,
    });
  }

  getMemberDetail({ accountId }) {
    console.log("ProfileId in controller: " + accountId);
    return this.networkService.request({
      method: "GET",
      url: routes.member.getMemberDetail.replace(":profile-id", accountId),
      data: null,
    });
  }

  getMembersInLaboratory({ labId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.laboratory.getMembersInLaboratory,
      data: null,
    });
  }

  getAllMembersInProject({ projectId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.project.getAllMemberInProject.replace(
        ":project-id",
        projectId
      ),
      data: null,
    });
  }
  getAllMembersInWorkspace({ projectId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.workSpace.getAllMemberInWorkspace.replace(
        ":workspace-id",
        projectId
      ),
      data: null,
    });
  }

  createProjectInLaboratory({ labId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.laboratory.createProjectInLaboratory.replace(
        ":lab-id",
        labId
      ),
      data: {
        projectName: requestData.projectName,
        description: requestData.description,
        startDate: requestData.startDate,
        endDate: requestData.endDate,
      },
    });
  }

  createMaterialInLaboratory({ labId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.laboratory.createMaterialInLaboratory.replace(
        ":lab-id",
        labId
      ),
      data: {
        projectName: requestData.materialName,
        description: requestData.description,
        amount: requestData.amount,
        images: requestData.images,
      },
    });
  }

  createProjectInLab({ labId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.project.createProject.replace(":lab-id", labId),
      data: {
        projectName: requestData.projectName,
        description: requestData.description,
        startDate: requestData.startDate,
        toDate: requestData.toDate,
      },
    });
  }

  updateLaboratory({ labId, requestData }) {
    return this.networkService.request({
      method: "PUT",
      url: routes.laboratory.updateLaboratory.replace(":lab-id", labId),
      data: {
        projectName: requestData.laboratoryName,
        description: requestData.description,
        major: requestData.major,
        ownerBy: requestData.ownerBy,
      },
    });
  }

  deleteLaboratory({ labId }) {
    return this.networkService.request({
      method: "DELETE",
      url: routes.laboratory.deleteLaboratory.replace(":lab-id", labId),
      data: null,
    });
  }

  removeMemberInProject({ projectId, memberId }) {
    return this.networkService.request({
      method: "DELETE",
      url: routes.project.removeMemberInProject
        .replace(":project-id", projectId)
        .replace(":member-id", memberId),
      data: null,
    });
  }

  createLaboratory({ requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.laboratory.createLaboratory,
      data: {
        labName: requestData.labName,
        description: requestData.description,
        major: requestData.major,
      },
    });
  }

  removeMemberFromLaboratory({ labId, memberId }) {
    return this.networkService.request({
      method: "DELETE",
      url: routes.laboratory.removeMemberFromLaboratory
        .replace(":lab-id", labId)
        .replace(":member-id", memberId),
      data: null,
    });
  }

  removeProject({ labId, projectId }) {
    return this.networkService.request({
      method: "DELETE",
      url: routes.project.removeProject
        .replace(":lab-id", labId)
        .replace(":project-id", projectId),
      data: null,
    });
  }

  updateLaboratory({ labId, requestData }) {
    return this.networkService.request({
      method: "PUT",
      url: routes.laboratory.updateLaboratory.replace(":lab-id", labId),
      data: {
        laboratoryName: requestData.labName,
        description: requestData.description,
        major: requestData.major,
        ownerBy: requestData.ownerBy,
      },
    });
  }

  updateProject({ labId, projectId, requestData }) {
    return this.networkService.request({
      method: "PUT",
      url: routes.project.updateProject
        .replace(":laboratory-id", labId)
        .replace(":project-id", projectId),
      data: {
        projectName: requestData.projectName,
        description: requestData.description,
        startDate: requestData.startDate,
        toDate: requestData.toDate,
      },
    });
  }

  updateMemberRole({ memberId, requestData }) {
    return this.networkService.request({
      method: "PUT",
      url: routes.laboratory.updateMemberRole.replace(":member-id", memberId),
      data: {
        role: requestData.role,
      },
    });
  }

  addMembersToLab({ labId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.laboratory.addMemberToLab.replace(":lab-id", labId),
      data: {
        accountId: requestData.accountId,
      },
    });
  }

  applyToLab({ labId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.laboratory.applyToLab.replace(":lab-id", labId),
      data: {
        accountId: requestData.accountId,
        reason: requestData.reason,
        cvKey: requestData.cvKey,
      },
    });
  }

  getAllRequest({ labId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.laboratory.getAllRequest.replace(":lab-id", labId),
      data: null,
    });
  }

  getRequestDetail({ applicationId, requestData }) {
    return this.networkService.request({
      method: "GET",
      url: routes.laboratory.getRequestDetail.replace(
        ":application-id",
        applicationId
      ),
    });
  }

  reviewRequestInLab({ labId, applicationId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.laboratory.reviewRequest
        .replace(":lab-id", labId)
        .replace(":application-id", applicationId),
      data: {
        status: requestData.status,
        comment: requestData.comment,
      },
    });
  }
}
