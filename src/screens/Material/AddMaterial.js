
import {View, Text, StyleSheet} from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import React, {useState} from "react";
import LabNavigator from "../../navigations/LabNavigator";
function AddMaterial({navigation}) {
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [note, setNote] = useState("")
    return (
        <View style={styles.container}>
            <LabNavigator navigation={navigation}/>
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
                <View style={styles.row}>
                    <Buttons text={"Add Material"} style={styles.button} onPressTo={()=> {navigation.push("ListMaterial")}}/>
                    <Buttons text={"Cancel"} style={styles.button} onPressTo={()=> {navigation.goBack(navigation)}}/>
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
    row:{
        flexDirection:"row",
    }
});
export default AddMaterial;