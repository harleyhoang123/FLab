import React, {useEffect, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Buttons from "./Buttons";
import {Picker} from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import UserInfoComponent from "./UserInfoComponent";
import TextField from "./TextField";
import {assignneSubTask, deleteSubTask, getSubTaskDetail, updateSubTask} from "../networking/CustomNetworkService";
import {SelectCountry} from "react-native-element-dropdown";


function SubTaskDetailComponent({projectId,memberId, subTaskDetail, taskId, listMember, callbackSubTaskDetail}) {
    console.log("List item in update sub task: "+ JSON.stringify(listMember));
    const [show, setShow] = useState("ALL");
    const [visible, setVisible] = useState(true);
    const [subTaskNameDetail, setSubTaskNameDetail] = useState(subTaskDetail.subTaskName);
    const [statusDetail, setStatusDetail] = useState(subTaskDetail.status);
    const [descriptionDetail, setDescriptionDetail] = useState(subTaskDetail.description);
    const [assigneeDetail, setAssigneeDetail] = useState(subTaskDetail.assignee);
    const [labelDetail, setLabelDetail] = useState(subTaskDetail.label);
    const [estimateDetail, setEstimateDetail] = useState(subTaskDetail.estimate);
    const [reporterDetail, setReporterDetail] = useState(subTaskDetail.reporter);
    const [activityResponse, setActivityResponse] = useState(subTaskDetail.activityResponse)
    const [subTaskNameUpdate, setSubTaskUpdate] = useState(subTaskNameDetail);
    const [statusUpdate, setStatusUpdate] = useState(statusDetail);
    const [descriptionUpdate, setDescriptionUpdate] = useState(descriptionDetail);
    const [assigneeUpdate, setAssigneeUpdate] = useState();
    const [labelUpdate, setLabelUpdate] = useState(labelDetail);
    const [estimateUpdate, setEstimateUpdate] = useState(estimateDetail);
    const [reporterUpdate, setReporterUpdate] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [data,setData]=useState();
    const [listActivity, setListActivity] = useState();
    function filterActivity(list,value) {
        if (value==="ALL"){
            setListActivity(list);
        }else if (value==="HISTORY"){
            const filData = list.filter(function (item) {
                return item.activityType === value;
            })
            setListActivity(filData);
        }else if (value==="COMMENTS"){
            const filData = list.filter(function (item) {
                return item.activityType === value;
            })
            setListActivity(filData);
        }
    }
    const getCurrentMemberAssignee=()=>{
        if(assigneeDetail!==null){
            setAssigneeUpdate(assigneeDetail.memberId);
        }
    }
    const getCurrentMemberReporter=()=>{
        if(reporterDetail!==null){
            setReporterUpdate(reporterDetail.memberId);
        }
    }
    const checkNullTextField=()=>{
        if (descriptionDetail===null){
            setDescriptionUpdate("")
        }
        if (labelDetail===null){
            setLabelUpdate("")
        }
        if (estimateDetail===null){
            setEstimateUpdate("")
        }
    }
    useEffect(
        () =>{
            let newArray = listMember.map((item) => {
                return {
                    label: item.userInfo.userInfo.fullName,
                    value: item.memberId,
                    image: {
                        uri: item.userInfo.userInfo.avatar,
                    },
                };
            });
            getCurrentMemberAssignee();
            getCurrentMemberReporter();
            checkNullTextField();
            setData(newArray);
            filterActivity(activityResponse,show);
        }, [])
    const getStatus = (status) => {
        if (status === "TO_DO") {
            return "To do"
        }
        if (status === "IN_PROGRESS") {
            return "In progress"
        }
        if (status === "DONE") {
            return "Done"
        }
    }
    const formatterDate=(date)=>{
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const d= new Date(date);
        return d.toLocaleDateString("en-US", options) +", "+ d.toTimeString().split("G")[0];
    }
    const handleNone = (none) => {
        if (none === null) {
            return "None";
        } else {
            return none;
        }
    }
    console.log("Task detail in task detail component: " + JSON.stringify(subTaskDetail));

    const updateASubTask = (projectId, subTaskId, taskName, status, description, assignee, label, estimate, reporter) => {
        updateSubTask(projectId, subTaskId, taskName, status, description, assignee, label, estimate, reporter).then(value => {
            console.log("updateASubTask:" + JSON.stringify(value));
            getSubTaskDetail(subTaskId).then(r => {console.log("getDetailASubTask:" + JSON.stringify(r.data));
            setSubTaskNameDetail(r.data.subTaskName);
            setStatusDetail(r.data.status);
            setDescriptionDetail(r.data.description);
            setAssigneeDetail(r.data.assignee);
            setLabelDetail(r.data.label);
            setEstimateDetail(r.data.estimate);
            setReporterDetail(r.data.reporter);
        })})
    }
    const assigneeInSubTask=(projectId, subTaskId,assignee)=>{
        assignneSubTask(projectId, subTaskId,assignee).then(value => {
            getSubTaskDetail(subTaskId).then(r => {
                setAssigneeDetail(r.data.assignee);}
            )})
    }
    const renderDetail = () => {
        if (visible) {
            return (
                <View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width: 100}]}>Assignee:</Text>
                        <Text style={styles.descriptionDetail}>
                            <UserInfoComponent info={assigneeDetail}/>
                        </Text>
                    </View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width: 100}]}></Text>
                        <TouchableOpacity onPress={()=>{assigneeInSubTask(projectId, subTaskDetail.subTaskId, memberId)}}>
                            <Text style={[styles.descriptionDetail, {color: 'blue'}]}>Assign to me</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width: 100}]}>Labels:</Text>
                        <Text style={styles.descriptionDetail}>
                            {handleNone(labelDetail)}
                        </Text>
                    </View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width: 100}]}>Estimate:</Text>
                        <Text style={styles.descriptionDetail}>
                            {handleNone(estimateDetail)}
                        </Text>
                    </View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width: 100}]}>Reporter:</Text>
                        <Text style={styles.descriptionDetail}>
                            <UserInfoComponent info={reporterDetail}/>
                        </Text>
                    </View>
                </View>
            )
        }
    }
    return (
        <View style={[styles.container]}>
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
                        <Text style={{fontSize: 12}}>Task name</Text>
                        <TextField text={subTaskNameUpdate}
                                   style={{height: 40}}
                                   onChangeText={subTaskNameUpdate => setSubTaskUpdate(subTaskNameUpdate)}/>
                        <Text style={{fontSize: 12}}>Status</Text>
                        <Picker
                            style={styles.pickerUpdate}
                            mode={"dropdown"}
                            selectedValue={statusUpdate}
                            onValueChange={(itemValue, itemIndex) =>
                                setStatusUpdate(itemValue)
                            }>
                            <Picker.Item label="To do" value="TO_DO"/>
                            <Picker.Item label="In progress" value="IN_PROGRESS"/>
                            <Picker.Item label="Done" value="DONE"/>
                        </Picker>
                        <Text style={{fontSize: 12}}>Description</Text>
                        <TextField multiline={true} style={{height: 100}} text={descriptionUpdate}
                                   onChangeText={descriptionUpdate => setDescriptionUpdate(descriptionUpdate)}/>
                        <Text style={{fontSize: 12}}>Assignee</Text>
                        <SelectCountry
                            style={styles.dropdown}
                            selectedTextStyle={styles.selectedTextStyle}
                            imageStyle={styles.imageStyle}
                            value={assigneeUpdate}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            imageField="image"
                            placeholder="Select member"
                            onChange={item => {
                                setAssigneeUpdate(item.value)
                            }}
                        />
                        <Text style={{fontSize: 12}}>Label</Text>
                        <TextField text={labelUpdate}
                                   style={{height: 40}}
                                   onChangeText={labelUpdate => setLabelUpdate(labelUpdate)}/>
                        <Text style={{fontSize: 12}}>Estimate</Text>
                        <TextField text={estimateUpdate}
                                   style={{height: 40}}
                                   onChangeText={estimateUpdate => setEstimateUpdate(estimateUpdate)}/>
                        <Text style={{fontSize: 12}}>Reporter</Text>
                        <SelectCountry
                            style={styles.dropdown}
                            selectedTextStyle={styles.selectedTextStyle}
                            imageStyle={styles.imageStyle}
                            value={reporterUpdate}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            imageField="image"
                            placeholder="Select member"
                            onChange={item => {
                                setReporterUpdate(item.value)
                            }}
                        />
                        <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                            <Buttons text={"Update"} style={{marginRight: 40}} onPressTo={() => {
                                console.log("ProjectId: " + projectId);
                                console.log("subTaskId: " + subTaskDetail.subTaskId);
                                console.log("subTaskNameUpdate: " + subTaskNameUpdate);
                                console.log("statusUpdate: " + statusUpdate);
                                console.log("descriptionUpdate: " + descriptionUpdate);
                                console.log("assigneeUpdate: " + assigneeUpdate);
                                console.log("labelUpdate: " + labelUpdate);
                                console.log("estimateUpdate: " + estimateUpdate);
                                console.log("reporterUpdate: " + reporterUpdate);
                                updateASubTask(projectId, subTaskDetail.subTaskId, subTaskNameUpdate, statusUpdate, descriptionUpdate, assigneeUpdate, labelUpdate, estimateUpdate, reporterUpdate);
                                setModalVisible(!modalVisible);
                            }}/>
                            <Buttons text={"Cancel"} style={{backgroundColor: '#F4F5F7'}} styleText={{color: 'black'}}
                                     onPressTo={() => setModalVisible(!modalVisible)}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style={styles.wrapper}>
                <View style={{flexDirection: "row", alignSelf: "flex-end",}}>
                    <Buttons text={"Edit"} style={[styles.buttonClose, {width: 40, marginRight: 10}]}
                             onPressTo={() => setModalVisible(!modalVisible)}></Buttons>
                    <Buttons text={"Delete"} style={[styles.buttonClose, {width: 60, marginRight: 10}]}
                             onPressTo={() => {
                                 deleteSubTask(subTaskDetail.subTaskId, taskId).then(r => callbackSubTaskDetail(null))
                             }}></Buttons>
                    <Buttons text={"X"} style={styles.buttonClose}
                             onPressTo={() => callbackSubTaskDetail(null)}></Buttons>
                </View>

                <Text style={styles.title}>
                    {subTaskNameDetail}
                </Text>
                <Text style={styles.description}>
                    Status: {getStatus(statusDetail)}
                </Text>
                <Text style={styles.childIssues}>Description</Text>
                <Text style={{fontSize: 14, margin: 10}}>
                    {descriptionDetail}
                </Text>
                <View style={styles.borderBot}>
                    <View style={{borderBottomWidth: 1}}>
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Text style={styles.descriptionDetail}>Details</Text>
                        </TouchableOpacity>
                    </View>
                    {renderDetail()}
                </View>
                <Text style={[styles.childIssues]}>Activity</Text>
                <View style={styles.rowDetail}>
                    <Text style={[styles.descriptionDetail]}>Show:</Text>
                    <Picker
                        style={styles.picker}
                        mode={"dropdown"}
                        selectedValue={show}
                        onValueChange={(itemValue, itemIndex) =>{
                            filterActivity(activityResponse,itemValue);
                            setShow(itemValue)
                        }}>
                        <Picker.Item label="All" value="ALL"/>
                        <Picker.Item label="Comments" value="COMMENTS"/>
                        <Picker.Item label="History" value="HISTORY"/>
                    </Picker>
                </View>
                <FlatList data={listActivity}
                          renderItem={({ item }) => (
                              <View>
                                  <Text style={styles.descriptionDetail}><Text style={styles.childIssues}>{item.userInfo.fullName}</Text> {item.edited} at {formatterDate(item.createdDate)}</Text>
                              </View>
                          )
                          }/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        height: "auto",
        backgroundColor: 'white'
    },
    borderBot: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 8,
    },
    wrapper: {
        margin: 7,
    },
    title: {
        width: "100%",
        fontSize: 22,
        margin: 10
    },
    description: {
        fontSize: 20,
        margin:10,
    },
    descriptionDetail: {
        fontSize: 16,
        alignItems: 'center',
        margin: 15,
    },
    childIssues: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 10
    },
    containerComment: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonClose: {
        width: 30,
        height: 30,
    },
    picker: {
        width: "25%",
        height: 40,
        borderRadius: 8,
    },
    pickerUpdate: {
        width: 200,
        height: 40,
        borderRadius: 8,
        margin: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    rowDetail: {
        flexDirection: "row",
        borderRadius: 8,
    },
    button: {
        margin: 10,
        width: 100,
        height: 30,
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
    dropdown: {
        width:"35%",
        height: 40,
        margin:20,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    dropdown: {
        width:"50%",
        height: 40,
        margin:20,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
});
export default SubTaskDetailComponent;