import React, {useState} from 'react';
import * as DocumentPicker from "expo-document-picker";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import {StyleSheet, Text, View} from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import {uploadProfileCv} from "../../networking/CustomNetworkService";
import AsyncStorage from "@react-native-community/async-storage";
const getAccountId = async () => {
    try {
        const accountId = await AsyncStorage.getItem("@accountId");
        console.log("AccountId: " + accountId);
        return accountId;
    } catch (e) {
        console.log("Can't get account id: " + e);
    }
};
function UploadFileCV({navigation}) {
    const [cvName, setCvName] = useState("")
    const [description, setDescription] = useState("")
    const [profileId, setProfileId] = useState("")
    getAccountId().then(v=> setProfileId(v));
    const [file, setFile] = useState();
    const pickFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({type: 'application/pdf', multiple: false});
        console.log(result);
        if (!result.cancelled) {
            console.log("Picked: " + result);
            console.log("name: " + result.name);
            console.log("uri: " + result.uri);
            console.log("size: " + result.size);
            console.log("mimeType: " + result.mimeType);
            const filePicked = {
                name: result.name,
                base64: result.uri,
                size: result.size,
                mimeType: result.mimeType
            };
            setFile(filePicked);
        }
    };
    const uploadFileCV=()=>{
        uploadProfileCv(profileId,navigation,cvName,description,file).then()
    }
    return (
        <View >
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <Text style={styles.text}>Upload Your CV</Text>
                <AddComponent title={"CV Name"}
                              multiline={false}
                              style={{width: "97%"}}
                              text={cvName} onChangeText={cvName => setCvName(cvName)}/>
                <AddComponent title={"Description"}
                              multiline={true}
                              style={{width: "97%", height:200}}
                              text={description} onChangeText={description => setDescription(description)}/>
                {file &&<Text style={{marginLeft:30,fontSize: 20, backgroundColor:'white'}}>{file.name}</Text>}
                <Buttons text={"Choose A File"} style={styles.button} onPressTo={pickFile} />
                <View style={{flexDirection:"row"}}>
                    <Buttons text={"Upload"} style={[styles.button,{marginRight:30 }]} onPressTo={()=> uploadFileCV()}/>
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
        width:250,
    },
});
export default UploadFileCV;