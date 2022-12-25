import { NewsController } from "../controllers/NewsController";

export const getNewsDetailByNewsId =
  (newsId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const newsController = new NewsController(networkService);
      const response = await newsController.getNewsDetailByNewsId({ newsId });
      if (response) {
        navigation.push("NewsDetail", { data: response.data.data });
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
export const getListNews =
  (navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const newsController = new NewsController(networkService);
      const response = await newsController.getListNews();
      if (response) {
        navigation.push("ListNews", { data: response.data.data });
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
export const createNews =
  (title, content, thumbnail, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const newsController = new NewsController(networkService);
      const { data } = await newsController.createNews({
        title,
        content,
        thumbnail,
      });
      navigation.push("ListNews");
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
