import { WorkSpaceController } from "../controllers/WorkSpaceController";
import { NetworkService } from "../networking";
import { LaboratoryController } from "../controllers/LaboratoryController";
import AsyncStorage from "@react-native-community/async-storage";

export const getAllSprint =
  (projectId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const workSpaceController = new WorkSpaceController(networkService);
      const response = await workSpaceController.getAllSprint({ projectId });
      const laboratoryController = new LaboratoryController(networkService);
      const projectDetail = await laboratoryController.getProjectDetail({
        projectId,
      });
      const allMember = await laboratoryController.getAllMembersInWorkspace({
        projectId,
      });
      console.log("DATA BACKLOG: "+ JSON.stringify(response.data));
      await AsyncStorage.setItem("@memberIdProject", response.data.data.memberId);
      navigation.push("Backlog", {
        projectId: projectId,
        data: response.data.data,
        projectDetail: projectDetail.data.data,
        allMember: allMember.data.data,
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
            if (errorCode === 400) {
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
export const getTaskDetail = (taskId) => async () => {
  const networkService = new NetworkService();
  let errorCode = 200;
  try {
    const workSpaceController = new WorkSpaceController(networkService);
    const response = await workSpaceController.getTaskDetail({ taskId });
    return response.data;
  } catch ({ data }) {
    if (data) {
      if (data.status) {
        if (data.status.status) {
          errorCode = data.status.status;
          let displayMessage = data.status.message;
          if (displayMessage == null) {
            displayMessage = "Oops! Something went wrong.";
          }
          if (errorCode === 400) {
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
export const getSubTaskDetail = (subTaskId) => async () => {
  const networkService = new NetworkService();
  let errorCode = 200;
  try {
    const workSpaceController = new WorkSpaceController(networkService);
    const response = await workSpaceController.getSubTaskDetail({ subTaskId });
    return response.data;
  } catch ({ data }) {
    if (data) {
      if (data.status) {
        if (data.status.status) {
          errorCode = data.status.status;
          let displayMessage = data.status.message;
          if (displayMessage == null) {
            displayMessage = "Oops! Something went wrong.";
          }
          if (errorCode === 400) {
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
