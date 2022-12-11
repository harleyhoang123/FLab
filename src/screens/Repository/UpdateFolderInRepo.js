import React, {useState} from 'react';
import HomeTopNavigator from "../../navigations/HomeNavigation";
import {StyleSheet, Text, View} from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import {updateFolderInRepo} from "../../actions/RepositoryAction";
function UpdateFolderInRepo({route, navigation}) {
    const repoId= route.params.repoId;
    const folderId= route.params.folderId;
    const [folderName, setFolderName] = useState(route.params.folderName);
    const [description, setDescription] = useState(route.params.description);
    const dispatch = useDispatch();
    const handleUpdate=(repositoryId, folderId,folderName,description, navigation)=>{
        dispatch(updateFolderInRepo(repositoryId, folderId,folderName,description, navigation));
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
                    <Buttons text={"Update"} style={[styles.button,{marginRight:30 }]} onPressTo={()=> handleUpdate(repoId,folderId,folderName,description,navigation)}/>
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
export default UpdateFolderInRepo;