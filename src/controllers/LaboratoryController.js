import { routes } from "./routers";

export class LaboratoryController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  getLaboratoryByAccountId({ accountId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.laboratory.getLaboratory,
      data: null,
      params: {
        "account-id": accountId,
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
}
