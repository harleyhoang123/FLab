import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import Buttons from "./Buttons";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from "@react-native-picker/picker";

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("@token");
        console.log("token: " + token);
        return token;
    } catch (e) {
        console.log("Can't get avatar: " + e);
    }
};
export const deleteTask = async (sprintId, taskId) => {
    const token = await getToken();
    try {
        const response = await axios.delete(
            'http://192.168.31.197:8085/flab/workspace/public/api/v1/tasks/:sprint-id/tasks/:task-id'.replace(":sprint-id", sprintId)
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

function TaskComponent({
                           taskId,
                           sprintId,
                           taskName,
                           estimate,
                           status,
                           assignee,
                           callBackGetListTask,
                           callbackTaskDetail,
                           callbackDeleteTask
                       }) {
    const [taskNameDetail, setTaskDetail] = useState(taskName);
    const [estimateDetail, setEstimateDetail] = useState(estimate);
    const [statusDetail, setStatusDetail] = useState(status);
    const [assigneeDetail, setAssigneeDetail] = useState(assignee);
    const deleteATask = (sprintId, taskId) => {
        deleteTask(sprintId, taskId).then(() => {
            callBackGetListTask();
            callbackDeleteTask(taskId)
        });

    }
    const getImage = (assignee) => {
        if (assignee == null) {
            return "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png";
        } else {
            return assignee.userInfo.avatar;
        }
    }
    const getStatus=(status)=>{
        if(status === "TO_DO"){return "To do"}
        if(status === "IN_PROGRESS"){return "In progress"}
        if(status === "DONE"){return "Done"}
    }
    return (
        <View style={styles.containerContent}>
            <View style={styles.sprint}>
                <TouchableOpacity onPress={() => callbackTaskDetail(taskId)}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{taskNameDetail}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.view1,{width: 20}]}>
                                <Text style={styles.text1}>{estimateDetail}</Text>
                            </View >
                            <View style={styles.view1}>
                                <Text style={styles.text}>
                                    {getStatus(statusDetail)}
                                </Text>
                            </View >
                            <Image
                                style={styles.userImage}
                                source={{
                                    uri: getImage(assigneeDetail),
                                }}
                            />
                            <Buttons text={"X"} onPressTo={() => (deleteATask(sprintId, taskId))}
                                     style={styles.btn}></Buttons>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        justifyContent: "space-between",
        flexDirection: "row",
    },
    containerContent: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: 'white',
        alignItems: "center",
        borderWidth: 1,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
    },
    sprint: {
        flex: 10,
        justifyContent: "center",
        margin: 2
    },
    btn: {
        margin: 5,
        width: 20,
        height: 20,
    },
    text: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
        marginLeft: 10
    },
    view1: {
        margin: 5,
        borderRadius: 5,
        backgroundColor: "#DFE1E6",
        justifyContent: "center",
        alignItems: "center",
    },
    text1: {
        color: "black",
    },
    picker: {
        width: 100,
        height: 30,
        borderRadius: 8,
    },
});
export default TaskComponent;
