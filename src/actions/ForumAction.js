import {strings} from "../localization";
import {ForumController} from "../controllers/ForumController";
import {TYPES} from "./UserAction";
import {UserController} from "../controllers";
const loginError = (error) => ({
    type: TYPES.LOGIN_ERROR,
    payload: {error},
});
export const getQuestionDetailByQuestionId =
    (questionId, navigation,isEdit) =>
        async (dispatch, _, {networkService}) => {
            try {
                const forumController = new ForumController(networkService);
                console.log("Questions ID in actions: "+ questionId)
                const response = await forumController.getQuestionDetailByQuestionId({questionId});
                if (isEdit){
                    navigation.push("AddQuestion", {data: response.data.data});
                }else {
                    navigation.push("QuestionDetail", {data: response.data.data});
                }

            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };
export const addQuestion =
    (title,content,tag, navigation) => async (dispatch, _, {networkService}) => {
        console.log("title in actions: "+ title)
        console.log("content in actions: "+ content)
        console.log("tag in actions: "+ tag)
        try {
            const forumController = new ForumController(networkService);

            const {data} = await forumController.addQuestion({title,content,tag});
            console.log("Data AddQuestion is: " + JSON.stringify(data));
            if (data.data !== null) {
                navigation.push("Forum")
            }
        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
export const updateQuestion =
    (title,content,tag,questionId, navigation) => async (dispatch, _, {networkService}) => {
        console.log("title in actions: "+ title)
        console.log("content in actions: "+ content)
        console.log("tag in actions: "+ tag)
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.updateQuestion({title,content,tag, questionId});
            console.log("Data AddQuestion is: " + JSON.stringify(data));
            if (data.data !== null) {
                navigation.push("Forum")
            }
        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };