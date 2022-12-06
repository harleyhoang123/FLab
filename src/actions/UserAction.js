import {UserController} from "../controllers";
import {strings} from "../localization";
import AsyncStorage from '@react-native-community/async-storage';
import React,{useState} from "react";

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
    payload: {user},
});

const loginError = (error) => ({
    type: TYPES.LOGIN_ERROR,
    payload: {error},
});

const clearStore = () => ({
    type: TYPES.CLEAR_STORE,
    payload: null,
});
export const login =
    (username, password, navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                dispatch(loginRequest());
                const userController = new UserController(networkService);
                const {data} = await userController.login({username, password});
                console.log("Data is: " + JSON.stringify(data));
                if (data.data !== null) {
                    try {
                        await AsyncStorage.setItem("@accountId", data.data.accountId);
                        await AsyncStorage.setItem("@roles", data.data.roles);
                        await AsyncStorage.setItem("@avatar", data.data.avatar);
                        console.log("Set account id success: " + JSON.stringify(data.data));
                    } catch ({err}) {
                        console.log("Can't store accountId:" + err)
                    }
                    navigation.push("Home");
                }
                networkService.setAccessToken(data.data.token);
                dispatch(loginSuccess(data));
            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };

export const logout =
    () =>
        async (dispatch, _, {networkService}) => {
            networkService.clearAccessToken();
            dispatch(clearStore());
        };
export const register =
    (email, username, fullName, password, navigation) => async (dispatch, _, {networkService}) => {
        try {
            const userController = new UserController(networkService);
            const {data} = await userController.register({email, username, fullName, password});
            console.log("Data Register is: " + JSON.stringify(data));
            if (data.data !== null) {
                navigation.push("Login")
            }

        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
export const forgot =
    (emailOrUsername, navigation) => async (dispatch, _, {networkService}) => {
        console.log("In User Action: " + emailOrUsername);
        try {
            const userController = new UserController(networkService);
            const {data} = await userController.forgotPassword({emailOrUsername});
            console.log("Data Forgot is: " + JSON.stringify(data));
            if (data.data !== null) {
                navigation.push("Login")
            }
        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };

export const changePassword =
    (oldPassword, newPassword,accountId) => async (dispatch, _, {networkService}) => {
        console.log("Oll Password User Action: "+ oldPassword);
        console.log("New Password User Action: "+ newPassword);
        console.log("Account ID User Action: "+ accountId);
        try {
            // const [accountId, setAccountId] = useState('');
            // getAccountId().then(accountId => setAccountId(accountId));
            // console.log("Account ID User Action: "+ accountId);
            const userController = new UserController(networkService);
            const {data} = await userController.changePassword({oldPassword, newPassword, accountId});
            console.log("Data Change is: " + JSON.stringify(data));
        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };


export const getAccountInfoByAccountId =
    (accountId, navigation) => async (dispatch, _, {networkService}) => {
        console.log("Account ID User Action: "+ accountId);
        try {
            const userController = new UserController(networkService);
            const {data} = await userController.getAccountInfo({ accountId});
            console.log("Data Change is: " + JSON.stringify(data));
            console.log("Data.data is: "+ JSON.stringify(data.data))
            if(data.data != null){
                navigation.navigate("Profile", {data: data.data})
            }
        } catch ({data}) {
            console.log("In catch: "+ JSON.stringify(data))
        }
    };
export const getAccountInfoByAccountIdToEdit =
    (accountId, navigation) => async (dispatch, _, {networkService}) => {
        console.log("Account ID User Action: "+ accountId);
        try {
            const userController = new UserController(networkService);
            const {data} = await userController.getAccountInfo({ accountId});
            console.log("Data Change is: " + JSON.stringify(data));
            console.log("Data.data is: "+ JSON.stringify(data.data))
            if(data.data != null){
                navigation.navigate("EditProfile", {data: data.data})
            }
        } catch ({data}) {
            console.log("In catch: "+ JSON.stringify(data))
        }
    };
export const updateProfile =
    (profileId, accountId, gender, dateOfBirth, address, phoneNumber, studentId, studentCode, major, currentTermNo, specialized, navigation) => async (dispatch, _, {networkService}) => {
        console.log("Account ID User Action: "+ accountId);
        try {
            const userController = new UserController(networkService);
            const {data} = await userController.updateProfile({ profileId, accountId, gender, dateOfBirth, address, phoneNumber, studentId, studentCode, major, currentTermNo, specialized});
            console.log("Data Change is: " + JSON.stringify(data));
            console.log("Data.data is: "+ JSON.stringify(data.data))
            if(data.data != null){
                dispatch(getAccountInfoByAccountId(accountId, navigation))
            }
        } catch ({data}) {
            console.log("In catch: "+ JSON.stringify(data))
        }
    };
