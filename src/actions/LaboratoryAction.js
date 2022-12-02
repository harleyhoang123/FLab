import {LaboratoryController} from "../controllers/LaboratoryController";
import {strings} from "../localization";

export const getLaboratoryByAccountId =
    (accountId, navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                const laboratoryController = new LaboratoryController(networkService);
                console.log("Account ID in actions: " + accountId);
                const response = await laboratoryController.getLaboratoryByAccountId({
                    accountId,
                });
                navigation.navigate("Lab", {data: response.data.data});
            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };

export const getLaboratoryById =
    (labId, isJoined, navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                const laboratoryController = new LaboratoryController(networkService);
                console.log("Lab ID in actions: " + labId);
                const response = await laboratoryController.getLaboratoryById({
                    labId,
                });
                navigation.navigate("YourLab", {
                    data: response.data.data,
                    isJoined: isJoined,
                });
            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };

export const getAllMemberInLaboratoryById =
    (labId, navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                const laboratoryController = new LaboratoryController(networkService);
                console.log("Lab ID in actions: " + labId);
                const response = await laboratoryController.getAllMemberInLaboratory({
                    labId,
                });
                navigation.navigate("ViewAllMember", {
                    data: response.data.data,
                });
            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };


export const getListMaterialByLabId =
    (labId, navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                const laboratoryController = new LaboratoryController(networkService);
                console.log("Lab ID in actions: " + labId);
                const response = await laboratoryController.getListMaterialByLabId({
                    labId,
                });
                console.log("Response from get list material by id: "+ JSON.stringify(response))
                console.log("Data: "+ JSON.stringify(response.data.data))
                navigation.navigate("ListMaterial", {
                    data: response.data.data,
                });
            } catch ({data}) {
                console.log("ERROR when getListMaterialByLabId: "+ JSON.stringify(data))
            }
        };
