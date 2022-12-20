import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import Buttons from "./Buttons";
import {deleteTask, getTaskDetail} from "../networking/CustomNetworkService";



function TaskComponent({
                           taskId,
                           sprintId,
                           taskName,
                           estimate,
                           status,
                           assignee,
                           callBackGetListTask,
                           callbackTaskDetail,
                           callbackDeleteTask,
                           update
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
    useEffect(() => {
        callUpdate()
    }, [update]);
    const callUpdate =()=>{
        getTaskDetail(taskId).then(v=>{
            setTaskDetail(v.data.taskName);
            setEstimateDetail(v.data.estimate);
            setStatusDetail(v.data.status);
            setAssigneeDetail(v.data.assignee);
        })
    }

    const getImage = (user) => {
        if (user == null) {
            return (
                <Image source={require("../assets/avatarDefault.png")} style={styles.userImage} />
            )
        } else {
            return (
                <Image style={styles.userImage}
                       source={{
                           uri: user.userInfo.avatar,
                       }}/>
            )
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
                            {getImage(assigneeDetail)}
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
