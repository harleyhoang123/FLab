import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import MaterialItem from "../../components/MaterialItem";
import LabNavigator from "../../navigations/LabNavigator";

const listNews =[{
    title: "Laptop 1",
    status:"Free"
},
    {
        title: "Iphone",
        status:"Free"
    },
    {
        title: "Ipad",
        status:"Free"
    },
    {
        title: "PC",
        status:"Busy"
    },
]
function ListMaterial({navigation}) {
    const [text, setText] = useState('');
    return (
        <View>
            <LabNavigator navigation={navigation}/>
            <View style ={styles.container}>
                <View>
                    <Text style ={styles.text}>List Materials</Text>
                </View>
                <View style ={styles.containerSearch}>
                    <TextField text={text} onChangeText={newText => setText(newText)}
                               placeholder={" Search"}
                               secureTextEntry={false}
                               multiline={false}/>
                    <Buttons text={"Search"} />
                    <Buttons text={"Order Material"} style={[styles.button,{marginLeft:20}]} onPressTo={()=> navigation.push("OrderMaterial")}/>
                    <Buttons text={"Add Material"} style={[styles.button,{marginLeft:20}]} onPressTo={()=> navigation.push("AddMaterial")}/>
                </View>
            </View>
            <FlatList
                data={listNews}
                renderItem={({ item }) => (
                    <MaterialItem navigation={navigation} title={item.title} status={item.status} />
                )}
            />
            <View style={styles.containerButton}>
                <Buttons text={"Load more"} style={styles.button} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    containerSearch:{
        flexDirection:"row",
        alignItems:"center",
        marginRight:100,
    },
    text:{
        fontSize:25,
        fontWeight:"bold",
        marginLeft:150,
        marginTop:10,
        marginBottom:20,
    },
    containerButton:{
        alignItems:"center",
        justifyContent:"center",
    },
    button:{
        width:180
    },
});
export default ListMaterial;