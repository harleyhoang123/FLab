import React, {useState} from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Buttons from "./Buttons";
import TaskComponent from "./TaskComponent";
import TextField from "./TextField";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import {DateTimePicker} from "@hashiprobr/react-native-paper-datetimepicker";
import {createTask, deleteSprint, getListTask, getSprintDetail, updateSprint} from "../networking/CustomNetworkService";



function SprintComponent({
                             projectId,
                             sprintId,
                             memberId,
                             sprintName,
                             goal,
                             startDate,
                             endDate,
                             tasks,
                             totalNotStartedTask,
                             totalInProgressTask,
                             totalDoneTask,
                             callBackGetListSprint,
                             callbackTaskDetail,
                             callbackDeleteTask
                         }) {
    const [notStartTask, setNotStartTask] = useState(totalNotStartedTask);
    const [inProgressTask, setInProgressTask] = useState(totalInProgressTask);
    const [doneTask, setDoneTask] = useState(totalDoneTask);
    const [isTextField, setIsTextField] = useState(false);
    const [visible, setVisible] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [listTask, setListTask] = useState(tasks);
    const [modalVisible, setModalVisible] = useState(false);
    const [sprintNameDetail, setSprintNameDetail] = useState(sprintName);
    const [startDateDetail, setStartDateDetail] = useState(startDate);
    const [endDateDetail, setEndDateDetail] = useState(endDate);
    const [goalDetail, setGoalDetail] = useState(goal);
    const [sprintNameUpdate, setSprintNameUpdate] = useState(sprintNameDetail);
    const [startDateUpdate, setStartDateUpdate] = useState(new Date());
    const [endDateUpdate, setEndDateUpdate] = useState(new Date());
    const [goalUpdate, setGoalUpdate] = useState(goalDetail);
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short'
        });
    }
    const formatDateUpdate = (date) => {
        const formattedDate = new Date(date);
        let d = formattedDate.getDate();
        if (d < 10) {
            d = "0" + d;
        }
        let m = formattedDate.getMonth();
        if (m < 10) {
            m = "0" + m;
        }
        return formattedDate.getFullYear() + "-" + m + "-" + d + "T00:00:01"
    }

    const callBackGetListTask = () => {
        getListTask(sprintId).then(r => {
            setListTask(r.data.tasks); setNotStartTask(r.data.totalNotStartedTask)
            setInProgressTask(r.data.totalInProgressTask);
            setDoneTask(r.data.totalDoneTask)
        })
    }

    const deleteASprint = (projectId, sprintId) => {
        deleteSprint(projectId, sprintId).then(() => callBackGetListSprint());
    }
    const changeType = () => {
        setIsTextField(!isTextField);
    };
    const addTask = (sprintId, memberId, taskName) => {
        createTask(projectId,sprintId, memberId, taskName).then(() => getListTask(sprintId).then(r => {
            setListTask(r.data.tasks);
            setNotStartTask(r.data.totalNotStartedTask)
            setInProgressTask(r.data.totalInProgressTask);
            setDoneTask(r.data.totalDoneTask)
        }));
        changeType()
        setTaskName('')
    }
    const updateASprint = (sprintId, sprintName, startDate, dueDate, goal) => {
        const startDateUp = formatDateUpdate(startDate);
        const dueDateUp = formatDateUpdate(dueDate);
        updateSprint(projectId,sprintId, sprintName, startDateUp, dueDateUp, goal).then(r => getSprintDetail(sprintId).then(r => {
            console.log("Data getSprintDetail : " + JSON.stringify(r.data));
            setSprintNameDetail(r.data.sprintName);
            setStartDateDetail(formatDate(r.data.startDate));
            setEndDateDetail(formatDate(r.data.dueDate));
            setGoalDetail(r.data.goal)
        }))
    }
    const renderTextField = () => {
        return isTextField ? (
            <View style={[styles.row, {alignItems: "center"}]}>
                <TextField onSubmitEditing={() => addTask(sprintId, memberId, taskName)}
                           style={{width: "100%", height: 40}} text={taskName}
                           onChangeText={taskName => setTaskName(taskName)}/>
                <Buttons text={"Cancel"} onPressTo={changeType} style={{width: 70, height: 40}}/>
            </View>
        ) : (
            <Buttons text={"+ Create issue"}
                     style={{width: "100%", alignItems: "flex-start", backgroundColor: '#F4F5F7'}}
                     onPressTo={changeType} styleText={{color: "#4C5C76"}}/>
        );
    };
    const renderDropdown = (isTextField) => {
        if (visible) {
            return (
                <View>
                    {listTask?.map((item) => (
                        <TaskComponent key={item.taskId} taskId={item.taskId} taskName={item.taskName}
                                       sprintId={sprintId} estimate={item.estimate} status={item.status}
                                       assignee={item.assignee} callBackGetListTask={callBackGetListTask}
                                       callbackTaskDetail={callbackTaskDetail}
                                       callbackDeleteTask={callbackDeleteTask}/>
                    ))}
                    {renderTextField(isTextField)}
                </View>
            );
        }
    };
    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modal}
                >
                    <View style={styles.modalProfileView}>
                        <Text style={{fontSize: 20, fontWeight: "bold", margin: 10}}>Edit
                            sprint: {sprintNameDetail}</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>Sprint name</Text>
                        <TextField text={sprintNameUpdate}
                                   style={{height:40}}
                                   onChangeText={sprintNameUpdate => setSprintNameUpdate(sprintNameUpdate)}/>
                        <Text style={{fontSize: 12, marginLeft: 10}}>Start date</Text>
                        <DateTimePicker
                            style={{width: 200, marginLeft: 20}}
                            type="date"
                            value={startDateUpdate}
                            onChangeDate={startDateUpdate => setStartDateUpdate(startDateUpdate)}
                        />
                        <Text style={{fontSize: 12, marginLeft: 10}}>End date</Text>
                        <DateTimePicker
                            style={{width: 200, marginLeft: 20}}
                            type="date"
                            value={endDateUpdate}
                            onChangeDate={endDateUpdate => setEndDateUpdate(endDateUpdate)}
                        />
                        <Text style={{fontSize: 12, marginLeft: 10}}>Sprint goal</Text>
                        <TextField multiline={true} style={{height: 100}} text={goalUpdate}
                                   onChangeText={goalUpdate => setGoalUpdate(goalUpdate)}/>
                        <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                            <Buttons text={"Update"} style={{marginRight: 40}} onPressTo={() => {
                                updateASprint(sprintId, sprintNameUpdate, startDateUpdate, endDateUpdate, goalUpdate);
                                setModalVisible(!modalVisible)
                            }}/>
                            <Buttons text={"Cancel"} style={{backgroundColor: '#F4F5F7'}} styleText={{color: 'black'}}
                                     onPressTo={() => setModalVisible(!modalVisible)}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style={styles.containerContent}>
                <View style={styles.sprint}>
                    <TouchableOpacity onPress={() => setVisible(!visible)}>
                        <Text style={styles.text}><Text style={styles.textSprint}>{sprintNameDetail}
                        </Text> {formatDate(startDateDetail)} - {formatDate(endDateDetail)} ({listTask.length} issues)</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.view1}>
                    <Text style={styles.text1}>{notStartTask}</Text>
                </View>
                <View style={styles.view2}>
                    <Text style={styles.text2}>{inProgressTask}</Text>
                </View>
                <View style={styles.view3}>
                    <Text style={styles.text3}>{doneTask}</Text>
                </View>
                <Buttons text={"Complete sprint"} style={styles.btn} styleText={{fontSize: 14}}/>
                <Buttons text={"Edit"} onPressTo={() => setModalVisible(!modalVisible)}
                         style={[styles.button, {width: 35}]} styleText={{fontSize: 14}}/>
                <Buttons text={"X"} onPressTo={() => deleteASprint(projectId, sprintId)} style={styles.button}
                         styleText={{fontSize: 14}}/>
            </View>
            <Text style={{marginLeft: 20}}>{goalDetail}</Text>
            {renderDropdown()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 8,
        borderRadius: 8,
    },
    containerContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
    },
    row: {
        flexDirection: "row",
    },
    sprint: {
        flex: 10,
        justifyContent: "center",
        margin: 2
    },
    view1: {
        margin: 5,
        width: 20,
        borderRadius: 5,
        backgroundColor: "#DFE1E6",
        justifyContent: "center",
        alignItems: "center",
    },
    text1: {
        color: "black",
    },
    view2: {
        margin: 5,
        width: 20,
        borderRadius: 5,
        backgroundColor: "#0052CC",
        justifyContent: "center",
        alignItems: "center",
    },
    view3: {
        margin: 5,
        width: 20,
        borderRadius: 5,
        backgroundColor: "#00875A",
        justifyContent: "center",
        alignItems: "center",
    },

    text2: {
        color: "white",
    },
    text3: {
        color: "white",
    },
    btn: {
        margin: 5,
        width: 135,
        height: 30,
    },
    button: {
        width: 30,
        height: 30,
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    textSprint: {
        marginRight: 20,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        marginRight: 20,
        fontSize: 16,
    },
    modal: {
        alignItems: "center",
        flex: 1,
    },
    modalProfileView: {
        width: "40%",
        marginTop: 50,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        padding: 50,
    },
});
export default SprintComponent;
