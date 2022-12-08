import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Buttons from "./Buttons";
import {useDispatch} from "react-redux";
import {Picker} from "@react-native-picker/picker";

function SubTaskComponent({subTaskId, subTaskName, estimate, status, assignee, callbackSubTaskDetail}) {
    const [subTaskNameDetail, setSubTaskNameDetail] = useState(subTaskName);
    const [estimateDetail, setEstimateDetail] = useState(estimate);
    const [statusDetail, setStatusDetail] = useState(status);
    const [assigneeDetail, setAssigneeDetail] = useState(assignee);

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
                <TouchableOpacity onPress={() => callbackSubTaskDetail(subTaskId)}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{subTaskNameDetail}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.view1,{width: 20}]}>
                                <Text style={styles.text1}>{estimateDetail}</Text>
                            </View>
                            <TouchableOpacity>
                                <Image
                                    style={styles.userImage}
                                    source={{
                                        uri: getImage(assigneeDetail),
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={styles.view1}>
                                <Text style={styles.text}>
                                    {getStatus(statusDetail)}
                                </Text>
                            </View >
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
        borderBottomWidth: 1,
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
    text: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
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
export default SubTaskComponent;