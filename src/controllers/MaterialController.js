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

  updateMaterial({ labId,materialId,materialName,status,amount, description,note,image }) {
    return this.networkService.request({
      method: "PUT",
      url: routes.material.updateMeterial
        .replace(":laboratory-id", labId)
        .replace(":material-id", materialId),
      data: {
        materialName: materialName,
        status:status,
        description: description,
        status: status,
        amount: amount,
        note:note,
        image:image
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
  orderMaterial({ labId, materialId, amount,reason, orderFrom, orderTo }) {
    return this.networkService.request({
      method: "POST",
      url: routes.material.orderMaterial
          .replace(":laboratory-id", labId).replace(":material-id", materialId),
      data: {
        amount: amount,
        reason: reason,
        orderFrom: orderFrom,
        orderTo: orderTo
      },
    });
  }
}
