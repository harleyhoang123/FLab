import {routes} from './routers';

export class UserController {
    constructor(networkService) {
        this.networkService = networkService;
    }

    login({username, password}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.authentication.login,
            data: {
                emailOrUsername: username,
                password: password
            },
        });
    }

    register({email, username, fullName, password}) {
        return this.networkService.request({
            method: 'POST',
            url: routes.authentication.register,
            data: {
                email: email,
                username: username,
                fullName: fullName,
                password: password
            },
        });
    }

    forgotPassword({emailOrUsername}) {
        console.log("In User Controller: " + emailOrUsername)
        return this.networkService.request({
            method: 'POST',
            url: routes.authentication.forgot,
            data: {
                emailOrUsername: emailOrUsername
            },
        });
    }

    changePassword({oldPassword, newPassword, accountId}) {
        console.log("Oll Password User Controller: "+ oldPassword)
        console.log("New Password User Controller: "+ newPassword)
        console.log("accountId User Controller: "+ accountId)
        return this.networkService.request({
            method: 'PUT',
            url: routes.authentication.changePassword.replace(":account-id", accountId),
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword
            },
        });
    }
}
