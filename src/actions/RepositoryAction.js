import { strings } from "../localization";
import { RepositoryController } from "../controllers/RepositoryController";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";

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
      navigation.push("Repository", { data: data.data });
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
      dispatch(getFolderByRepositoryId(repositoryId ,navigation));
    } catch ({ data }) {
      console.log("ERROR when createFolderInRepo: " + JSON.stringify(data));
    }
  };
export const downLoadFileByFileId =
  (fileId) =>
  async (dispatch, _, { networkService }) => {
    try {
      // const repositoryController = new RepositoryController(networkService);
      // console.log("downLoadFileByFileId in actions: " + fileId);
      // await repositoryController.downLoadFile({
      //   fileId,
      // });
      await Linking.openURL(
        "http://192.168.31.197:8082/flab/repository/public/api/v1/files/" +
          fileId
      );
    } catch ({ data }) {
      console.log("Error downLoadFileByFileId Fail");
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
      console.log("Data in getFolderDetailId:" + JSON.stringify(data.data));
      navigation.push("RepositoryDetail", {
        data: data.data,
        folderName: name,
        parentFolderId: folderId,
      });
    } catch ({ data }) {
      console.log("Error getFolderDetailId:" + JSON.stringify(data));
    }
  };
export const addFileToFolder =
    (parentFolderId,name, description, file, navigation) =>
        async (dispatch, _, { networkService }) => {
            try {
                const repositoryController = new RepositoryController(networkService);
                console.log("addFileToFolder in actions: " + parentFolderId);
                console.log("name in actions: " + name);
                console.log("description in actions: " + description);
                console.log("file in actions: " + file);
                const { data } = await repositoryController.addFileToFolder({
                    parentFolderId,description,file
                });
                console.log("Data in addFileToFolder"+ JSON.stringify(data))
                dispatch(getFolderDetailId(parentFolderId, name,navigation))
            } catch ({ data }) {
                console.log("Error addFileToFolder:" + JSON.stringify(data));
            }
        };
