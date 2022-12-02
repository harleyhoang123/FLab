import { routes } from "./routers";

export class MaterialController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  getMaterialById({ materialId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.material.getMaterialById.replace(":material-id", materialId),
      data: null,
    });
  }
}
