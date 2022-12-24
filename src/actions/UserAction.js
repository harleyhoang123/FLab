import { UserController } from "../controllers";
import { strings } from "../localization";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";

export const TYPES = {
  CLEAR_STORE: "CLEAR_STORE",
  LOGIN: "LOGIN",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
};

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginSuccess = (user) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});
export const login =
  (username, password, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      dispatch(loginRequest());
      const userController = new UserController(networkService);
      const { data } = await userController.login({ username, password });
      console.log("Data is Login : " + JSON.stringify(data));
      if (data.data !== null) {
        try {
          await AsyncStorage.setItem("@accountId", data.data.accountId);
          await AsyncStorage.setItem("@roles", data.data.role);
          await AsyncStorage.setItem("@avatar", data.data.avatar);
          await AsyncStorage.setItem("@token", data.data.token);
          await AsyncStorage.setItem("@username", data.data.fullName);
          console.log("Set account id success: " + JSON.stringify(data.data));
        } catch ({ err }) {
          console.log("Can't store accountId:" + err);
        }
        navigation.push("Home");
      }
      networkService.setAccessToken(data.data.token);
      dispatch(loginSuccess(data));
    } catch ({ data }) {
      console.log("Login fail " + JSON.stringify(data));
      if (data.status.status === 401) {
        alert(data.status.message);
      }
    }
  };

export const logout =
  () =>
  async (dispatch, _, { networkService }) => {
    networkService.clearAccessToken();
    dispatch(clearStore());
  };
export const register =
  (email, username, fullName, password, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const userController = new UserController(networkService);
      const { data } = await userController.register({
        email,
        username,
        fullName,
        password,
      });
      console.log("Data Register is: " + JSON.stringify(data));
      if (data.data !== null) {
        navigation.push("Login");
      }
    } catch ({ data }) {
      console.log("Register fail: " + JSON.stringify(data));
      // if(data.status.status===400){
      //   alert(data.status.message)
      // }
    }
  };
export const forgot =
  (emailOrUsername, navigation) =>
  async (dispatch, _, { networkService }) => {
    console.log("In User Action: " + emailOrUsername);
    try {
      const userController = new UserController(networkService);
      const { data } = await userController.forgotPassword({ emailOrUsername });
      console.log("Data Forgot is: " + JSON.stringify(data));
      if (data.data !== null) {
        navigation.push("Login");
      }
    } catch ({ data }) {
      dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
    }
  };

export const changePassword =
  (oldPassword, newPassword, accountId) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const userController = new UserController(networkService);
      const { data } = await userController.changePassword({
        oldPassword,
        newPassword,
        accountId,
      });
    } catch ({ data }) {
      if (data) {
        if (data.status) {
          if (data.status.status) {
            errorCode = data.status.status;
            let displayMessage = data.status.message;
            if (displayMessage == null) {
              displayMessage = "Oops! Something went wrong.";
            }
            if (errorCode == 400) {
              alert(displayMessage);
              return;
            }
            navigation.push("ErrorPage", {
              status: errorCode,
              displayMessage: displayMessage,
            });
            return;
          }
        }
      }
      navigation.push("ErrorPage", {
        status: 500,
        displayMessage: "Oops! Something went wrong.",
      });
    }
  };

export const getAccountInfoByAccountId =
  (accountId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const userController = new UserController(networkService);
      const { data } = await userController.getAccountInfo({ accountId });
      if (data.data != null) {
        navigation.navigate("Profile", { data: data.data });
      }
    } catch ({ data }) {
      if (data) {
        if (data.status) {
          if (data.status.status) {
            errorCode = data.status.status;
            let displayMessage = data.status.message;
            if (displayMessage == null) {
              displayMessage = "Oops! Something went wrong.";
            }
            if (errorCode == 400) {
              alert(displayMessage);
              return;
            }
            navigation.push("ErrorPage", {
              status: errorCode,
              displayMessage: displayMessage,
            });
            return;
          }
        }
      }
      navigation.push("ErrorPage", {
        status: 500,
        displayMessage: "Oops! Something went wrong.",
      });
    }
  };
export const getAccountInfoByAccountIdToEdit =
  (accountId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const userController = new UserController(networkService);
      const { data } = await userController.getAccountInfo({ accountId });
      if (data.data != null) {
        navigation.navigate("EditProfile", { data: data.data });
      }
    } catch ({ data }) {
      if (data) {
        if (data.status) {
          if (data.status.status) {
            errorCode = data.status.status;
            let displayMessage = data.status.message;
            if (displayMessage == null) {
              displayMessage = "Oops! Something went wrong.";
            }
            if (errorCode == 400) {
              alert(displayMessage);
              return;
            }
            navigation.push("ErrorPage", {
              status: errorCode,
              displayMessage: displayMessage,
            });
            return;
          }
        }
      }
      navigation.push("ErrorPage", {
        status: 500,
        displayMessage: "Oops! Something went wrong.",
      });
    }
  };
export const updateProfile =
  (
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
    interest,
    navigation
  ) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const userController = new UserController(networkService);
      console.log("Role Number:" + studentId);
      const { data } = await userController.updateProfile({
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
        interest,
      });
      if (data !== null) {
        dispatch(getAccountInfoByAccountId(profileId, navigation));
      }
    } catch ({ data }) {
      if (data) {
        if (data.status) {
          if (data.status.status) {
            errorCode = data.status.status;
            let displayMessage = data.status.message;
            if (displayMessage == null) {
              displayMessage = "Oops! Something went wrong.";
            }
            if (errorCode == 400) {
              alert(displayMessage);
              return;
            }
            navigation.push("ErrorPage", {
              status: errorCode,
              displayMessage: displayMessage,
            });
            return;
          }
        }
      }
      navigation.push("ErrorPage", {
        status: 500,
        displayMessage: "Oops! Something went wrong.",
      });
    }
  };
