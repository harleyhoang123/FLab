import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Buttons from "./Buttons";
import {useDispatch} from "react-redux";
import {getAllSprint} from "../actions/WorkSpaceAction";

function SubTaskComponent({navigation, projectId, subTaskId,sprintId,taskName,estimate,status,assignee}) {
    const dispatch = useDispatch();
    const goToBacklog = (projectId, subTaskId, sprintId) => {
        dispatch(getAllSprint(projectId,null,subTaskId,sprintId, navigation));
    };
    return (
        <View style={styles.containerContent}>
            <View style={styles.sprint}>
                <TouchableOpacity onPress={() => goToBacklog(projectId, subTaskId, sprintId)} >
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{taskName}</Text>
                            <Buttons text={"Edit"} style={styles.btn}></Buttons>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.view1}>
                                <Text style={styles.text1}>{estimate}</Text>
                            </View>

                            <TouchableOpacity>
                                <Image
                                    style={styles.userImage}
                                    source={{
                                        uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
                                    }}
                                />
                            </TouchableOpacity>
                            <Buttons text={"Done"} style={styles.btn}></Buttons>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {

        justifyContent:"space-between",
        flexDirection:"row",
    },
    containerContent: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor:'white',
        alignItems: "center",
        borderBottomWidth: 1,
    },
    row: {
        alignItems:"center",
        flexDirection: "row",
    },
    sprint: {
        flex: 10,
        justifyContent: "center",
        margin:2
    },
    btn: {
        margin: 5,
        width: 60,
        height: 30,
    },
    text: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
    },
    userImage:{
        width:30,
        height:30,
        borderRadius:15,
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
});
export default SubTaskComponent;