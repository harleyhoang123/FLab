import { strings } from "../localization";
import { RepositoryController } from "../controllers/RepositoryController";

export const getFolderByRepositoryId =
  (repoId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const repositoryController = new RepositoryController(networkService);
      console.log("getFolderByRepositoryId in actions: " + repoId);
      const { data } = await repositoryController.getFolderByRepositoryId({
        repoId,
      });
      console.log("Mate data in act:" + JSON.stringify(data.data));
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
      dispatch(getAllRepository(navigation));
    } catch ({ data }) {
      console.log("ERROR when createFolderInRepo: " + JSON.stringify(data));
    }
  };

export const createSubFolderInRepo =
  (folderName, parentFolderId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const repositoryController = new RepositoryController(networkService);
      console.log(
        "Request data of createSubFolderInRepo actions: " +
          JSON.stringify(requestData)
      );
      console.log("folderId:" + parentFolderId);
      const response = await repositoryController.createSubFolder({
        parentFolderId,
        requestData,
      });
      console.log(
        "Response from createFolderInRepo: " + JSON.stringify(response)
      );
      console.log("Data: " + JSON.stringify(response.data.data));
      dispatch(getFolderDetailId(parentFolderId, folderName, navigation));
    } catch ({ data }) {
      console.log("ERROR when createSubFolderInRepo: " + JSON.stringify(data));
    }
  };

export const getFolderDetailId =
  (folderId, name, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const repositoryController = new RepositoryController(networkService);
      console.log("getFolderDetailId in actions: " + folderId);
      const { data } = await repositoryController.getFolderDetail({
        folderId,
      });
      console.log("Mate data in act:" + JSON.stringify(data.data));
      navigation.navigate("RepositoryDetail", {
        data: data.data,
        folderName: name,
        parentFolderId: folderId,
      });
    } catch ({ data }) {
      console.log("Error ggetFolderDetailId:" + JSON.stringify(data));
    }
  };
