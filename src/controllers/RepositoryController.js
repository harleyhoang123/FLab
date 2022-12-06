import { routes } from "./routers";

export class RepositoryController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  getFolderByRepositoryId({ repoId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.repository.getFolderByRepositoryId.replace(
        ":repository-id",
        repoId
      ),
      data: null,
    });
  }

  getAllRepository() {
    return this.networkService.request({
      method: "GET",
      url: routes.repository.getAllRepository,
      data: null,
    });
  }

  createFolderInRepo({ repositoryId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.repository.createFolderInRepository,
      data: {
        folderName: requestData.folderName,
        description: requestData.description,
      },
    });
  }
}
