import {View, Text, StyleSheet} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import React, {useState} from "react";
function Upload({navigation}) {
    const [title, setTitle] = useState("")
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <Text style={styles.text}>Add a CV File</Text>
                <AddComponent title={"Title"}
                              multiline={false}
                              style={{width: "97%"}}
                              text={title} onChangeText={title => setTitle(title)}/>
                <Buttons text={"Add CV File"} style={styles.button} />
                <Buttons text={"Save"} style={styles.button} onPressTo={()=> {navigation.push("MyCV")}}/>
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
export default Upload;