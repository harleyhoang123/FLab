import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Buttons from "./Buttons";
import {useDispatch} from "react-redux";
import {Picker} from "@react-native-picker/picker";

function SubTaskComponent({ subTaskId,subTaskName,estimate,status,assignee,callbackSubTaskDetail}) {
    const [selected, setSelected] = useState(status);
    const [image, setImage] = useState("");

    const getImage=()=>{
        if(assignee==null){
            return "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png";
        }else {
            return assignee.userInfo.avatar;
        }
    }

    return (
        <View style={styles.containerContent}>
            <View style={styles.sprint}>
                <TouchableOpacity onPress={()=> callbackSubTaskDetail(subTaskId)}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{subTaskName}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.view1}>
                                <Text style={styles.text1}>{estimate}</Text>
                            </View>

                            <TouchableOpacity>
                                <Image
                                    style={styles.userImage}
                                    source={{
                                        uri: getImage,
                                    }}
                                />
                            </TouchableOpacity>
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
    picker:{
        width:100,
        height:30,
        borderRadius:8,
    },
});
export default SubTaskComponent;