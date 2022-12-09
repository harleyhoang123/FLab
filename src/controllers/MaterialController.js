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
  addMaterial({ labId, materialName, description,amount, note, images }) {
    return this.networkService.request({
      method: "POST",
      url: routes.material.addMaterial
          .replace(":lab-id", labId),
      data: {
        materialName: materialName,
        description: description,
        amount: amount,
        note: note,
        images: images,
      },
    });
  }
}
