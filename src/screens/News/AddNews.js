import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import TextEditorComponent from "../../components/TextEditorComponent";
import TextField from "../../components/TextField";
function AddNews({navigation}) {

    const [content, setContent] = useState("")
    const [text, setText] = useState("")
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <Text style={styles.text}>Create a News</Text>
                <AddComponent title={"Title"}
                              multiline={false}
                              style={{width: "97%"}}
                text={text} onChangeText={text => setText(text)}/>
                <AddComponent title={"News Detail"}
                              multiline={false}
                              style={{width: "97%",height:300}}
                              text={content} onChangeText={text => setContent(text)}></AddComponent>
                <Buttons text={"Add Image"} style={styles.button} />
                <View style={styles.row}>
                    <Buttons text={"Post News"} style={styles.button} onPressTo={()=> {navigation.push("ListNews")}}/>
                    <Buttons text={"Back"} style={styles.button} onPressTo={()=> {navigation.goBack(navigation)}}/>
                </View>\
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerContent:{
        width:"80%",
        alignSelf:"center",
        marginTop:20,
        flex:1,
    },
    text:{
        fontSize:30,
        fontWeight:"bold",
        margin:30,
    },
    button:{
        margin:30,
        width:200,
    },
    row:{
        flexDirection:"row"
    },
});
export default AddNews;