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

  updateMaterial({ labId, materialId, requestData }) {
    return this.networkService.request({
      method: "PUT",
      url: routes.material.updateMeterial
        .replace(":laboratory-id", labId)
        .replace(":material-id", materialId),
      data: {
        materialName: requestData.materialName,
        description: requestData.description,
        status: requestData.status,
        amount: requestData.amount,
      },
    });
  }
}
