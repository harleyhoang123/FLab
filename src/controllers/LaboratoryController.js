import { routes } from './routers';

export class LaboratoryController {
    constructor(networkService) {
        this.networkService = networkService;
    }

    getLaboratoryByAccountId({ accountId }){
        return this.networkService.request(
            {
                method: 'GET',
                url: routes.laboratory.getLaboratory + accountId,
                data: null
            }
        );
    }
}
