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

export default function TaskDetailComponent({
  projectId,
  listMember,
  memberId,
  taskDetail,
  callbackTaskDetail,
  callbackSubTaskDetail,
  callBackUpdateTask,
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
  const [listActivity, setListActivity] = useState();
  const [isChild, setIsChild] = useState(false);

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

  function filterActivity(list, value) {
    if (value === "ALL") {
      setListActivity(list);
    } else if (value === "HISTORY") {
      const filData = list.filter(function (item) {
        return item.activityType === value;
      });
      setListActivity(filData);
    } else if (value === "COMMENTS") {
      const filData = list.filter(function (item) {
        return item.activityType === value;
      });
      setListActivity(filData);
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
    filterActivity(activityResponse, show);
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
      taskName,
      status,
      description,
      assignee,
      label,
      estimate,
      reporter
    ).then((v) => {
      callBackUpdateTask();
      getTaskDetail(taskId).then((r) => {
        console.log("getDetailATask:" + JSON.stringify(r.data));
        setTaskNameDetail(r.data.taskName);
        setStatusDetail(r.data.status);
        setDescriptionDetail(r.data.description);
        setAssigneeDetail(r.data.assignee);
        setLabelDetail(r.data.label);
        setEstimateDetail(r.data.estimate);
        setReporterDetail(r.data.reporter);
      });
    });
  };
  const assignInTask = (projectId, taskId, assignee) => {
    assignTask(projectId, taskId, assignee).then((v) => {
      callBackUpdateTask();
      getTaskDetail(taskId).then((r) => {
        setAssigneeDetail(r.data.assignee);
      });
    });
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
                assignInTask(projectId, taskDetail.taskId, memberId);
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
    createSubTask(projectId, taskId, memberId, subTaskName).then(() =>
      getListSubTask(taskId).then((r) => setListSubTask(r.data.subTasks))
    );
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
            <Text style={{ fontSize: 12 }}>Description</Text>
            <TextField
              multiline={true}
              style={{ height: 100 }}
              text={descriptionUpdate}
              onChangeText={(descriptionUpdate) =>
                setDescriptionUpdate(descriptionUpdate)
              }
            />
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
            <Text style={{ fontSize: 12 }}>Label</Text>
            <TextField
              text={labelUpdate}
              style={{ height: 40 }}
              onChangeText={(labelUpdate) => setLabelUpdate(labelUpdate)}
            />
            <Text style={{ fontSize: 12 }}>Estimate</Text>
            <TextField
              text={estimateUpdate}
              style={{ height: 40 }}
              onChangeText={(estimateUpdate) =>
                setEstimateUpdate(estimateUpdate)
              }
            />
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
            <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
              <Buttons
                text={"Update"}
                style={{ marginRight: 40 }}
                onPressTo={() => {
                  console.log("ProjectId: " + projectId);
                  console.log("taskId: " + taskDetail.taskId);
                  console.log("taskNameUpdate: " + taskNameUpdate);
                  console.log("statusUpdate: " + statusUpdate);
                  console.log("descriptionUpdate: " + descriptionUpdate);
                  console.log("assigneeUpdate: " + assigneeUpdate);
                  console.log("labelUpdate: " + labelUpdate);
                  console.log("estimateUpdate: " + estimateUpdate);
                  console.log("reporterUpdate: " + reporterUpdate);
                  updateATask(
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
                  setModalVisible(!modalVisible);
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
          <Buttons
            text={"Edit"}
            style={[styles.buttonClose, { width: 40, marginRight: 10 }]}
            onPressTo={() => setModalVisible(!modalVisible)}
          ></Buttons>
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
        <View style={styles.rowDetail}>
          <Text style={[styles.descriptionDetail, { alignSelf: "center" }]}>
            Show:
          </Text>
          <Picker
            style={styles.picker}
            mode={"dropdown"}
            selectedValue={show}
            onValueChange={(itemValue, itemIndex) => {
              filterActivity(activityResponse, itemValue);
              console.log("Pick value" + itemValue);
              setShow(itemValue);
            }}
          >
            <Picker.Item label="All" value="ALL" />
            <Picker.Item label="Comments" value="COMMENTS" />
            <Picker.Item label="History" value="HISTORY" />
          </Picker>
        </View>
        <FlatList
          data={listActivity}
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
