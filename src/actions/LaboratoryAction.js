import {LaboratoryController} from "../controllers/LaboratoryController";
import {strings} from "../localization";

export const getLaboratoryByAccountId =
    (accountId, navigation) =>
        async (dispatch, _, {networkService}) => {
            try {

                const laboratoryController = new LaboratoryController(networkService);
                console.log("Account ID in actions: "+ accountId)
                const response = await laboratoryController.getLaboratoryByAccountId({accountId});
                navigation.navigate("Lab", {data: response.data.data});
            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };
