import { LaboratoryController } from "../controllers/LaboratoryController";
import { strings } from "../localization";

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
      dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
    }
  };

export const getLaboratoryById =
  (labId, isJoined, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const laboratoryController = new LaboratoryController(networkService);
      console.log("Lab ID in actions: " + labId);
      const response = await laboratoryController.getLaboratoryById({
        labId,
      });
      navigation.navigate("LabDetail", {
        data: response.data.data,
        isJoined: isJoined,
      });
    } catch ({ data }) {
      dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
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
      dispatch(loginError(data?.error ?? strings.login.invalidCredentials));
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

export const removeMemberFromLaboratory =
  (labId, memberId) =>
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
