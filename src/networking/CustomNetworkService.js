import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { getRequestDetailByApplicationId } from "../actions/LaboratoryAction";
import { routes } from "../controllers";
import {
  account,
  forum,
  laboratory,
  notification,
  repository,
  workspace,
} from "../controllers/ip";
import { getAllRequestInLabById } from "../actions/LaboratoryAction";
import { useDispatch } from "react-redux";

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@token");
    return token;
  } catch (e) {
    console.log("Can't getToken: " + e);
  }
};

const getAccountId = async () => {
  try {
    const accountId = await AsyncStorage.getItem("@accountId");
    console.log("AccountId: " + accountId);
    return accountId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};

// export const getDataUsingAsyncAwaitGetCall = async () => {
//   const token = await getToken();
//   try {
//     const response = await axios.get(
//       laboratory + "/flab/lab/public/api/v1/projects",
//       {
//         headers: {
//           Authorization: `Bearer ` + token,
//         },
//       }
//     );
//     console.log(
//       "Data in custom network service: " + JSON.stringify(response.data)
//     );
//     return response.data;
//   } catch (error) {
//     alert(error.message);
//   }
// };

export const createSprint = async (
  projectId,
  memberId,
  sprintName,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.workSpace.createSprint.replace(":workspace-id", projectId),
      {
        memberId: memberId,
        sprintName: sprintName,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return response.data;
  } catch (data) {
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

export const getAllMemberInLab = async () => {
  const token = await getToken();
  const labId = await getLabId();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.laboratory.getAllMemberInLab.replace(":lab-id", labId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return response.data;
  } catch (data) {
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

export const getAllMember = async () => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(routes.account.getAllMember, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
    return response.data;
  } catch (data) {
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

export const getAllCVOfAccount = async (navigation) => {
  const token = await getToken();
  const accountId = await getAccountId();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.account.getAllCVOfAccount.replace(":account-id", accountId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getAllCVOfAccount: " + JSON.stringify(response));
    return response.data;
  } catch (data) {
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
export const getListSprint = async (projectId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.getListSprint.replace(":workspace-id", projectId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getListSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getTaskDetail = async (taskId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.getTaskDetail.replace(":task-id", taskId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getTaskDetail: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getSubTaskDetail = async (subTaskId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.getSubTaskDetail.replace(":subtask-id", subTaskId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getSubTaskDetail: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const deleteSprint = async (projectId, sprintId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.workSpace.deleteSprint
        .replace(":workspace-id", projectId)
        .replace(":sprint-id", sprintId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const createTask = async (
  projectId,
  sprintId,
  memberId,
  taskName,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.workSpace.createTask
        .replace(":sprint-id", sprintId)
        .replace(":workspace-id", projectId),
      {
        memberId: memberId,
        taskName: taskName,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in createTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getListTask = async (sprintId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.getListTask.replace(":sprint-id", sprintId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getListTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const updateSprint = async (
  projectId,
  sprintId,
  memberId,
  sprintName,
  startDate,
  dueDate,
  goal,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.workSpace.updateSprint
        .replace(":sprint-id", sprintId)
        .replace(":workspace-id", projectId),
      {
        sprintName: sprintName,
        startDate: startDate,
        dueDate: dueDate,
        goal: goal,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in updateSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const updateStatusSprint = async (
  projectId,
  sprintId,
  memberId,
  status,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.workSpace.updateStatusSprint
        .replace(":sprint-id", sprintId)
        .replace(":workspace-id", projectId),
      {
        status: status,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in updateSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const getSprintDetail = async (sprintId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.getSprintDetail.replace(":sprint-id", sprintId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in createTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const deleteSubTask = async (subTaskId, taskId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.workSpace.deleteSubTask
        .replace(":subtask-id", subTaskId)
        .replace(":task-id", taskId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteSubTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const updateSubTask = async (
  projectId,
  subTaskId,
  memberId,
  subTaskName,
  status,
  description,
  assignee,
  label,
  estimate,
  reporter,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.workSpace.updateSubTask
        .replace(":subtask-id", subTaskId)
        .replace(":workspace-id", projectId),
      {
        subTaskName: subTaskName,
        status: status,
        description: description,
        assignee: assignee,
        label: label,
        estimate: estimate,
        reporter: reporter,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in updateSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const assignSubTask = async (
  projectId,
  subTaskId,
  memberId,
  assignee,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.workSpace.updateSubTask
        .replace(":subtask-id", subTaskId)
        .replace(":workspace-id", projectId),
      {
        assignee: assignee,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in assignneSubTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const createSubTask = async (
  projectId,
  taskId,
  memberId,
  subTaskName,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.workSpace.createSubTask
        .replace(":task-id", taskId)
        .replace(":workspace-id", projectId),
      {
        memberId: memberId,
        subTaskName: subTaskName,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in createSubTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const getListSubTask = async (taskId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.getListSubTask.replace(":task-id", taskId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getListSubTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
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
export const updateTask = async (
  projectId,
  taskId,
  memberId,
  taskName,
  status,
  description,
  assignee,
  label,
  estimate,
  reporter,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.workSpace.updateTask
        .replace(":task-id", taskId)
        .replace(":workspace-id", projectId),
      {
        taskName: taskName,
        status: status,
        description: description,
        assignee: assignee,
        label: label,
        estimate: estimate,
        reporter: reporter,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in updateTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const assignTask = async (
  projectId,
  taskId,
  memberId,
  assignee,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.workSpace.assignTask
        .replace(":task-id", taskId)
        .replace(":workspace-id", projectId),
      {
        assignee: assignee,
        memberId: memberId,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in assignneTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const deleteTask = async (sprintId, taskId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.workSpace.deleteTask
        .replace(":sprint-id", sprintId)
        .replace(":task-id", taskId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const deleteFolderInRepository = async (
  repoId,
  folderId,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.repository.deleteFolderInRepository
        .replace(":folder-id", folderId)
        .replace(":repository-id", repoId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteFolder: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
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
export const getListFolder = async (repoId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.repository.getListFolder.replace(":repository-id", repoId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getListFolder: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const deleteFolderOrFile = async (
  parentFolderId,
  Id,
  type,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  if (type === "Folder") {
    try {
      const response = await axios.delete(
        routes.repository.deleteFolder
          .replace(":folder-id", parentFolderId)
          .replace(":sub-folder-id", Id),
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      console.log(
        "Data in deleteFolderOrFile if folder: " + JSON.stringify(response.data)
      );
      return response.data;
    } catch (data) {
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
  } else {
    try {
      const response = await axios.delete(
        routes.repository.deleteFile
          .replace(":file-id", Id)
          .replace(":folder-id", parentFolderId),
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      console.log(
        "Data in deleteFolderOrFile if file: " + JSON.stringify(response.data)
      );
      return response.data;
    } catch (data) {
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
  }
};
export const getListFolderDetail = async (folderId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.repository.getListFolderDetail.replace(":folder-id", folderId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in getListFolderDetail: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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
export const deleteMaterial = async (labId, materialId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.laboratory.deleteMaterial
        .replace(":laboratory-id", labId)
        .replace(":material-id", materialId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteMaterial: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getListMaterial = async (labId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.laboratory.getListMaterial.replace(":laboratory-id", labId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getListMaterial: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const getQuestionDetail = async (
  questionId,
  typeScore,
  typeDate,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.forum.getQuestionDetailCustom.replace(":question-id", questionId),
      {
        headers: {
          Authorization: Bearer + token,
        },
        params: {
          "score-sort-by": typeScore,
          "created-date-sort-by": typeDate,
        },
      }
    );
    console.log("Data in getQuestionDetail: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const addAnswer = async (questionId, answer, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.forum.addAnswer.replace(":question-id", questionId),
      {
        content: answer,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in postAnswer: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const addCommentToQuestion = async (questionId, comment, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.forum.addCommentToQuestion.replace(":question-id", questionId),
      {
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in addCommentToQuestion: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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
export const addCommentToAnswer = async (answerId, comment, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.forum.addCommentToAnswer.replace(":answer-id", answerId),
      {
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in addCommentToAnswer: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
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
export const deleteAnswer = async (questionId, answerId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.forum.deleteAnswerCustom
        .replace(":answer-id", answerId)
        .replace(":question-id", questionId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteAnswer: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const deleteCommentInQuestion = async (
  questionId,
  commentId,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.forum.deleteCommentInQuestion
        .replace(":comment-id", commentId)
        .replace(":question-id", questionId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteComment: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const deleteCommentInAnswer = async (
  answerId,
  commentId,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.forum.deleteCommentInAnswer
        .replace(":comment-id", commentId)
        .replace(":answer-id", answerId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteComment: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const editComment = async (commentId, comment) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.forum.editComment.replace(":comment-id", commentId),
      {
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteComment: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const editAnswer = async (answerId, answer, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.forum.editAnswer.replace(":answer-id", answerId),
      {
        content: answer,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteComment: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const voteQuestion = async (questionId, status, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.forum.voteQuestion.replace(":question-id", questionId),
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in voteQuestion: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const updateNews = async (
  newsId,
  title,
  content,
  thumbnail,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.notification.updateNews.replace(":news-id", newsId),
      {
        title: title,
        content: content,
        thumbnail: thumbnail,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in updateNews: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getNewsDetail = async (newsId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.notification.getNewsDetail.replace(":news-id", newsId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getNewsDetail: " + JSON.stringify(response.data));
    navigation.push("NewsDetail", { data: response.data.data });
  } catch (data) {
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
export const getNewsDetailComment = async (newsId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.notification.getNewsDetail.replace(":news-id", newsId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in getNewsDetailComment: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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
export const deleteNews = async (newsId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.notification.deleteNews.replace(":news-id", newsId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in deleteNews: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getListNews = async (navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(routes.notification.getListNews, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
    console.log("Data in getListNews: " + JSON.stringify(response.data));
    navigation.push("ListNews", { data: response.data.data });
  } catch (data) {
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
export const commentToNews = async (newsId, content, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.notification.commentToNews.replace(":news-id", newsId),
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in commentToNews: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const commentToComment = async (commentId, content, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.notification.commentToComment.replace(":comment-id", commentId),
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in commentToComment: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const editCommentNews = async (commentId, content, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.notification.editCommentNews.replace(":comment-id", commentId),
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in editCommentNews: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const deleteCommentInNews = async (newsId, commentId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.notification.deleteCommentInNews
        .replace(":comment-id", commentId)
        .replace(":new-id", newsId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in deleteCommentInNews: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (error) {
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
export const deleteCommentInComment = async (
  commentId,
  subCommentId,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.notification.deleteCommentInComment
        .replace(":comment-id", commentId)
        .replace(":subcomment-id", subCommentId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in deleteCommentInComment: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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
export const getListOrderByLabId = async (labId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.laboratory.getListOrderByLabId.replace(":laboratory-id", labId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in getListOrderByLabId: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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
export const responseOrder = async (orderId, status, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      laboratory +
        "/flab/lab/public/api/v1/materials/:order-id".replace(
          ":order-id",
          orderId
        ),
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in responseOrder: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const reviewRequest = async (
  labId,
  applicationId,
  requestData,
  navigation,
  dispatch
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    console.log("request DATA:" + labId + applicationId);
    console.log("TOKENNNN: " + token);
    const response = await axios.post(
      routes.laboratory.reviewRequest
        .replace(":lab-id", labId)
        .replace(":application-id", applicationId),
      {
        status: requestData.status,
        comment: requestData.comment,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    dispatch(getAllRequestInLabById(labId, navigation));
  } catch (data) {
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

export const getLaboratoryByAccountId = async (accountId, page, size) => {
  const token = await getToken();
  return await axios.get(routes.laboratory.getLaboratory, {
    params: {
      "account-id": accountId,
      page: page,
      size: size,
    },

    headers: {
      Authorization: `Bearer ` + token,
    },
  });
};

export const getLaboratorySuggestionByAccountId = async (
  accountId,
  page,
  size
) => {
  const token = await getToken();
  return await axios.get(routes.laboratory.getLaboratorySuggestion, {
    params: {
      "account-id": accountId,
      page: page,
      size: size,
    },

    headers: {
      Authorization: `Bearer ` + token,
    },
  });
};
export const getLaboratoryWaitingByAccountId = async (
    accountId,
    page,
    size
) => {
  const token = await getToken();
  return await axios.get(routes.laboratory.getLaboratoryWaiting, {
    params: {
      "account-id": accountId,
      page: page,
      size: size,
    },

    headers: {
      Authorization: `Bearer ` + token,
    },
  });
};
export const getAllMemberByLabId = async (page, size) => {
  const token = await getToken();
  const labId = await getLabId();
  return await axios.get(
    routes.laboratory.getAllMemberInLaboratory.replace(":lab-id", labId),
    {
      params: {
        page: page,
        size: size,
      },
      headers: {
        Authorization: `Bearer ` + token,
      },
    }
  );
};

export const getAllRequestInLab = async (page, size) => {
  const token = await getToken();
  const labId = await getLabId();
  return await axios.get(
    routes.laboratory.getAllRequest.replace(":lab-id", labId),
    {
      params: {
        page: page,
        size: size,
      },
      headers: {
        Authorization: `Bearer ` + token,
      },
    }
  );
};
export const uploadProfileCv = async (
  profileId,
  navigation,
  cvName,
  description,
  cv
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.account.uploadProfileCv.replace(":profile-id", profileId),
      {
        cvName: cvName,
        description: description,
        cv: cv,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in uploadCv: " + JSON.stringify(response.data));
    navigation.push("CurriculumVitae");
  } catch (data) {
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

export const getCVbyAccountId = async (accountId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.account.getCVbyAccountId.replace(":account-id", accountId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getCVbyAccountId: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const deleteCVbyAccountId = async (profileId, cvId) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.account.deleteCVbyAccountId
        .replace(":cv-id", cvId)
        .replace(":profile-id", profileId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in deleteCVbyAccountId: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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

export const updateProfileCv = async (
  cvId,
  navigation,
  cvName,
  description,
  cv
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.account.updateProfileCv.replace(":cv-id", cvId),
      {
        cvName: cvName,
        description: description,
        cv: cv,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in updateProfileCv: " + JSON.stringify(response.data));
    navigation.push("CurriculumVitae");
  } catch (data) {
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
export const changeAvatar = async (profileId, image, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.account.changeAvatar.replace(":profile-id", profileId),
      {
        avatar: image,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in changeAvatar: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getProfileDetail = async (profileId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.account.getProfileDetail.replace(":profile-id", profileId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getProfileDetail: " + JSON.stringify(response.data));
    await AsyncStorage.setItem("@avatar", response.data.data.avatar);
    return response.data;
  } catch (data) {
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
export const getAllMemberInProject = async () => {
  const token = await getToken();
  const projectId = await getProjectId();
  try {
    const response = await axios.get(
      routes.laboratory.getAllMemberInProject.replace(":project-id", projectId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in getAllMemberInProject: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (error) {
    console.log("error when getAllMemberInProject:" + JSON.stringify(error));
  }
};

export const getListOrderByAccountId = async (labId, accountId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.laboratory.getListOrderByAccountId
        .replace(":laboratory-id", labId)
        .replace(":account-id", accountId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in getListOrderByAccountId: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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

export const returnOrder = async (orderId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.laboratory.returnOrder.replace(":order-id", orderId),
      {},
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in returnOrder: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const getAllTag = async (tagName, page, size, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(routes.forum.getAllTag, {
      headers: {
        Authorization: `Bearer ` + token,
      },
      params: {
        "tag-name": tagName,
        "created-date-sort-by": "DESC",
        page: page,
        size: size,
      },
    });
    console.log("Data in getAllTag: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const addTag = async (tagName, ownerBy, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.post(
      routes.forum.addTag,
      {
        tagName: tagName,
        ownerBy: ownerBy,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in addTag: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const updateTag = async (tagId, tagName, ownerBy, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.forum.updateTag.replace(":tag-id", tagId),
      {
        tagName: tagName,
        ownerBy: ownerBy,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in addTag: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const deleteTag = async (tagId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.delete(
      routes.forum.deleteTag.replace(":tag-id", tagId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in addTag: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const getAccountAdmin = async (navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(routes.account.getAccountTag, {
      headers: {
        Authorization: `Bearer ` + token,
      },
      params: {
        role: "ADMIN",
      },
    });
    console.log("Data in addTag: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const getAllUser = async (inputSearchData) => {
  const token = await getToken();
  try {
    const response = await axios.get(routes.laboratory.searchUser, {
      headers: {
        Authorization: `Bearer ` + token,
      },
      params: {
        username: inputSearchData,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error when addTag:" + JSON.stringify(error));
  }
};
export const getListMyQuestion = async (
  accountId,
  title,
  page,
  size,
  navigation
) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(routes.forum.getListQuestion, {
      headers: {
        Authorization: `Bearer ` + token,
      },
      params: {
        "created-by": accountId,
        title: title,
        "created-date-sort-by": "DESC",
        page: page,
        size: size,
      },
    });
    console.log("Data in getListMyQuestion: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getListQuestion = async (title, page, size, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(routes.forum.getListQuestion, {
      headers: {
        Authorization: `Bearer ` + token,
      },
      params: {
        title: title,
        "created-date-sort-by": "DESC",
        page: page,
        size: size,
      },
    });
    console.log("Data in getListQuestion: " + JSON.stringify(response.data));
    return response;
  } catch (data) {
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
export const voteAnswer = async (answerId, status, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.forum.voteAnswer.replace(":answer-id", answerId),
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in voteQuestion: " + JSON.stringify(response.data));
    return response;
  } catch (data) {
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
export const getAnswerDetail = async (answerId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.forum.getAnswerDetail.replace(":answer-id", answerId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getAnswerDetail: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const acceptAnswer = async (questionId, answerId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.put(
      routes.forum.acceptAnswer
        .replace(":answer-id", answerId)
        .replace(":question-id", questionId),
      {},
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in acceptAnswer: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const getNumberNotifyOfAccountId = async (accountId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
      routes.notification.getNumberOfNotificationByAccountId.replace(
        ":account-id",
        accountId
      ),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(
      "error when getNumberNotifyOfAccountId:" + JSON.stringify(error)
    );
  }
};

export const getMemberNotInLab = async (
  labId,
  username,
  page,
  size,
  navigation
) => {
  console.log("Call get member not in lab: " + labId);
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.laboratory.getMemberNotInLab.replace(":lab-id", labId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
        params: {
          username: username,
          page: page,
          size: size,
        },
      }
    );
    console.log(
      "Data when get member not in lab: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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

export const getMemberInLabNotInProject = async (
  projectId,
  page,
  size,
  navigation
) => {
  const token = await getToken();
  const labId = await getLabId();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.laboratory.getMemberInLabNotInProject
        .replace(":lab-id", labId)
        .replace(":project-id", projectId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
        params: {
          page: page,
          size: size,
        },
      }
    );
    console.log(
      "Data when get member in lab not in project: " +
        JSON.stringify(response.data)
    );
    return response.data;
  } catch (data) {
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
export const getListAllNews = async (title, page, size, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(routes.notification.getListNews, {
      headers: {
        Authorization: `Bearer ` + token,
      },
      params: {
        title: title,
        "created-date-sort-by": "DESC",
        page: page,
        size: size,
      },
    });
    console.log("Data in getListAllNews: " + JSON.stringify(response.data));
    return response;
  } catch (data) {
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
export const getIssueStatistics = async (workspaceId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.issueStatistics.replace(":workspace-id", workspaceId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getIssueStatistics: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getAssignedToMe = async (workspaceId, memberId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.assignedToMe
        .replace(":workspace-id", workspaceId)
        .replace(":member-id", memberId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getAssignedToMe: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getActivityStreams = async (workspaceId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.workSpace.activityStreams.replace(":workspace-id", workspaceId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getActivityStreams: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
export const getNotification = async (accountId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
        routes.notification.getNotification.replace(":account-id", accountId),
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
    );
    console.log("Data in getNotification: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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

export const getNumberOfApplication = async (labId, navigation) => {
  const token = await getToken();
  let errorCode = 200;
  try {
    const response = await axios.get(
      routes.laboratory.getNumberOfApplication.replace(":lab-id", labId),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("getNumberOfApplication: " + JSON.stringify(response.data));
    return response.data;
  } catch (data) {
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
