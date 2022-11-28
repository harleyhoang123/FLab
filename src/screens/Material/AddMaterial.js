
import {View, Text, StyleSheet} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import React, {useState} from "react";
function AddMaterial({navigation}) {
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [note, setNote] = useState("")
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <Text style={styles.text}>Add a Material</Text>
                <AddComponent title={"Title"}
                              multiline={false}
                              style={{width: "97%"}}
                              text={title} onChangeText={title => setTitle(title)}/>
                <AddComponent title={"Amount"}
                              multiline={false}
                              style={{width: "30%"}}
                              text={amount} onChangeText={amount => setAmount(amount)}/>
                <AddComponent title={"Description"}
                              multiline={true}
                              style={{width: "97%", height:200}}
                              text={description} onChangeText={description => setDescription(description)}/>
                <AddComponent title={"Note"}
                              multiline={true}
                              style={{width: "97%", height:200}}
                              text={note} onChangeText={note => setNote(note)}/>
                <Buttons text={"Add Image"} style={styles.button} />
                <Buttons text={"Post Material"} style={styles.button} onPressTo={()=> {navigation.push("ListMaterial")}}/>
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
export default AddMaterial;