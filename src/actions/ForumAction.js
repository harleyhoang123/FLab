import {strings} from "../localization";
import {ForumController} from "../controllers/ForumController";
import {TYPES} from "./UserAction";
const loginError = (error) => ({
    type: TYPES.LOGIN_ERROR,
    payload: {error},
});
export const getQuestionDetailByQuestionId =
    (questionId, navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                const forumController = new ForumController(networkService);
                console.log("Questions ID in actions: "+ questionId)
                const response = await forumController.getQuestionDetailByQuestionId({questionId});
                navigation.navigate("QuestionDetail", {data: response.data.data});
            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };