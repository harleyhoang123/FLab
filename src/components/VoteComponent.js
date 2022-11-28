import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {faCaretUp} from "@fortawesome/free-solid-svg-icons/faCaretUp";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TouchableOpacity} from "react-native-web";
function VoteComponent({onPressTo,votes}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressTo}>
                <FontAwesomeIcon icon={faCaretUp} size={"4x"} style={styles.button}/>
            </TouchableOpacity>
            <Text style={styles.text}>{votes}</Text>
            <TouchableOpacity onPress={onPressTo}>
                <FontAwesomeIcon icon={faCaretDown} size={"4x"} style={styles.button}/>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginRight:30,
    },
    text:{
        fontSize:25,
        alignSelf:"center"
    },
});
export default VoteComponent;