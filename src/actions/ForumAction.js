import { strings } from "../localization";
import { ForumController } from "../controllers/ForumController";
import { TYPES } from "./UserAction";
import { useDispatch } from "react-redux";

const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});
export const getQuestionDetailByQuestionId =
  (questionId, navigation, isEdit) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      console.log("Questions ID in actions: " + questionId);
      const response = await forumController.getQuestionDetailByQuestionId({
        questionId,
      });
      if (isEdit) {
        navigation.push("UpdateQuestion", { data: response.data.data });
      } else {
        navigation.push("QuestionDetail", { data: response.data.data });
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
export const getListQuestion =
  (navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const response = await forumController.getListQuestion();
      if (response) {
        navigation.push("Forum", { data: response.data.data });
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
export const addQuestion =
  (title, problem, triedCase, tag, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const { data } = await forumController.addQuestion({
        title,
        problem,
        triedCase,
        tag,
      });
      dispatch(getListQuestion(navigation));
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
export const updateQuestion =
  (title, problem, triedCase, tag, questionId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const { data } = await forumController.updateQuestion({
        title,
        problem,
        triedCase,
        tag,
        questionId,
      });
      dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
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
export const closeQuestion =
  (questionId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const { data } = await forumController.closeQuestion({ questionId });
      dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
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
export const postComment =
  (content, questionId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const { data } = await forumController.postComment({
        content,
        questionId,
      });
      dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
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
export const postAnswer =
  (content, questionId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const { data } = await forumController.postAnswer({
        content,
        questionId,
      });
      dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
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
export const postCommentToAnswer =
  (content, answerId, questionId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const { data } = await forumController.postCommentToAnswer({
        content,
        answerId,
      });
      dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
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
export const deleteComment =
  (commentId, questionId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const { data } = await forumController.deleteComment({ commentId });
      dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
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
export const deleteAnswer =
  (answerId, questionId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const forumController = new ForumController(networkService);
      const { data } = await forumController.deleteAnswer({ answerId });
      dispatch(getQuestionDetailByQuestionId(questionId, navigation, false));
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
