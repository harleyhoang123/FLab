import { routes } from './routers';

export class UserController {
    constructor(networkService) {
        this.networkService = networkService;
    }

    login({ username, password }) {
        return this.networkService.request({
            method: 'POST',
            url: routes.authentication.login,
            data: {
                emailOrUsername: username ,
                password: password
            },
        });
    }

    logout() {
        return this.networkService.request({
            method: 'DELETE',
            url: routes.authentication.logout,
        });
    }
}
