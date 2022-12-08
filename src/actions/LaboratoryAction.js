import { LaboratoryController } from "../controllers/LaboratoryController";
import { strings } from "../localization";
import AsyncStorage from "@react-native-community/async-storage";
import { ProjectController } from "../controllers/ProjectController";

export const getLaboratoryByAccountId =
  (accountId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Account ID in actions: " + accountId);
      const response = await laboratoryController.getLaboratoryByAccountId({
        accountId,
      });
      navigation.navigate("Lab", { data: response.data.data });
    } catch ({ data }) {
      console.log(
        "Error when getLaboratoryByAccountId " + JSON.stringify(data)
      );
    }
  };

export const getLaboratoryById =
  (labId, isJoined, navigation) =>
  async (dispatch, _, { networkService }) => {
    await AsyncStorage.setItem("@currentLabId", labId);
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Lab ID in actions: " + labId);
      await AsyncStorage.setItem("@labId", labId);
      const response = await laboratoryController.getLaboratoryById({
        labId,
      });
      const listMember = await laboratoryController.getAllMemberInLaboratory({
        labId,
      });
      navigation.navigate("LabDetail", {
        data: response.data.data,
        isJoined: isJoined,
        allMember: listMember.data.data,
      });
    } catch ({ data }) {
      console.log("Error when getLaboratoryById " + JSON.stringify(data));
    }
  };

export const getAllMemberInLaboratoryById =
  (labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Lab ID in actions: " + labId);
      const response = await laboratoryController.getAllMemberInLaboratory({
        labId,
      });
      navigation.navigate("ViewAllMember", {
        data: response.data.data,
      });
    } catch ({ data }) {
      console.log(
        "Error when get all member in Project " + JSON.stringify(data)
      );
    }
  };

export const getAllProjectByLabId =
  (labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Lab ID in actions: " + labId);
      const response = await laboratoryController.getProjectByLabId({
        labId,
      });
      console.log(
        "Dat when get Project by lab id:" + JSON.stringify(response.data.data)
      );
      navigation.push("Project", {
        data: response.data.data,
      });
    } catch ({ data }) {
      console.log("Error when getAllProjectByLabId " + JSON.stringify(data));
    }
  };

export const getAllMemberInProject =
  (projectId, navigation) =>
  async (dispatch, _, { networkService }) => {
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
      console.log(
        "Error when get all member in Project " + JSON.stringify(data)
      );
    }
  };

export const getProjectById =
  (projectId, navigation) =>
  async (dispatch, _, { networkService }) => {
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
      console.log("ERROR when getProjectById: " + JSON.stringify(data));
    }
  };

export const getListMaterialByLabId =
  (labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Lab ID in actions: " + labId);
      const response = await laboratoryController.getListMaterialByLabId({
        labId,
      });
      console.log(
        "Response from get list material by id: " + JSON.stringify(response)
      );
      console.log(
        "Data when get list material by id: " +
          JSON.stringify(response.data.data)
      );
      navigation.push("ListMaterial", {
        data: response.data.data,
      });
    } catch ({ data }) {
      console.log("ERROR when getListMaterialByLabId: " + JSON.stringify(data));
    }
  };

export const createLaboratory =
  (requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log(
        "Request data of createLaboratory actions: " +
          JSON.stringify(requestData)
      );
      const response = await laboratoryController.createLaboratory({
        requestData,
      });
      console.log(
        "Response from get list material by id: " + JSON.stringify(response)
      );
      console.log("Data: " + JSON.stringify(response.data.data));
      console.log("Lab Id: " + JSON.stringify(response.data.data.labId));
      dispatch(getLaboratoryById(response.data.data.labId, true, navigation));
    } catch ({ data }) {
      console.log("ERROR when createLaboratory: " + JSON.stringify(data));
    }
  };

export const createProjectInLab =
  (labId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
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
      console.log(
        "Response from get list material by id: " + JSON.stringify(response)
      );
      console.log("Data: " + JSON.stringify(response.data.data));
      console.log("Lab Id: " + JSON.stringify(response.data.data.labId));
      dispatch(getAllProjectByLabId(labId, navigation));
    } catch ({ data }) {
      console.log("ERROR when createLaboratory: " + JSON.stringify(data));
    }
  };

export const removeMemberFromLaboratory =
  (labId, memberId, navigation) =>
  async (dispatch, _, { networkService }) => {
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
      console.log(
        "ERROR when removeMemberFromLaboratory: " + JSON.stringify(data)
      );
    }
  };

export const deleteLaboratory =
  (accountId, labId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.deleteLaboratory({ labId });
      console.log(
        "Response remove member from laboratory: " + JSON.stringify(response)
      );
      dispatch(getLaboratoryByAccountId(accountId, navigation));
    } catch ({ data }) {
      console.log(
        "ERROR when removeMemberFromLaboratory: " + JSON.stringify(data)
      );
    }
  };

export const removeMemberInProjectById =
  (projectId, memberId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.removeMemberInProject({
        projectId,
        memberId,
      });
      console.log(
        "Response remove member from laboratory: " + JSON.stringify(response)
      );
      dispatch(getAllMemberInProject(projectId, navigation));
    } catch ({ data }) {
      console.log(
        "ERROR when removeMemberFromLaboratory: " + JSON.stringify(data)
      );
    }
  };

export const removeProject =
  (labId, projectId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.removeProject({
        labId,
        projectId,
      });
      console.log(
        "Response remove member from laboratory: " + JSON.stringify(response)
      );
      dispatch(getAllProjectByLabId(labId, navigation));
    } catch ({ data }) {
      console.log(
        "ERROR when removeMemberFromLaboratory: " + JSON.stringify(data)
      );
    }
  };

export const updateLaboratoryByLabId =
  (labId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.updateLaboratory({
        labId,
        requestData,
      });
      console.log("updateLaboratoryByLabId: " + JSON.stringify(response));
      dispatch(getLaboratoryById(labId, true, navigation));
    } catch ({ data }) {
      console.log(
        "ERROR when updateLaboratoryByLabId: " + JSON.stringify(data)
      );
    }
  };

export const updateProjectByProjectId =
  (labId, projectId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.updateProject({
        labId,
        projectId,
        requestData,
      });
      console.log("updateLaboratoryByLabId: " + JSON.stringify(response));
      dispatch(getProjectById(projectId, navigation));
    } catch ({ data }) {
      console.log(
        "ERROR when updateLaboratoryByLabId: " + JSON.stringify(data)
      );
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
    try {
      const labId = await getLabId();
      const laboratoryController = new LaboratoryController(networkService);
      const response = await laboratoryController.updateMemberRole({
        memberId,
        requestData,
      });
      console.log("updateMemberRoleById: " + JSON.stringify(response));
      dispatch(getAllMemberInLaboratoryById(labId, navigation));
    } catch ({ data }) {
      console.log("ERROR when updateMemberRoleById: " + JSON.stringify(data));
    }
  };

export const addMembersToProject =
  (projectId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const projectController = new ProjectController(networkService);
      const response = await projectController.addMembersToProject({
        projectId,
        requestData,
      });
      console.log("updateLaboratoryByLabId: " + JSON.stringify(response));
      dispatch(getAllMemberInProject(projectId, navigation));
    } catch ({ data }) {
      console.log(
        "ERROR when updateLaboratoryByLabId: " + JSON.stringify(data)
      );
    }
  };

export const addMembersToLab =
  (labId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      console.log(" Lab Id in addMembersToLab:" + labId);
      const labController = new LaboratoryController(networkService);
      const response = await labController.addMembersToLab({
        labId,
        requestData,
      });
      console.log("addMembersToLab: " + JSON.stringify(response));
      dispatch(getAllMemberInLaboratoryById(labId, navigation));
    } catch ({ data }) {
      console.log("ERROR when addMembersToLab: " + JSON.stringify(data));
    }
  };

export const getmemberDetailByProfileId =
  (accountId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      console.log("ProfileId: " + accountId);
      const laboratoryController = new LaboratoryController(networkService);
      console.log("projectId ID in actions: " + accountId);
      const response = await laboratoryController.getMemberDetail({
        accountId,
      });
      navigation.navigate("MemberDetail", {
        data: response.data.data,
      });
    } catch ({ data }) {
      console.log(
        "ERROR when getmemberDetailByProfileId: " + JSON.stringify(data)
      );
    }
  };

export const applyTolAbByLabId =
  (labId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("labId in actions: " + labId);
      const response = await laboratoryController.applyToLab({
        labId,
        requestData,
      });
      dispatch(getLaboratoryById(labId, true, navigation));
    } catch ({ data }) {
      console.log(
        "ERROR when getmemberDetailByProfileId: " + JSON.stringify(data)
      );
    }
  };
