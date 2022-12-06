import { strings } from "../localization";
import { RepositoryController } from "../controllers/RepositoryController";

export const getFolderByRepositoryId =
  (repoId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const repositoryController = new RepositoryController(networkService);
      console.log("Material Id ID in actions: " + repoId);
      const { data } = await repositoryController.getFolderByRepositoryId({
        repoId,
      });
      console.log("Mate data in act:" + JSON.stringify(data.data));
      navigation.navigate("RepositoryDetail", { data: data.data });
    } catch ({ data }) {
      console.log("Error get folder by id:" + JSON.stringify(data));
    }
  };

export const getAllRepository =
  (navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const repositoryController = new RepositoryController(networkService);
      const { data } = await repositoryController.getAllRepository();
      console.log("Repo data in act:" + JSON.stringify(data.data));
      navigation.navigate("Repository", { data: data.data });
    } catch ({ data }) {
      console.log("Error get folder by id:" + JSON.stringify(data));
    }
  };

export const createFolderInRepo =
  (repositoryId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const repositoryController = new RepositoryController(networkService);
      console.log(
        "Request data of createFolderInRepo actions: " +
          JSON.stringify(requestData)
      );
      const response = await repositoryController.createFolderInRepo({
        repositoryId,
        requestData,
      });
      console.log(
        "Response from createFolderInRepo: " + JSON.stringify(response)
      );
      console.log("Data: " + JSON.stringify(response.data.data));
      console.log("Lab Id: " + JSON.stringify(response.data.data.labId));
      dispatch(getAllProjectByLabId(labId, navigation));
    } catch ({ data }) {
      console.log("ERROR when createFolderInRepo: " + JSON.stringify(data));
    }
  };
