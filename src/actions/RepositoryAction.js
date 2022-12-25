import { strings } from "../localization";
import { RepositoryController } from "../controllers/RepositoryController";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";

export const getFolderByRepositoryId =
  (repoId, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const repositoryController = new RepositoryController(networkService);
      console.log("getFolderByRepositoryId in actions: " + repoId);
      const { data } = await repositoryController.getFolderByRepositoryId({
        repoId,
      });
      if (data) {
        navigation.push("Repository", { data: data.data });
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

export const createFolderInRepo =
  (repositoryId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const repositoryController = new RepositoryController(networkService);
      const response = await repositoryController.createFolderInRepo({
        repositoryId,
        requestData,
      });
      if (response) {
        dispatch(getFolderByRepositoryId(repositoryId, navigation));
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
export const downLoadFileByFileId =
  (fileId) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      await Linking.openURL(
        "http://192.168.31.197:8082/flab/repository/public/api/v1/files/" +
          fileId
      );
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

export const createSubFolderInRepo =
  (folderName, parentFolderId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const repositoryController = new RepositoryController(networkService);
      const response = await repositoryController.createSubFolder({
        parentFolderId,
        requestData,
      });
      if (response) {
        dispatch(getFolderDetailId(parentFolderId, folderName, navigation));
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

export const getFolderDetailId =
  (folderId, name, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const repositoryController = new RepositoryController(networkService);
      const { data } = await repositoryController.getFolderDetail({
        folderId,
      });
      if (data) {
        navigation.push("RepositoryDetail", {
          data: data.data,
          folderName: name,
          parentFolderId: folderId,
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
export const addFileToFolder =
  (parentFolderId, name, fileName, description, file, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const repositoryController = new RepositoryController(networkService);
      const { data } = await repositoryController.addFileToFolder({
        fileName,
        parentFolderId,
        description,
        file,
      });
      if (data) {
        dispatch(getFolderDetailId(parentFolderId, name, navigation));
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
export const updateFolderInRepo =
  (repositoryId, folderId, folderName, description, navigation) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const repositoryController = new RepositoryController(networkService);
      const response = await repositoryController.updateFolder({
        folderId,
        folderName,
        description,
      });
      if (response) {
        dispatch(getFolderByRepositoryId(repositoryId, navigation));
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
export const updateSubFolder =
  (
    parentFolderName,
    parentFolderId,
    folderId,
    folderName,
    description,
    navigation
  ) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const repositoryController = new RepositoryController(networkService);
      const response = await repositoryController.updateFolder({
        folderId,
        folderName,
        description,
      });
      if (response) {
        dispatch(
          getFolderDetailId(parentFolderId, parentFolderName, navigation)
        );
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
export const updateFileInFolder =
  (
    parentFolderName,
    parentFolderId,
    fileId,
    fileName,
    description,
    navigation
  ) =>
  async (dispatch, _, { networkService }) => {
    let errorCode = 200;
    try {
      const repositoryController = new RepositoryController(networkService);
      const response = await repositoryController.updateFile({
        fileId,
        fileName,
        description,
      });
      if (response) {
        dispatch(
          getFolderDetailId(parentFolderId, parentFolderName, navigation)
        );
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
