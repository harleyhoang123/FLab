import {UserController} from "../controllers";
import {strings} from "../localization";
import AsyncStorage from '@react-native-community/async-storage';

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
                        await AsyncStorage.setItem("@accountId", data.data.accountId)
                        console.log("Set account id success: " + data.data.accountId)
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
        async (dispatch, _, {demoMode, networkService}) => {
            try {
                const userController = new UserController(networkService);
                await userController.logout();
            } finally {
                networkService.clearAccessToken();
                dispatch(clearStore());
            }
        };
export const register =
    (email, fullName, username, password, navigation) => async (dispatch, _, {networkService}) => {
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
    (username, navigation) => async (dispatch, _, {networkService}) => {
        try {
            const userController = new UserController(networkService);
            const {data} = await userController.forgot(username);
            console.log("Data Register is: " + JSON.stringify(data));
            if (data.data !== null) {
                navigation.push("Login")
            }

        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
