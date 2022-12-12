import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
const host= "http://192.168.31.197:"
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@token");
    console.log("token: " + token);
    return token;
  } catch (e) {
    console.log("Can't get avatar: " + e);
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

export const getDataUsingAsyncAwaitGetCall = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(
        host+"8083/flab/lab/public/api/v1/projects",
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log(
      "Data in custom network service: " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

export const createSprint = async (projectId, memberId, sprintName) => {
  const token = await getToken();
  try {
    const response = await axios.post(
        host+"8085/flab/workspace/public/api/v1/sprints/:workspace-id/sprint".replace(
        ":workspace-id",
        projectId
      ),
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
    console.log("Data in createSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("error when create sprint:" + JSON.stringify(error));
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
  console.log("Lab id service :" + labId);
  try {
    const response = await axios.get(
        host+"8083/flab/lab/public/api/v1/laboratories/:lab-id/members".replace(
        ":lab-id",
        labId
      ),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in createSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("error when create sprint:" + JSON.stringify(error));
  }
};

export const getAllMember = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(
        host+"8080/flab/authentication/public/api/v1/accounts",
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in createSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("error when create sprint:" + JSON.stringify(error));
  }
};

export const getAllCVOfAccount = async () => {
  const token = await getToken();
  const accountId = await getAccountId();
  console.log("getAllCVOfAccount: ");
  try {
    const response = await axios.get(
        host+"8084/flab/account/public/api/v1/profiles/:account-id/cv".replace(
        ":account-id",
        accountId
      ),
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    console.log("Data in getAllCVOfAccount: " + JSON.stringify(response));
    return response.data;
  } catch (error) {
    console.log("error when getAllCVOfAccount:" + JSON.stringify(error));
  }
};
export const getListSprint = async (projectId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
        host+'8085/flab/workspace/public/api/v1/sprints/:workspace-id/sprints'.replace(":workspace-id", projectId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in getListSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const getTaskDetail = async (taskId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
        host+'8085/flab/workspace/public/api/v1/tasks/:task-id'.replace(":task-id", taskId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in getTaskDetail: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const getSubTaskDetail = async (subTaskId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
        host+'8085/flab/workspace/public/api/v1/subtasks/:subtask-id'.replace(":subtask-id", subTaskId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in getSubTaskDetail: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const deleteSprint = async (projectId, sprintId) => {
  const token = await getToken();
  try {
    const response = await axios.delete(
        host+'8085/flab/workspace/public/api/v1/sprints/:workspace-id/sprints/:sprint-id'.replace(":workspace-id", projectId)
            .replace(":sprint-id", sprintId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in deleteSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

export const createTask = async (projectId,sprintId, memberId, taskName) => {
  const token = await getToken();
  try {
    const response = await axios.post(
        host+'8085/flab/workspace/public/api/v1/tasks/:workspace-id/:sprint-id/task'.replace(":sprint-id", sprintId)
            .replace(":workspace-id", projectId),
        {
          memberId: memberId,
          taskName: taskName,
        }
        ,
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in createTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const getListTask = async (sprintId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
        host+'8085/flab/workspace/public/api/v1/sprints/:sprint-id'.replace(":sprint-id", sprintId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in createTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const updateSprint = async (projectId, sprintId, sprintName, startDate, dueDate, goal) => {
  const token = await getToken();
  try {
    const response = await axios.put(
        host+'8085/flab/workspace/public/api/v1/sprints/:workspace-id/:sprint-id'.replace(":sprint-id", sprintId)
            .replace(":workspace-id", projectId),
        {
          sprintName: sprintName,
          startDate: startDate,
          dueDate: dueDate,
          goal: goal
        }
        ,
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in updateSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("ERROR when updateSprint: " + JSON.stringify(error));
  }
};

export const getSprintDetail = async (sprintId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
        host+'8085/flab/workspace/public/api/v1/sprints/:sprint-id'.replace(":sprint-id", sprintId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in createTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const deleteSubTask = async (subTaskId, taskId) => {
  const token = await getToken();
  try {
    const response = await axios.delete(
        host+'8085/flab/workspace/public/api/v1/subtasks/:task-id/subtasks/:subtask-id'.replace(":subtask-id", subTaskId).replace(':task-id', taskId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in deleteSubTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("error when deleteSubTask:" + JSON.stringify(error));
  }
};
export const updateSubTask = async (projectId, subTaskId, subTaskName, status, description, assignee, label, estimate, reporter) => {

  const token = await getToken();
  try {
    const response = await axios.put(
        host+'8085/flab/workspace/public/api/v1/subtasks/:workspace-id/:subtask-id'.replace(":subtask-id", subTaskId)
            .replace(":workspace-id", projectId),
        {
          subTaskName: subTaskName,
          status: status,
          description: description,
          assignee: assignee,
          label: label,
          estimate: estimate,
          reporter: reporter
        }
        ,
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in updateSprint: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("ERROR when updateSprint: " + JSON.stringify(error));
  }
};
export const assignneSubTask = async (projectId, subTaskId,assignee) => {
  const token = await getToken();
  try {
    const response = await axios.put(
        host+'8085/flab/workspace/public/api/v1/subtasks/:workspace-id/:subtask-id'.replace(":subtask-id", subTaskId)
            .replace(":workspace-id", projectId),
        {
          assignee: assignee,
        }
        ,
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in assignneSubTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("ERROR when assignneSubTask: " + JSON.stringify(error));
  }
};
export const createSubTask = async (projectId, taskId, memberId, subTaskName) => {
  const token = await getToken();
  try {
    const response = await axios.post(
        host+'8085/flab/workspace/public/api/v1/subtasks/:workspace-id/:task-id/subtask'.replace(":task-id", taskId)
            .replace(":workspace-id", projectId),
        {
          memberId: memberId,
          subTaskName: subTaskName,
        }
        ,
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in createSubTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("error when createSubTask:" + JSON.stringify(error));
  }
};

export const getListSubTask = async (taskId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
        host+'8085/flab/workspace/public/api/v1/tasks/:task-id'.replace(":task-id", taskId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in getListSubTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};
export const updateTask = async (projectId, taskId, taskName, status, description, assignee, label, estimate, reporter) => {
  const token = await getToken();
  try {
    const response = await axios.put(
        host+'8085/flab/workspace/public/api/v1/tasks/:workspace-id/:task-id'.replace(":task-id", taskId)
            .replace(":workspace-id", projectId),
        {
          taskName: taskName,
          status: status,
          description: description,
          assignee: assignee,
          label: label,
          estimate: estimate,
          reporter: reporter
        }
        ,
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in updateTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("ERROR when updateTask: " + JSON.stringify(error));
  }
};
export const assignneTask = async (projectId, taskId,assignee) => {
  const token = await getToken();
  try {
    const response = await axios.put(
        host+'8085/flab/workspace/public/api/v1/tasks/:workspace-id/:task-id'.replace(":task-id", taskId)
            .replace(":workspace-id", projectId),
        {
          assignee: assignee,
        }
        ,
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in assignneTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("ERROR when assignneTask: " + JSON.stringify(error));
  }
};
export const deleteTask = async (sprintId, taskId) => {
  const token = await getToken();
  try {
    const response = await axios.delete(
        host+'8085/flab/workspace/public/api/v1/tasks/:sprint-id/tasks/:task-id'.replace(":sprint-id", sprintId)
            .replace(":task-id", taskId),
        {
          headers: {
            "Authorization": `Bearer ` + token
          }
        }
    );
    console.log("Data in deleteTask: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("error when deleteTask:" + JSON.stringify(error));
  }
};

export const deleteFolder = async (folderId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            host+'8082/flab/repository/public/api/v1/folders/:folder-id'.replace(":folder-id", folderId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteFolder: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteFolder:" + JSON.stringify(error));
    }
};
export const getListFolder= async (repoId) => {
    const token = await getToken();
    try {
        const response = await axios.get(
            host+'8082/flab/repository/public/api/v1/folders/:repository-id/folders'.replace(":repository-id", repoId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in getListFolder: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when getListFolder:" + JSON.stringify(error));
    }
};

export const deleteFolderOrFile = async (folderId,Id, type) => {
    const token = await getToken();
    if(type==="Folder"){
        try {
            const response = await axios.delete(
                host+'8082/flab/repository/public/api/v1/folders/:folder-id'.replace(":folder-id", Id),
                {
                    headers: {
                        "Authorization": `Bearer ` + token
                    }
                }
            );
            console.log("Data in deleteFolderOrFile if folder: " + JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.log("error when deleteFolderOrFile if folder:" + JSON.stringify(error));
        }
    }else {
        try {
            const response = await axios.delete(
                host+'8082/flab/repository/public/api/v1/files/:folder-id/:file-id'.replace(":file-id", Id).replace(":folder-id", folderId),
                {
                    headers: {
                        "Authorization": `Bearer ` + token
                    }
                }
            );
            console.log("Data in deleteFolderOrFile if file: " + JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.log("error when deleteFolderOrFile if file:" + JSON.stringify(error));
        }
    }

};
export const getListFolderDetail= async (folderId) => {
    const token = await getToken();
    try {
        const response = await axios.get(
            host+'8082/flab/repository/public/api/v1/folders/:folder-id'.replace(":folder-id", folderId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in getListFolderDetail: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when getListFolderDetail:" + JSON.stringify(error));
    }
};
export const deleteMaterial = async (labId, materialId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            host+'8083/flab/lab/public/api/v1/laboratories/:laboratory-id/materials/:material-id'.replace(":laboratory-id", labId)
                .replace(":material-id", materialId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteMaterial: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteMaterial:" + JSON.stringify(error));
    }
};
export const getListMaterial= async (labId) => {
    const token = await getToken();
    try {
        const response = await axios.get(
            host+'8083/flab/lab/public/api/v1/materials/:laboratory-id/materials'.replace(":laboratory-id", labId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in getListMaterial: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when getListMaterial:" + JSON.stringify(error));
    }
};

export const getQuestionDetail= async (questionId) => {
    const token = await getToken();
    try {
        const response = await axios.get(
            host+'8081/flab/forum/public/api/v1/questions/:question-id'.replace(":question-id", questionId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in getQuestionDetail: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when getQuestionDetail:" + JSON.stringify(error));
    }
};

export const addAnswer = async (questionId, answer) => {
    const token = await getToken();
    try {
        const response = await axios.post(
            host+'8081/flab/forum/public/api/v1/questions/:question-id/answer'.replace(":question-id", questionId),
            {
                content: answer
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in postAnswer: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when postAnswer:" + JSON.stringify(error));
    }
};
export const addCommentToQuestion = async (questionId, comment) => {
    const token = await getToken();
    try {
        const response = await axios.post(
            host+'8081/flab/forum/public/api/v1/questions/:question-id/comment'.replace(":question-id", questionId),
            {
                content: comment
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in addCommentToQuestion: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when addCommentToQuestion:" + JSON.stringify(error));
    }
};
export const addCommentToAnswer = async (answerId, comment) => {
    const token = await getToken();
    try {
        const response = await axios.post(
            host+'8081/flab/forum/public/api/v1/answers/:answer-id'.replace(":answer-id", answerId),
            {
                content: comment
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in addCommentToAnswer: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when addCommentToAnswer:" + JSON.stringify(error));
    }
};
export const deleteAnswer = async (questionId,answerId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            host+'8081/flab/forum/public/api/v1/questions/:question-id/:answer-id'.replace(":answer-id", answerId).
            replace(":question-id", questionId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteAnswer: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteAnswer:" + JSON.stringify(error));
    }
};
export const deleteCommentInQuestion = async (questionId, commentId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            host+'8081/flab/forum/public/api/v1/comments/:question-id/:comment-id'.replace(":comment-id", commentId)
                .replace(":question-id", questionId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteComment: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteComment:" + JSON.stringify(error));
    }
};
export const deleteCommentInAnswer = async (answerId, commentId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            host+'8081/flab/forum/public/api/v1/answers/:answer-id/:comment-id'.replace(":comment-id", commentId)
                .replace(":answer-id", answerId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteComment: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteComment:" + JSON.stringify(error));
    }
};
export const editComment = async (commentId, comment) => {
    const token = await getToken();
    try {
        const response = await axios.put(
            host+'8081/flab/forum/public/api/v1/comments/:comment-id'.replace(":comment-id", commentId),
            {
                content: comment
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteComment: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteComment:" + JSON.stringify(error));
    }
};
export const editAnswer = async (answerId, answer) => {
    const token = await getToken();
    try {
        const response = await axios.put(
            host+'8081/flab/forum/public/api/v1/answers/:answer-id'.replace(":answer-id", answerId),
            {
                content: answer
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteComment: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteComment:" + JSON.stringify(error));
    }
};
export const voteQuestion = async (questionId) => {
    const token = await getToken();
    try {
        const response = await axios.post(
            host+'8081/flab/forum/public/api/v1/questions/:question-id/vote'.replace(":question-id", questionId),
            {
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in voteQuestion: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when voteQuestion:" + JSON.stringify(error));
    }
};
export const updateNews = async (newsId,title,content,thumbnail) => {
    const token = await getToken();
    try {
        const response = await axios.put(
            host+'8888/flab/notification/public/api/v1/news/:news-id'.replace(":news-id", newsId),
            {
                title:title,
                content:content,
                thumbnail:thumbnail
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in updateNews: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when updateNews:" + JSON.stringify(error));
    }
};
export const getNewsDetail = async (newsId,navigation) => {
    const token = await getToken();
    try {
        const response = await axios.get(
            host+'8888/flab/notification/public/api/v1/news/:news-id'.replace(":news-id", newsId)
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in getNewsDetail: " + JSON.stringify(response.data));
        navigation.push("NewsDetail", {data: response.data.data});
    } catch (error) {
        console.log("error when getNewsDetail:" + JSON.stringify(error));
    }
};
export const getNewsDetailComment = async (newsId) => {
    const token = await getToken();
    try {
        const response = await axios.get(
            host+'8888/flab/notification/public/api/v1/news/:news-id'.replace(":news-id", newsId)
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in getNewsDetailComment: " + JSON.stringify(response.data));
        return response.data
    } catch (error) {
        console.log("error when getNewsDetailComment:" + JSON.stringify(error));
    }
};
export const deleteNews = async (newsId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            host+'8888/flab/notification/public/api/v1/news/:news-id'.replace(":news-id", newsId)
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteNews: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteNews:" + JSON.stringify(error));
    }
};
export const getListNews = async (navigation) => {
    const token = await getToken();
    try {
        const response = await axios.get(
            host+'8888/flab/notification/public/api/v1/news'
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in getListNews: " + JSON.stringify(response.data));
        navigation.push("ListNews", {data: response.data.data});
    } catch (error) {
        console.log("error when getListNews:" + JSON.stringify(error));
    }
};
export const commentToNews = async (newsId, content) => {
    const token = await getToken();
    try {
        const response = await axios.post(
            host+'8888/flab/notification/public/api/v1/news/:news-id/comment'.replace(":news-id", newsId),
            {
                content:content
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in commentToNews: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when commentToNews:" + JSON.stringify(error));
    }
};
export const commentToComment = async (commentId, content) => {
    const token = await getToken();
    try {
        const response = await axios.post(
            host+'8888/flab/notification/public/api/v1/comments/:comment-id/comment'.replace(":comment-id", commentId),
            {
                content:content
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in commentToComment: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when commentToComment:" + JSON.stringify(error));
    }
};
export const editCommentNews = async (commentId, content) => {
    const token = await getToken();
    try {
        const response = await axios.put(
            host+'8888/flab/notification/public/api/v1/comments/:comment-id'.replace(":comment-id", commentId),
            {
                content: content
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in editCommentNews: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when editCommentNews:" + JSON.stringify(error));
    }
};
export const deleteCommentInNews = async (newsId, commentId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            host+'8888/flab/notification/public/api/v1/news/:new-id/:comment-id'.replace(":comment-id", commentId)
                .replace(":new-id", newsId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteCommentInNews: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteCommentInNews:" + JSON.stringify(error));
    }
};
export const deleteCommentInComment= async ( commentId, subCommentId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            host+'8888/flab/notification/public/api/v1/comments/:comment-id/:subcomment-id'.replace(":comment-id", commentId)
                .replace(":subcomment-id", subCommentId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in deleteCommentInComment: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when deleteCommentInComment:" + JSON.stringify(error));
    }
};
export const getListOrderByLabId= async (labId) => {
    const token = await getToken();
    try {
        const response = await axios.get(
            host+'8083/flab/lab/public/api/v1/materials/:laboratory-id/orders'.replace(":laboratory-id", labId),
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in getListOrderByLabId: " + JSON.stringify(response.data));
        return response.data
    } catch (error) {
        console.log("error when getListOrderByLabId:" + JSON.stringify(error));
    }
};
export const responseOrder= async (orderId,status) => {
    const token = await getToken();
    try {
        const response = await axios.put(
            host+'8083/flab/lab/public/api/v1/materials/:order-id'.replace(":order-id", orderId),
            {
                status:status
            },
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in responseOrder: " + JSON.stringify(response.data));
        return response.data
    } catch (error) {
        console.log("error when responseOrder:" + JSON.stringify(error));
    }
};