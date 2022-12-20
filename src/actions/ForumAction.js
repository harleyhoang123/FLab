import {strings} from "../localization";
import {ForumController} from "../controllers/ForumController";
import {TYPES} from "./UserAction";
import {useDispatch} from "react-redux";

const loginError = (error) => ({
    type: TYPES.LOGIN_ERROR,
    payload: {error},
});
export const getQuestionDetailByQuestionId =
    (questionId, navigation, isEdit) =>
        async (dispatch, _, {networkService}) => {
            try {
                const forumController = new ForumController(networkService);
                console.log("Questions ID in actions: " + questionId)
                const response = await forumController.getQuestionDetailByQuestionId({questionId});
                if (isEdit) {
                    navigation.push("UpdateQuestion", {data: response.data.data});
                } else {
                    navigation.push("QuestionDetail", {data: response.data.data});
                }

            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };
export const getListQuestion =
    (navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                const forumController = new ForumController(networkService);
                const response = await forumController.getListQuestion();
                console.log("Data getListQuestion is: " + JSON.stringify(response));
                navigation.push("Forum", {data: response.data.data})
            } catch ({data}) {
                dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
            }
        };
export const addQuestion =
    (title, problem, triedCase, tag, navigation) => async (dispatch, _, {networkService}) => {
        console.log("title in actions: " + title)
        console.log("content in actions: " + problem)
        console.log("triedCase in actions: " + triedCase)
        console.log("tag in actions: " + tag)
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.addQuestion({title, problem,triedCase, tag});
            console.log("Data AddQuestion is: " + JSON.stringify(data));
            dispatch(getListQuestion(navigation));
        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
export const updateQuestion =
    (title, problem, triedCase, tag, questionId, navigation) => async (dispatch, _, {networkService}) => {
        console.log("title in actions: " + title)
        console.log("problem in actions: " + problem)
        console.log("triedCase in actions: " + triedCase)
        console.log("tag in actions: " + tag)
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.updateQuestion({title, problem, triedCase, tag, questionId});
            console.log("Data updateQuestion is: " + JSON.stringify(data));
            dispatch(getQuestionDetailByQuestionId(questionId,navigation, false));

        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
export const closeQuestion =
    (questionId, navigation) => async (dispatch, _, {networkService}) => {
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.closeQuestion({questionId});
            console.log("Data closeQuestion is: " + JSON.stringify(data));
            dispatch(getListQuestion(navigation));

        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
export const postComment =
    (content, questionId, navigation) => async (dispatch, _, {networkService}) => {
        console.log("content of comment: " + content)
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.postComment({content, questionId});
            console.log("Data postComment is: " + JSON.stringify(data));
            dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
        } catch ({data}) {

        }
    };
export const postAnswer =
    (content, questionId,navigation) => async (dispatch, _, {networkService}) => {
        console.log("content of answer: " + content)
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.postAnswer({content, questionId});
            console.log("Data postAnswer is: " + JSON.stringify(data));
            dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
export const postCommentToAnswer =
    (content, answerId,questionId, navigation) => async (dispatch, _, {networkService}) => {
        console.log("content of comment: " + content)
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.postCommentToAnswer({content, answerId});
            console.log("Data postCommentToAnswer is: " + JSON.stringify(data));
            dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
export const deleteComment =
    (commentId,questionId, navigation) => async (dispatch, _, {networkService}) => {
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.deleteComment({commentId});
            console.log("Data deleteComment is: " + JSON.stringify(data));
            dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
        } catch ({data}) {
            console.log("Error when delete comment: "+JSON.stringify(data))
        }
    };
export const deleteAnswer =
    (answerId,questionId, navigation) => async (dispatch, _, {networkService}) => {
        try {
            const forumController = new ForumController(networkService);
            const {data} = await forumController.deleteAnswer({answerId});
            console.log("Data deleteComment is: " + JSON.stringify(data));
            dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
        } catch ({data}) {
            dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
        }
    };
