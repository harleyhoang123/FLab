import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Buttons from "./Buttons";
import { Picker } from "@react-native-picker/picker";
import TextField from "./TextField";
import SubTaskComponent from "./SubTaskComponent";
import UserInfoComponent from "./UserInfoComponent";
import {
  assignTask,
  createSubTask,
  getListSubTask,
  getTaskDetail,
  updateTask,
} from "../networking/CustomNetworkService";
import { SelectCountry } from "react-native-element-dropdown";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TaskDetailComponent({
  projectId,
  listMember,
  memberId,
  taskDetail,
  callbackTaskDetail,
  callbackSubTaskDetail,
  callBackUpdateTask,
  navigation,
}) {
  let isValid = true;
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState("ALL");
  const [taskNameDetail, setTaskNameDetail] = useState(taskDetail.taskName);
  const [statusDetail, setStatusDetail] = useState(taskDetail.status);
  const [descriptionDetail, setDescriptionDetail] = useState(
    taskDetail.description
  );
  const [assigneeDetail, setAssigneeDetail] = useState(taskDetail.assignee);
  const [labelDetail, setLabelDetail] = useState(taskDetail.label);
  const [estimateDetail, setEstimateDetail] = useState(taskDetail.estimate);
  const [reporterDetail, setReporterDetail] = useState(taskDetail.reporter);
  const [activityResponse, setActivityResponse] = useState(
    taskDetail.activityResponses
  );
  const [listSubTask, setListSubTask] = useState(taskDetail.subTasks);
  const [taskNameUpdate, setTaskUpdate] = useState(taskNameDetail);
  const [statusUpdate, setStatusUpdate] = useState(statusDetail);
  const [descriptionUpdate, setDescriptionUpdate] = useState(descriptionDetail);
  const [assigneeUpdate, setAssigneeUpdate] = useState();
  const [labelUpdate, setLabelUpdate] = useState(labelDetail);
  const [estimateUpdate, setEstimateUpdate] = useState(estimateDetail);
  const [reporterUpdate, setReporterUpdate] = useState();
  const [visible, setVisible] = useState(true);
  const [subTaskName, setSubTaskName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();
  const [isChild, setIsChild] = useState(false);

  const isNumber = new RegExp("^\\d+$");
  let isValidEdit = true;
  const [isTaskNameUpdate, isSetTaskUpdate] = useState(false);
  const [isStatusUpdate, isSetStatusUpdate] = useState(false);
  const [isDescriptionUpdate, isSetDescriptionUpdate] = useState(false);
  const [isAssigneeUpdate, isSetAssigneeUpdate] = useState(false);
  const [isLabelUpdate, isSetLabelUpdate] = useState(false);
  const [isEstimateUpdate, isSetEstimateUpdate] = useState(false);
  const [isReporterUpdate, isSetReporterUpdate] = useState(false);

  function validateEditChildIssue(
    projectId,
    taskId,
    taskName,
    status,
    description,
    assignee,
    label,
    estimate,
    reporter
  ) {
    if (!taskNameUpdate) {
      isSetTaskUpdate(true);
      isValidEdit = false;
    } else {
      isSetTaskUpdate(false);
    }
    // if (!statusUpdate) {
    //   isSetStatusUpdate(true);
    //   isValidEdit = false;
    // } else {
    //   isSetStatusUpdate(false);
    // }
    // if (!descriptionUpdate) {
    //   isSetDescriptionUpdate(true);
    //   isValidEdit = false;
    // } else {
    //   isSetDescriptionUpdate(false);
    // }
    // if (!assigneeUpdate) {
    //   isSetAssigneeUpdate(true);
    //   isValidEdit = false;
    // } else {
    //   isSetAssigneeUpdate(false);
    // }
    // if (!labelUpdate.toString().match(isNumber)) {
    //   isSetLabelUpdate(true);
    //   isValidEdit = false;
    // } else {
    //   isSetLabelUpdate(false);
    // }
    // if (!estimateUpdate.toString().match(isNumber)) {
    //   isSetEstimateUpdate(true);
    //   isValidEdit = false;
    // } else {
    //   isSetEstimateUpdate(false);
    // }
    // if (!reporterUpdate) {
    //   isSetReporterUpdate(true);
    //   isValidEdit = false;
    // } else {
    //   isSetReporterUpdate(false);
    // }
    if (isValidEdit) {
      updateATask(
        projectId,
        taskId,
        memberId,
        taskName,
        status,
        description,
        assignee,
        label,
        estimate,
        reporter
      );
      setModalVisible(!modalVisible);
    }
  }

  function validateChildIssue(taskId, memberId, subTaskName) {
    if (!subTaskName) {
      setIsChild(true);
      isValid = false;
    }
    if (isValid) {
      addSubTask(taskId, memberId, subTaskName);
      setIsChild(false);
    }
  }
  const getCurrentMemberAssignee = () => {
    if (assigneeDetail !== null) {
      setAssigneeUpdate(assigneeDetail.memberId);
    }
  };
  const getCurrentMemberReporter = () => {
    if (reporterDetail !== null) {
      setReporterUpdate(reporterDetail.memberId);
    }
  };
  const checkNullTextField = () => {
    if (descriptionDetail === null) {
      setDescriptionUpdate("");
    }
    if (labelDetail === null) {
      setLabelUpdate("");
    }
    if (estimateDetail === null) {
      setEstimateUpdate("");
    }
  };
  useEffect(() => {
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
  }, []);
  const getStatus = (status) => {
    if (status === "TO_DO") {
      return "To do";
    }
    if (status === "IN_PROGRESS") {
      return "In progress";
    }
    if (status === "DONE") {
      return "Done";
    }
  };
  const updateATask = (
    projectId,
    taskId,
    memberId,
    taskName,
    status,
    description,
    assignee,
    label,
    estimate,
    reporter
  ) => {
    updateTask(
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
    ).then((v) => {
      callBackUpdateTask();
      getTaskDetail(taskId, navigation).then((r) => {
        console.log("getDetailATask:" + JSON.stringify(r.data));
        setTaskNameDetail(r.data.taskName);
        setStatusDetail(r.data.status);
        setDescriptionDetail(r.data.description);
        setAssigneeDetail(r.data.assignee);
        setLabelDetail(r.data.label);
        setEstimateDetail(r.data.estimate);
        setReporterDetail(r.data.reporter);
        setActivityResponse(r.data.activityResponses);
      }).catch(error => {});
    }).catch(error => {});
  };
  const assignInTask = (projectId, taskId, memberId, assignee) => {
    assignTask(projectId, taskId, memberId, assignee, navigation).then((v) => {
      callBackUpdateTask();
      getTaskDetail(taskId, navigation).then((r) => {
        setAssigneeDetail(r.data.assignee);
        setActivityResponse(r.data.activityResponses);
      }).catch(error => {});
    }).catch(error => {});
  };
  const handleNone = (none) => {
    if (none === null) {
      return "None";
    } else {
      return none;
    }
  };
  const renderDetail = () => {
    if (visible) {
      return (
        <View>
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, { width: 100 }]}>
              Assignee:
            </Text>
            <Text style={styles.descriptionDetail}>
              <UserInfoComponent info={assigneeDetail} />
            </Text>
          </View>
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, { width: 100 }]}></Text>
            <TouchableOpacity
              onPress={() => {
                assignInTask(projectId, taskDetail.taskId, memberId, memberId);
              }}
            >
              <Text style={[styles.descriptionDetail, { color: "blue" }]}>
                Assign to me
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, { width: 100 }]}>
              Labels:
            </Text>
            <Text style={styles.descriptionDetail}>
              {handleNone(labelDetail)}
            </Text>
          </View>
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, { width: 100 }]}>
              Estimate:
            </Text>
            <Text style={styles.descriptionDetail}>
              {handleNone(estimateDetail)}
            </Text>
          </View>
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, { width: 100 }]}>
              Reporter
            </Text>
            <Text style={styles.descriptionDetail}>
              <UserInfoComponent info={reporterDetail} />
            </Text>
          </View>
        </View>
      );
    }
  };
  const renderTextField = () => {
    if (add) {
      return (
        <View>
          <TextField
            style={{ margin: 0, width: "100%", height: 40 }}
            text={subTaskName}
            onChangeText={(subTaskName) => setSubTaskName(subTaskName)}
            onSubmitEditing={() =>
              addSubTask(taskDetail.taskId, memberId, subTaskName)
            }
          />
          {isChild && (
            <Text style={styles.inputInvalid}>Invalid issue's title</Text>
          )}
          <View style={styles.rowDetail}>
            <Buttons
              text={"Create"}
              onPressTo={() =>
                validateChildIssue(taskDetail.taskId, memberId, subTaskName)
              }
              style={styles.button}
            />
            <Buttons
              text={"Cancel"}
              onPressTo={() => setAdd(!add)}
              style={styles.button}
            />
          </View>
        </View>
      );
    }
  };
  const addSubTask = (taskId, memberId, subTaskName) => {
    createSubTask(projectId, taskId, memberId, subTaskName, navigation).then(
      () =>
        getListSubTask(taskId, navigation).then((r) =>
          setListSubTask(r.data.subTasks)
        ).catch(error => {})
    ).catch(error => {});
    setAdd(!add);
    setSubTaskName("");
  };
  const formatterDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const d = new Date(date);
    return (
      d.toLocaleDateString("en-US", options) +
      ", " +
      d.toTimeString().split("G")[0]
    );
  };
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
        <TouchableOpacity activeOpacity={1} style={styles.modal}>
          <View style={styles.modalProfileView}>
            <Text style={{ fontSize: 12 }}>Task name</Text>
            <TextField
              text={taskNameUpdate}
              style={{ height: 40 }}
              onChangeText={(taskNameUpdate) => setTaskUpdate(taskNameUpdate)}
            />
            {isTaskNameUpdate && (
              <Text style={styles.inputInvalid}>Invalid task name</Text>
            )}
            <Text style={{ fontSize: 12 }}>Status</Text>
            <Picker
              style={styles.pickerUpdate}
              mode={"dropdown"}
              selectedValue={statusUpdate}
              onValueChange={(itemValue, itemIndex) =>
                setStatusUpdate(itemValue)
              }
            >
              <Picker.Item label="To do" value="TO_DO" />
              <Picker.Item label="In progress" value="IN_PROGRESS" />
              <Picker.Item label="Done" value="DONE" />
            </Picker>
            {isStatusUpdate && (
              <Text style={styles.inputInvalid}>Invalid status</Text>
            )}
            <Text style={{ fontSize: 12 }}>Description</Text>
            <TextField
              multiline={true}
              style={{ height: 100 }}
              text={descriptionUpdate}
              onChangeText={(descriptionUpdate) =>
                setDescriptionUpdate(descriptionUpdate)
              }
            />
            {isDescriptionUpdate && (
              <Text style={styles.inputInvalid}>Invalid description</Text>
            )}
            <Text style={{ fontSize: 12 }}>Assignee</Text>
            <SelectCountry
              style={styles.dropdown}
              value={assigneeUpdate}
              selectedTextStyle={styles.selectedTextStyle}
              imageStyle={styles.imageStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              imageField="image"
              placeholder="Select member"
              onChange={(item) => {
                setAssigneeUpdate(item.value);
              }}
            />
            {isAssigneeUpdate && (
              <Text style={styles.inputInvalid}>Invalid assignee</Text>
            )}
            <Text style={{ fontSize: 12 }}>Label</Text>
            <TextField
              text={labelUpdate}
              style={{ height: 40 }}
              onChangeText={(labelUpdate) => setLabelUpdate(labelUpdate)}
            />
            {isLabelUpdate && (
              <Text style={styles.inputInvalid}>Label must be a number</Text>
            )}
            <Text style={{ fontSize: 12 }}>Estimate</Text>
            <TextField
              text={estimateUpdate}
              style={{ height: 40 }}
              onChangeText={(estimateUpdate) =>
                setEstimateUpdate(estimateUpdate)
              }
            />
            {isEstimateUpdate && (
              <Text style={styles.inputInvalid}>Estimate must be a number</Text>
            )}
            <Text style={{ fontSize: 12 }}>Reporter</Text>
            <SelectCountry
              style={styles.dropdown}
              value={reporterUpdate}
              selectedTextStyle={styles.selectedTextStyle}
              imageStyle={styles.imageStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              imageField="image"
              placeholder="Select member"
              onChange={(item) => {
                setReporterUpdate(item.value);
              }}
            />
            {isReporterUpdate && (
              <Text style={styles.inputInvalid}>Invalid reporter</Text>
            )}
            <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
              <Buttons
                text={"Update"}
                style={{ marginRight: 40 }}
                onPressTo={() => {
                  validateEditChildIssue(
                    projectId,
                    taskDetail.taskId,
                    taskNameUpdate,
                    statusUpdate,
                    descriptionUpdate,
                    assigneeUpdate,
                    labelUpdate,
                    estimateUpdate,
                    reporterUpdate
                  );
                }}
              />
              <Buttons
                text={"Cancel"}
                style={{ backgroundColor: "#F4F5F7" }}
                styleText={{ color: "black" }}
                onPressTo={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.wrapper}>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <View style={styles.btnIcon}>
            <TouchableOpacity onPress={() => {
              setModalVisible(!modalVisible)
            }}>
              <MaterialCommunityIcons name={"border-color"} size={30} color="#3f444a"></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
          <Buttons
            text={"X"}
            style={styles.buttonClose}
            onPressTo={() => callbackTaskDetail(null)}
          ></Buttons>
        </View>

        <Text style={styles.title}>{taskNameDetail}</Text>
        <Text style={styles.description}>
          Status: {getStatus(statusDetail)}
        </Text>
        <Text style={styles.childIssues}>Description</Text>
        <Text style={{ fontSize: 14, margin: 10 }}>{descriptionDetail}</Text>
        <View style={styles.row}>
          <Text style={styles.childIssues}>Child Issues</Text>
          <Buttons
            text={"+"}
            style={styles.buttonClose}
            onPressTo={() => setAdd(!add)}
          ></Buttons>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 5 }}>
          {listSubTask?.map((item) => (
            <SubTaskComponent
              key={item.subTaskId}
              subTaskId={item.subTaskId}
              status={item.status}
              estimate={item.estimate}
              subTaskName={item.subTaskName}
              assignee={item.assignee}
              callbackSubTaskDetail={callbackSubTaskDetail}
            />
          ))}
          {renderTextField()}
        </View>
        <View style={styles.borderBot}>
          <View style={{ borderBottomWidth: 1 }}>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Text style={styles.descriptionDetail}>Details</Text>
            </TouchableOpacity>
          </View>
          {renderDetail()}
        </View>
        <Text style={styles.childIssues}>Activity</Text>
        <FlatList
          data={activityResponse}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.descriptionDetail}>
                <Text style={styles.childIssues}>{item.userInfo.fullName}</Text>{" "}
                {item.edited} at {formatterDate(item.createdDate)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnIcon:{
    paddingVertical: 5,
    paddingHorizontal: 5,
    minWidth:10,
    height:40,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    height: "auto",
    backgroundColor: "white",
  },
  inputInvalid: {
    marginLeft: 15,
    color: "red",
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
    margin: 10,
  },
  description: {
    fontSize: 20,
    margin: 10,
  },
  descriptionDetail: {
    fontSize: 16,
    alignItems: "center",
    margin: 15,
  },
  childIssues: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  containerComment: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    width: "50%",
    height: 40,
    margin: 20,
    borderColor: "gray",
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
