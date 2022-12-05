import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Buttons from "./Buttons";
import {Picker} from "@react-native-picker/picker";
import SubTaskComponent from "./SubTaskComponent";

function SubTaskDetailComponent({subTaskDetail}) {
    const [selected, setSelected] = useState();
    const [Comments, SetComments] = useState([]);
    const [commentValue, setCommentValue] = useState('');
    const [add, setAdd] = useState(false);
    const [visible, setVisible] = useState(true);
    const [visibleAll, setVisibleAll] = useState(false);
    const [visibleComment, setVisibleComment] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    console.log("Task detail in task detail component: "+JSON.stringify(subTaskDetail));
    console.log("Task name: "+subTaskDetail.data.data.subTaskName);
    const renderDetail=()=>{
        if(visible){
            return(
                <View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width:100}]}>Assignee:</Text>
                        <Text style={styles.descriptionDetail}>{subTaskDetail.data.data.assignee}</Text>
                    </View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width:100}]}></Text>
                        <TouchableOpacity>
                            <Text style={[styles.descriptionDetail,{color:'blue'}]}>Assignee to me</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width:100}]}>Labels:</Text>
                        <Text style={styles.descriptionDetail}>{subTaskDetail.data.data.label}</Text>
                    </View>
                    <View style={styles.rowDetail}>
                      <Text style={[styles.descriptionDetail, {width:100}]}>Estimate:</Text>
                      <Text style={styles.descriptionDetail}>{subTaskDetail.data.data.estimate}</Text>
                    </View>
                    <View style={styles.rowDetail}>
                        <Text style={[styles.descriptionDetail, {width:100}]}>Reporter:</Text>
                        <Text style={styles.descriptionDetail}>{subTaskDetail.data.data.reporter}</Text>
                    </View>
                </View>
            )
        }
    }
    return (
        <View style={[styles.container]}>
            <View style={styles.wrapper}>
                <Buttons text={"X"} style={styles.buttonClose}></Buttons>
                <Text style={styles.title}>
                    {subTaskDetail.data.data.subTaskName}
                </Text>
                <Picker
                    style={styles.picker}
                    mode={"dropdown"}
                    selectedValue={selected}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelected(itemValue)
                    }>
                    <Picker.Item label="To Do" value="TODO" />
                    <Picker.Item label="In progress" value="INPROGRESS" />
                    <Picker.Item label="Done" value="DONE" />
                </Picker>
                <Text style={styles.description}>Description</Text>
                <Text style={styles.descriptionDetail}>
                    {subTaskDetail.data.data.description}
                </Text>
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
                    <Buttons style={styles.button} text={"All"}/>
                    <Buttons style={styles.button} text={"Comments"}/>
                    <Buttons style={styles.button} text={"History"}/>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "black",
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
export default SubTaskDetailComponent;