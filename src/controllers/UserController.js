import { routes } from "./routers";

export class UserController {
  constructor(networkService) {
    this.networkService = networkService;
  }

  login({ username, password }) {
    return this.networkService.request({
      method: "POST",
      url: routes.authentication.login,
      data: {
        emailOrUsername: username,
        password: password,
      },
    });
  }

  register({ email, username, fullName, password }) {
    return this.networkService.request({
      method: "POST",
      url: routes.authentication.register,
      data: {
        email: email,
        username: username,
        fullName: fullName,
        password: password,
      },
    });
  }

  forgotPassword({ emailOrUsername }) {
    console.log("In User Controller: " + emailOrUsername);
    return this.networkService.request({
      method: "POST",
      url: routes.authentication.forgot,
      data: {
        emailOrUsername: emailOrUsername,
      },
    });
  }

  changePassword({ oldPassword, newPassword, accountId }) {
    console.log("Oll Password User Controller: " + oldPassword);
    console.log("New Password User Controller: " + newPassword);
    console.log("accountId User Controller: " + accountId);
    const URL = routes.authentication.changePassword.replace(
      ":account-id",
      accountId
    );
    console.log("URL: " + URL);
    return this.networkService.request({
      method: "PUT",
      url: URL,
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    });
  }

  getAccountInfo({ accountId }) {
    return this.networkService.request({
      method: "GET",
      url: routes.account.getAccountInfo.replace(":profile-id", accountId),
      data: null,
    });
  }

  updateProfile({
                  profileId,
                  gender,
                  dateOfBirth,
                  address,
                  studentId,
                  memberCode,
                  major,
                  currentTermNo,
                  specialized,
                  description,
                  award,
                  interest
  }) {
    console.log("cotrlooo:" + studentId);
    return this.networkService.request({
      method: "PUT",
      url: routes.account.updateAccountInfo.replace(":profile-id", profileId),
      data: {
        gender: gender,
        dateOfBirth: dateOfBirth,
        address: address,
        studentId: studentId,
        studentCode: memberCode,
        major: major,
        currentTermNo: currentTermNo,
        specialized: specialized,
        description: description,
        award: award,
        interest: interest,
      },
    });
  }
}
