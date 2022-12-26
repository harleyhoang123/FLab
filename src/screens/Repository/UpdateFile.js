import React, {useState} from 'react';
import ProjectNavigator from "../../navigations/ProjectNavigator";
import {StyleSheet, Text, View} from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import {useDispatch} from "react-redux";
import {updateFileInFolder} from "../../actions/RepositoryAction";

function UpdateFile({route, navigation}) {
    const parentFolderName = route.params.parentFolderName;
    const parentFolderId = route.params.parentFolderId;
    const fileId= route.params.fileId;
    const type= route.params.type;
    const [fileName, setFileName] = useState(route.params.fileName);
    const [description, setDescription] = useState(route.params.description);
    const dispatch = useDispatch();
    console.log("FileId in UpdateFile "+ fileId);
    const handleUpdateFileInFolder=(parentFolderName, parentFolderId, fileId,fileName,description, navigation)=>{
        dispatch(updateFileInFolder(parentFolderName, parentFolderId, fileId,fileName,description, navigation))
    }
    return (
        <View style={styles.container}>
            <ProjectNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <Text style={styles.text}>Update File</Text>
                <AddComponent title={"File Name"}
                              multiline={false}
                              style={{width: "97%"}}
                              text={fileName} onChangeText={fileName => setFileName(fileName)}/>
                <AddComponent title={"Description"}
                              multiline={false}
                              style={{width: "97%"}}
                              text={description} onChangeText={description => setDescription(description)}/>
                <View style={{flexDirection:"row"}}>
                    <Buttons text={"Update"} style={[styles.button,{marginRight:30 }]} onPressTo={()=> handleUpdateFileInFolder(parentFolderName, parentFolderId, fileId,fileName,description, navigation)}/>
                    <Buttons text={"Cancel"} style={styles.button} onPressTo={()=> navigation.goBack(null)}/>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerContent:{
        alignSelf:"center",
        width:"70%",
        backgroundColor: "white",
        flex: 1,
    },
    text:{
        fontSize:30,
        fontWeight:"bold",
        margin:30,
    },
    button:{
        margin:30,
        width:180,
    },
});
export default UpdateFile;