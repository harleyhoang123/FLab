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

  downLoadFile({ fileId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.repository.downloadFile.replace(":file-id", fileId),
      data: null,
    });
  }
  addFileToFolder({parentFolderId,fileName, description, file}){
    return this.networkService.request({
      method: "POST",
      url: routes.repository.addFileToFolder.replace(
          ":folder-id",
          parentFolderId
      ),
      data: {
        fileName:fileName,
        file: file,
        description: description

      },
    });
  }
  updateFolder({folderId, folderName,description}){
    return this.networkService.request({
      method: "PUT",
      url: routes.repository.updateFolder.replace(
          ":folder-id",
          folderId
      ),
      data: {
        folderName: folderName,
        description: description

      },
    });
  }
  updateFile({fileId, fileName,description}){
    return this.networkService.request({
      method: "PUT",
      url: routes.repository.updateFile.replace(
          ":file-id",
          fileId
      ),
      data: {
        fileName: fileName,
        description: description
      },
    });
  }

}
