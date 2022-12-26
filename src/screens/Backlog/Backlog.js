import React, {useRef} from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import SprintComponent from "../../components/SprintComponent";
import TaskDetailComponent from "../../components/TaskDetailComponent";
import {useState} from "react";
import SubTaskDetailComponent from "../../components/SubTaskDetailComponent";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import Buttons from "../../components/Buttons";
import TextField from "../../components/TextField";

import {
    createSprint,
    getListSprint,
    getSubTaskDetail,
    getTaskDetail,
} from "../../networking/CustomNetworkService";
import AsyncStorage from "@react-native-community/async-storage";

const getRoleInProject = async () => {
    try {
        const role = await AsyncStorage.getItem("@roleInProject");
        console.log("role: " + role);
        return role;
    } catch (e) {
        console.log("Can't get role: " + e);
    }
};
export default function Backlog({route, navigation}) {
    const res = route.params.data;
    const projectId = route.params.projectId;
    const projectDetail = route.params.projectDetail;
    const allMember = route.params.allMember;
    const [listSPrint, setListSPrint] = useState(res.sprints.items);
    const [listMember, setListMember] = useState(allMember.items);
    const [sprintName, setSprintName] = useState("");
    const [taskIdChange, setTaskIdChange] = useState(null);
    const [sprintIdChange, setSprintIdChange] = useState(null);
    const [subTaskId, setSubTaskId] = useState(null);
    const [taskDetail, setTaskDetail] = useState();
    const [subTaskDetail, setSubTaskDetail] = useState();
    const [isTextField, setIsTextField] = useState(false);
    const [update, setUpdate] = useState(0);
    const [role, setRole] = useState("");
    getRoleInProject().then((v) => setRole(v));
    console.log("ROLEINPROJECT " + role);
    const changeType = () => {
        setIsTextField(!isTextField);
    };

    let isValidSprint = true;
    const [isSprint, setIsSprint] = useState(false);

    function validateComment() {
        if (!sprintName) {
            setIsSprint(true);
            isValidSprint = false;
        } else {
            setIsSprint(false);
        }
        if (isValidSprint) {
            addSprint(projectId, res.memberId, sprintName);
            setIsSprint(false);
        }
    }

    const addSprint = (projectId, memberId, sprintName) => {
        createSprint(projectId, memberId, sprintName, navigation).then((v) =>
            getListSprint(projectId, navigation).then((v) =>
                setListSPrint(v.data.sprints.items)
            ).catch(error => {})
        ).catch(error => {});
        changeType();
        setSprintName("");
    };
    const callBackGetListSprint = () => {
        getListSprint(projectId, navigation).then((v) =>
            setListSPrint(v.data.sprints.items)
        ).catch(error => {});
    };
    const callBackUpdate = () => {
        setUpdate(update + 1);
    };
    const renderItem = (list) => {
        return (
            <View>
                {list?.map((item) => (
                    <View style={styles.backlogContent} key={item.sprintId}>
                        <SprintComponent
                            navigation={navigation}
                            key={item.sprintId}
                            projectId={projectId}
                            memberId={res.memberId}
                            sprintId={item.sprintId}
                            sprintName={item.sprintName}
                            goal={item.goal}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            tasks={item.tasks}
                            update={update}
                            totalNotStartedTask={item.totalNotStartedTask}
                            totalInProgressTask={item.totalInProgressTask}
                            totalDoneTask={item.totalDoneTask}
                            status={item.status}
                            callBackGetListSprint={callBackGetListSprint}
                            callbackTaskDetail={callbackTaskDetail}
                            callbackDeleteTask={callbackDeleteTask}
                            callbackDeleteSprint={callbackDeleteSprint}
                            callbackSetSprintId={callbackSetSprintId}
                            role={role}
                        />
                    </View>
                ))}
            </View>
        );
    };
    const renderTextField = () => {
        return isTextField ? (
            <View>
                <View style={styles.row}>
                    <TextField
                        onSubmitEditing={() => validateComment()}
                        text={sprintName}
                        onChangeText={(sprintName) => setSprintName(sprintName)}
                        style={{width: "100%", height: 40}}
                    />
                    <Buttons
                        text={"Cancel"}
                        onPressTo={changeType}
                        style={{width: 70, height: 40}}
                    />
                </View>
                {isSprint && (
                    <Text style={styles.inputInvalid}>Invalid Sprint's name</Text>
                )}
            </View>
        ) : (
            <Buttons
                text={"+ Create Sprint"}
                style={styles.buttonCreate}
                onPressTo={() => changeType()}
                styleText={{color: "#4C5C76"}}
            />
        );


    };
    const callbackTaskDetail = (taskId) => {
        if (taskIdChange == null) {
            setTaskIdChange(taskId);
        } else if (taskId !== taskIdChange) {
            setTaskDetail(null);
            setTaskIdChange(taskId);
        }
        if (taskId != null) {
            getTaskDetail(taskId, navigation).then((value) => {
                setTaskDetail(value.data);
                setSubTaskDetail(null);
            }).catch(error => {});
        } else {
            setTaskDetail(null);
        }
    };

    const callbackSetSprintId = (sprintId) => {
        setSprintIdChange(sprintId);
    };
    const callbackDeleteSprint = (sprintIdDelete) => {
        if (sprintIdChange === sprintIdDelete) {
            setTaskDetail(null);
            setSubTaskDetail(null);
        }
    };
    const callbackDeleteTask = (taskIdDelete) => {
        if (taskIdChange === taskIdDelete) {
            setTaskDetail(null);
            setSubTaskDetail(null);
        }
    };
    const callbackSubTaskDetail = (subtaskId) => {
        setSubTaskId(subtaskId);
        if (subtaskId != null) {
            getSubTaskDetail(subtaskId, navigation).then((value) => {
                setSubTaskDetail(value.data);
                setTaskDetail(null);
            }).catch(error => {});
        } else {
            setSubTaskDetail(null);
        }
    };
    console.log("detail task: " + JSON.stringify(taskDetail));
    return (
        <View>
            <ProjectNavigator navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.left}>
                    <View style={styles.projectTitle}>
                        <Text style={styles.projectName}>{projectDetail.projectName}</Text>
                        <Text style={styles.major}>{projectDetail.description}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.backlog}>BackLog</Text>
                        <Buttons
                            text={"View Dashboard"}
                            style={{height: 40}}
                            onPressTo={() => navigation.push("IssueStatistics")}
                        />
                    </View>

                    {renderItem(listSPrint)}
                    {role !== "MEMBER" && <View>{renderTextField()}</View>}
                </View>
                <View style={styles.taskDetail}>
                    {taskDetail != null && (
                        <TaskDetailComponent
                            taskDetail={taskDetail}
                            memberId={res.memberId}
                            listMember={listMember}
                            projectId={projectId}
                            callbackTaskDetail={callbackTaskDetail}
                            callbackSubTaskDetail={callbackSubTaskDetail}
                            callBackUpdateTask={callBackUpdate}
                        />
                    )}
                    {subTaskDetail != null && (
                        <SubTaskDetailComponent
                            navigation={navigation}
                            subTaskDetail={subTaskDetail}
                            taskId={taskIdChange}
                            listMember={listMember}
                            projectId={projectId}
                            memberId={res.memberId}
                            callbackSubTaskDetail={callbackSubTaskDetail}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        marginLeft: 14,
    },
    inputInvalid: {
        marginLeft: 15,
        color: "red",
    },
    taskDetail: {
        width: "28%",
        margin: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    description: {
        fontSize: 16,
    },
    sprint: {
        width: "100%",
        padding: 5,
        flexDirection: "row",
    },
    taskPosition: {
        width: "100%",
        padding: 5,
        flexDirection: "row",
        paddingLeft: "15%",
    },
    completed: {
        fontSize: 14,
        color: "red",
        width: 50,
    },
    tag: {
        borderRadius: 5,
        backgroundColor: "yellow",
        marginLeft: 10,
    },
    task: {
        fontSize: 14,
    },
    sprintArea: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "baseline",
        backgroundColor: "green",
    },
    taskArea: {
        width: "80%",
        flexDirection: "row",
        backgroundColor: "#F4F5F7",
    },
    timeTxt: {
        fontSize: 16,
        paddingTop: 4,
    },
    sprTxt: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    container: {
        display: "flex",
        flexDirection: "row",
    },
    left: {
        width: "15%",
        height: "100vh",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#DEE2E6",
    },
    right: {
        width: "55%",
        height: "100%",
        backgroundColor: "white",
    },
    listItem: {
        width: "80%",
        flexDirection: "row",
        borderRadius: 7,
        borderWidth: 1,
        marginBottom: 10,
    },
    major: {
        fontSize: 12,
        paddingBottom: 8,
    },
    tinyLogo: {
        width: 50,
        height: 50,
        paddingBottom: 8,
    },
    backlog: {
        color: "#42526E",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        width: "100%",
    },
    backlogContent: {
        margin: 20,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#F4F5F7",
        justifyContent: "flex-start",
        padding: 5,
    },
    projectName: {
        color: "#42526E",
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 24,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
    },
    projectTitle: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonCreate: {
        width: "93%",
        alignItems: "flex-start",
        backgroundColor: "#F4F5F7",
        margin: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginRight: 20,
    },
    picker: {
        width: 100,
        height: 40,
        borderRadius: 8,
    },
});
