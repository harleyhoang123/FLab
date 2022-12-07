import React,{useState,useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, FlatList,
} from "react-native";
import Buttons from "./Buttons";
import {Picker} from '@react-native-picker/picker';
import TextField from "./TextField";
import SubTaskComponent from "./SubTaskComponent";
import TaskComponent from "./TaskComponent";

export default function TaskDetailComponent({taskDetail,callbackTaskDetail,callbackSubTaskDetail}) {
  console.log("Task detail IS: "+JSON.stringify(taskDetail));
  console.log("Task Name: "+JSON.stringify(taskDetail.taskName));
  const [selected, setSelected] = useState(taskDetail.status);
  const [Comments, SetComments] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [listSubTask, setListSubTask] = useState(taskDetail.subTasks);
  const [visible, setVisible] = useState(true);
  const [activityResponse, setActivityResponse]= useState(taskDetail.activityResponses)
  const [visibleAll, setVisibleAll] = useState(false);
  const [visibleComment, setVisibleComment] = useState(false);
  const [visibleHistory, setVisibleHistory] = useState(false);

const renderDetail=()=>{
  if(visible){
    return(
        <View>
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, {width:100}]}>Assignee:</Text>
            <Text style={styles.descriptionDetail}>
              {/*{taskDetail.assignee.userInfo.fullName}*/}
            </Text>
          </View>
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, {width:100}]}></Text>
            <TouchableOpacity>
              <Text style={[styles.descriptionDetail,{color:'blue'}]}>Assignee to me</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, {width:100}]}>Labels:</Text>
            <Text style={styles.descriptionDetail}>
              {taskDetail.label}
            </Text>
          </View>
          {/*<View style={styles.rowDetail}>*/}
          {/*  <Text style={[styles.descriptionDetail, {width:100}]}>Estimate</Text>*/}
          {/*  <Text style={styles.descriptionDetail}>1</Text>*/}
          {/*</View>*/}
          <View style={styles.rowDetail}>
            <Text style={[styles.descriptionDetail, {width:100}]}>Reporter</Text>
            <Text style={styles.descriptionDetail}>
              {/*{taskDetail.reporter.userInfo.fullName}*/}
            </Text>
          </View>
        </View>
    )
  }
}
  const renderTextField = () => {
  if(add){
    return (
        <View>
          <TextField style={{margin:0,width:"100%",height:40}}/>
          <View style={styles.rowDetail}>
            <Buttons text={"Create"}/>
            <Buttons text={"Cancel"} onPressTo={()=>setAdd(!add)}/>
          </View>
        </View>

    )
  }

  };
  return(
      <View style={[styles.container]}>
          <View style={styles.wrapper}>
            <Buttons text={"X"} style={styles.buttonClose} onPressTo={()=>callbackTaskDetail(null)}></Buttons>
            <Text style={styles.title}>
              {taskDetail.taskName}
            </Text>
            <Picker
                style={styles.picker}
                mode={"dropdown"}
                selectedValue={selected}
                onValueChange={(itemValue, itemIndex) =>
                    setSelected(itemValue)
                }>
              <Picker.Item label="To Do" value="TO_DO" />
              <Picker.Item label="In progress" value="IN_PROGRESS" />
              <Picker.Item label="Done" value="DONE" />
            </Picker>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descriptionDetail}>
              {taskDetail.description}
            </Text>
            <View style={styles.row}>
                <Text style={styles.childIssues}>Child Issues</Text>
                <Buttons text={"+"} style={styles.buttonClose} onPressTo={()=>setAdd(!add)}></Buttons>
            </View>
            <View style={{borderWidth:1, borderRadius:5}}>
              {listSubTask?.map((item) => (
                  <SubTaskComponent key={item.subTaskId} subTaskId={item.subTaskId} status={item.status} estimate={item.estimate} subTaskName={item.subTaskName} assignee={item.assignee} callbackSubTaskDetail={callbackSubTaskDetail}/>
              ))}
              {renderTextField()}
            </View>
            <View style={styles.borderBot}>
              <View style={{borderBottomWidth:1}}>
                <TouchableOpacity onPress={()=>setVisible(!visible)}>
                  <Text style={styles.descriptionDetail}>Details</Text>
                </TouchableOpacity>
              </View>
              {renderDetail()}
            </View>
            <Text style={styles.childIssues}>Activity</Text>
            <View style={styles.rowDetail}>
              <Text style={[styles.descriptionDetail,{ alignSelf: 'center'}]}>Show:</Text>
              <Picker
                  style={styles.picker}
                  mode={"dropdown"}
                  selectedValue={show}
                  onValueChange={(itemValue, itemIndex) =>
                      setShow(itemValue)
                  }>
                <Picker.Item label="All" value="ALL" />
                <Picker.Item label="Comments" value="COMMENTS" />
                <Picker.Item label="History" value="HISTORY" />
              </Picker>
            </View>
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
    backgroundColor:'white'
  },
  borderBot: {
    marginTop:20,
    borderWidth: 1,
    borderRadius:8,
  },
  wrapper: {
    margin: 7,
  },
  title: {
    width: "100%",
    fontSize: 22,
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  descriptionDetail: {
    fontSize: 16,
    marginBottom: 20,
  },
  childIssues: {
    fontSize: 16,
    fontWeight:"bold",
  },
  containerComment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose:{
    alignSelf:"flex-end",
    width:30,
    height:30,
  },
  picker:{
    width:"25%",
    height:40,
    borderRadius:8,
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",

  },
  rowDetail:{
    flexDirection:"row",
    borderRadius:8,
  },
  button:{
    margin:10,
    width:100,
    height:30,
  },
});
