import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Buttons from "./Buttons";
function SprintComponent({}) {
    return (
        <View style={ styles.container}>
            <View style={styles.sprint}>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.textSprint}>Sprint 1</Text>
                        <Text style={styles.text} >time</Text>
                        <Text style={styles.text}> (7 issues)</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.view1}>
                <Text style={styles.text1}>0</Text>
            </View>
            <View style={styles.view2}>
                <Text style={styles.text2}>1</Text>
            </View>
            <View style={styles.view3}>
                <Text style={styles.text3}>2</Text>
            </View>
            <Buttons text={"Complete sprint"} style={styles.btn}/>
            <Buttons text={"..."} style={styles.button}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width:"60%",
        flexDirection:"row",
        backgroundColor:'white',
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
    },
    row:{
        flexDirection:"row",
    },
    sprint:{
        height:50,
        flex:10,
        borderWidth:1,
        borderRadius:2,
        justifyContent:"center",
    },
    view1:{
        margin:10,
        width:20,
        borderRadius:5,
        backgroundColor:'#DFE1E6',
        justifyContent:"center",
        alignItems:"center",
    },
    view2:{
        margin:10,
        width:20,
        borderRadius:5,
        backgroundColor:'#0052CC',
        justifyContent:"center",
        alignItems:"center",
    },
    view3:{
        margin:10,
        width:20,
        borderRadius:5,
        backgroundColor:'#00875A',
        justifyContent:"center",
        alignItems:"center",
    },
    text1:{
        color:'black',
        fontSize:20,
    },
    text2:{
        color:'white',
        fontSize:20,
    },
    text3:{
        color:'white',
        fontSize:20,
    },
    btn:{
        margin:10,
        width:200,
        height:40,
    },
    button:{
        margin:10,
        width:60,
        height:40,
    },
    textSprint:{
        marginRight:20,
        marginLeft:20,
        fontSize:20,
        fontWeight:"bold",
    },
    text:{
        marginRight:20,
        fontSize:20,
    },
});
export default SprintComponent;