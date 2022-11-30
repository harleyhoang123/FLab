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
    register({email, username,fullName , password}){
        return this.networkService.request({
            method: 'POST',
            url: routes.authentication.register,
            data: {
                email: email ,
                username: username,
                fullName: fullName,
                password: password
            },
        });
    }
    forgot({username}){
        return this.networkService.request({
            method: 'POST',
            url: routes.authentication.forgot,
            data: {
                username: username
            },
        });
    }
}
