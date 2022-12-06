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

  getFolderDetail({ folderId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.repository.getFolderDetail.replace(":folder-id", folderId),
      data: null,
    });
  }

  createFolderInRepo({ repositoryId, requestData }) {
    return this.networkService.request({
      method: "POST",
      url: routes.repository.createFolderInRepository.replace(
        ":repository-id",
        repositoryId
      ),
      data: {
        folderName: requestData.folderName,
        description: requestData.description,
      },
    });
  }

  createSubFolder({ parentFolderId, requestData }) {
    console.log(
      "Parent folder id in create sub folder controller:" + parentFolderId
    );
    return this.networkService.request({
      method: "POST",
      url: routes.repository.createSubFolder.replace(
        ":folder-id",
        parentFolderId
      ),
      data: {
        folderName: requestData.folderName,
        description: requestData.description,
      },
    });
  }
}
