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
}
