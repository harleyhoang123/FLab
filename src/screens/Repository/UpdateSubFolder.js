import React, {useState} from 'react';
import ProjectNavigator from "../../navigations/ProjectNavigator";
import {StyleSheet, Text, View} from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import {useDispatch} from "react-redux";
import {updateSubFolder} from "../../actions/RepositoryAction";

function UpdateSubFolder({route,navigation}) {
    const parentFolderName = route.params.parentFolderName;
    const parentFolderId = route.params.parentFolderId;
    const folderId= route.params.folderId
    const [folderName, setFolderName] = useState(route.params.folderName);
    const [description, setDescription] = useState(route.params.description);
    console.log("folderId in UpdateSubFolder "+ folderId);
    const dispatch = useDispatch();
    const handleUpdateSubFolder=(parentFolderName, parentFolderId, folderId,folderName,description, navigation)=>{
        dispatch(updateSubFolder(parentFolderName, parentFolderId, folderId,folderName,description, navigation))
    }

    return (
        <View style={styles.container}>
            <ProjectNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <Text style={styles.text}>Update Folder</Text>
                <AddComponent title={"Folder Name"}
                              multiline={false}
                              style={{width: "97%"}}
                              text={folderName} onChangeText={folderName => setFolderName(folderName)}/>
                <AddComponent title={"Description"}
                              multiline={false}
                              style={{width: "97%"}}
                              text={description} onChangeText={description => setDescription(description)}/>
                <View style={{flexDirection:"row"}}>
                    <Buttons text={"Update"} style={[styles.button,{marginRight:30 }]} onPressTo={()=> handleUpdateSubFolder(parentFolderName, parentFolderId, folderId,folderName,description, navigation)}/>
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
export default UpdateSubFolder;