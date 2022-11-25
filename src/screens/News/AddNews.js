import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import TextEditorComponent from "../../components/TextEditorComponent";
function AddNews({navigation}) {

    const [editorState, setEditorState] = useState("")
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <Text style={styles.text}>Create a News</Text>
                <AddComponent title={"Title"}
                              multiline={false}
                              style={{width: "97%"}}/>
                <TextEditorComponent title={"News Detail"} editorState={editorState} setEditorState={editorState => setEditorState(editorState)}></TextEditorComponent>
                <Buttons text={"Add Image"} style={styles.button} />
                <Buttons text={"Post News"} style={styles.button} onPressTo={()=> {console.log(editorState.toString())}}/>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerContent:{
        flex:0.65,
        paddingLeft:300,
        marginRight:300,
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
export default AddNews;