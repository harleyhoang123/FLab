import { LaboratoryController } from "../controllers/LaboratoryController";
import { strings } from "../localization";
import AsyncStorage from "@react-native-community/async-storage";

// export const getLaboratoryByAccountId =
//   (accountId, navigation) =>
//   async (dispatch, _, { networkService }) => {
//     try {
//       const laboratoryController = new LaboratoryController(networkService);
//       console.log("Account ID in actions: " + accountId);
//       const response = await laboratoryController.getLaboratoryByAccountId({
//         accountId,
//         page,
//         size,
//       });
//       navigation.navigate("Lab", { data: response.data.data });
//     } catch ({ data }) {
//       console.log(
//         "Error when getLaboratoryByAccountId " + JSON.stringify(data)
//       );
//     }
//   };

export const getLaboratoryById =
  (labId, isJoined, navigation) =>
  async (dispatch, _, { networkService }) => {
    await AsyncStorage.setItem("@currentLabId", labId);
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Lab ID in actions: " + labId);
      await AsyncStorage.setItem("@labId", labId);
      const response = await laboratoryController.getLaboratoryById({
        labId,
      });
      if (response.data.data.memberInfo) {
        await AsyncStorage.setItem(
          "@currentMemberId",
          response.data.data.memberInfo.memberId
        );
      }
      const listMember = await laboratoryController.getAllMemberInLaboratory({
        labId,
      });
      navigation.push("LabDetail", {
        data: response.data.data,
        isJoined: isJoined,
        allMember: listMember.data.data,
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

export const getAllMemberInLaboratoryById =
  (labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Lab ID in actions: " + labId);
      const response = await laboratoryController.getAllMemberInLaboratory({
        labId,
      });
      navigation.push("ViewAllMember", {
        data: response.data.data,
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

export const getAllProjectByLabId =
  (labId, memberId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      console.log("MemberID" + memberId);
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.getProjectByLabId({
        labId,
        memberId,
      });
      navigation.push("Project", {
        data: response.data.data,
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

export const getAllMemberInProject =
  (projectId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Project ID in actions: " + projectId);
      const response = await laboratoryController.getAllMembersInProject({
        projectId,
      });
      console.log("Response" + JSON.stringify(response));
      navigation.push("ViewAllMemberInProject", {
        data: response.data.data,
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

export const getProjectById =
  (projectId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("projectId ID in actions: " + projectId);
      const response = await laboratoryController.getProjectDetail({
        projectId,
      });
      await AsyncStorage.setItem("@projectId", response.data.data.projectId);
      navigation.navigate("ProjectDetail", {
        data: response.data.data,
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

export const getListMaterialByLabId =
  (labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.getListMaterialByLabId({
        labId,
      });
      navigation.push("ListMaterial", {
        data: response.data.data,
        labId: labId,
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

export const createLaboratory =
  (requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.createLaboratory({
        requestData,
      });
      dispatch(getLaboratoryById(response.data.data.labId, true, navigation));
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

export const createProjectInLab =
  (labId, memberId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log(
        "Request data of createLaboratory actions: " +
          JSON.stringify(requestData)
      );
      const response = await laboratoryController.createProjectInLab({
        labId,
        requestData,
      });
      dispatch(getAllProjectByLabId(labId, memberId, navigation));
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

export const removeMemberFromLaboratory =
  (labId, memberId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.removeMemberFromLaboratory({
        labId,
        memberId,
      });
      console.log(
        "Response remove member from laboratory: " + JSON.stringify(response)
      );
      dispatch(getAllMemberInLaboratoryById(labId, navigation));
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

export const deleteLaboratory =
  (accountId, labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.deleteLaboratory({ labId });
      if (response) {
        navigation.push("Lab", { data: accountId });
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

export const removeMemberInProjectById =
  (projectId, memberId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.removeMemberInProject({
        projectId,
        memberId,
      });
      if (response) {
        dispatch(getAllMemberInProject(projectId, navigation));
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

export const removeProject =
  (labId, projectId, currentMemberId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.removeProject({
        labId,
        projectId,
      });
      if (response) {
        dispatch(getAllProjectByLabId(labId, currentMemberId, navigation));
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

export const updateLaboratoryByLabId =
  (labId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.updateLaboratory({
        labId,
        requestData,
      });
      if (response) {
        dispatch(getLaboratoryById(labId, true, navigation));
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

export const updateProjectByProjectId =
  (labId, projectId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.updateProject({
        labId,
        projectId,
        requestData,
      });
      if (response) {
        dispatch(getProjectById(projectId, navigation));
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

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId in reate Project: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

export const updateMemberRoleById =
  (memberId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const labId = await getLabId();
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.updateMemberRole({
        memberId,
        requestData,
      });
      if (response) {
        dispatch(getAllMemberInLaboratoryById(labId, navigation));
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

const getProjectId = async () => {
  try {
    const projectId = await AsyncStorage.getItem("@projectId");
    console.log("projectId: " + projectId);
    return projectId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};

export const updateMemberRoleinProjectById =
  (memberId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    const projectId = await getProjectId();
    try {
      const labId = await getLabId();
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.updateMemberRole({
        memberId,
        requestData,
      });
      if (response) {
        dispatch(getAllMemberInProject(projectId, navigation));
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

export const addMembersToProject =
  (projectId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.addMembersToProject({
        projectId,
        requestData,
      });
      if (response) {
        dispatch(getAllMemberInProject(projectId, navigation));
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

export const addMembersToLab =
  (requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const labId = await getLabId();
      console.log(" Lab Id in addMembersToLab:" + labId);
      const labController = new LaboratoryController(networkService);
      const response = await labController.addMembersToLab({
        labId,
        requestData,
      });
      if (response) {
        dispatch(getAllMemberInLaboratoryById(labId, navigation));
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

export const getMembersToLab =
  () =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const labController = new LaboratoryController(networkService);
      const response = await labController.getAllUser(inputSearchData);
      return response;
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

export const getmemberDetailByProfileId =
  (accountId, code, labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      console.log("ProfileId: " + accountId);
      const laboratoryController = new LaboratoryController(networkService);
      console.log("projectId ID in actions: " + accountId);
      const response = await laboratoryController.getMemberDetail({
        accountId,
      });
      if (response) {
        navigation.push("MemberDetail", {
          data: response.data.data,
          labId: labId,
          memberId: code,
        });
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

export const getmemberDetailProjectByProfileId =
  (accountId, code, labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.getMemberDetail({
        accountId,
      });
      if (response) {
        navigation.push("MemberDetailProject", {
          data: response.data.data,
          labId: labId,
          memberId: code,
        });
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

export const applyTolAbByLabId =
  (labId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("labId in actions: " + labId);
      const response = await laboratoryController.applyToLab({
        labId,
        requestData,
      });
      if (response) {
        dispatch(getLaboratoryById(labId, false, navigation));
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

export const getAllRequestInLabById =
  (labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Lab ID in actions: " + labId);
      const response = await laboratoryController.getAllRequest({
        labId,
      });
      if (response) {
        navigation.push("ViewAllRequest", {
          data: response.data.data,
        });
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

export const getRequestDetailByApplicationId =
  (applicationId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("application ID in actions: " + applicationId);
      const response = await laboratoryController.getRequestDetail({
        applicationId,
      });
      if (response) {
        navigation.navigate("RequestDetail", {
          data: response.data.data,
        });
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
export const getMaterialById =
  (materialId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const { data } = await laboratoryController.getMaterialById({
        materialId,
      });
      navigation.navigate("MaterialDetail", { data: data.data });
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

export const updateMaterialByMaterialId =
  (
    labId,
    materialId,
    materialName,
    status,
    amount,
    description,
    note,
    image,
    navigation
  ) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.updateMaterial({
        labId,
        materialId,
        materialName,
        status,
        amount,
        description,
        note,
        image,
      });
      if (response) {
        dispatch(getMaterialById(materialId, navigation));
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

export const addMaterial =
  (labId, materialName, description, amount, note, images, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.addMaterial({
        labId,
        materialName,
        description,
        amount,
        note,
        images,
      });
      if (response) {
        dispatch(getListMaterialByLabId(labId, navigation));
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
export const orderMaterial =
  (labId, materialId, amount, reason, orderFrom, orderTo, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.orderMaterial({
        labId,
        materialId,
        amount,
        reason,
        orderFrom,
        orderTo,
      });
      if (response) {
        dispatch(getListMaterialByLabId(labId, navigation));
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

export const leaveLaboratory =
  (labId, memberId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.removeMemberFromLaboratory({
        labId,
        memberId,
      });
      navigation.push("Lab");
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

// export const reviewRequest =
//   (labId, applicationId, requestData, navigation) =>
//   async (dispatch, _, { networkService }) => {
//     try {
//       const laboratoryController = new LaboratoryController(networkService);
//       console.log("labId in actions: " + labId);
//       const response = await laboratoryController.reviewRequestInLab({
//         labId,
//         applicationId,
//         requestData,
//       });
//       dispatch(getRequestDetailByApplicationId(applicationId, navigation));
//     } catch ({ data }) {
//       console.log("ERROR when reviewRequest: " + JSON.stringify(data));
//     }
//   };
