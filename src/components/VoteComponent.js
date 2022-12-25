import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {faCaretUp} from "@fortawesome/free-solid-svg-icons/faCaretUp";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TouchableOpacity} from "react-native-web";
function VoteComponent({onPressUp,onPressDown,votes, size,style,status,statusClose}) {
const checkStatusUp=(status)=>{
    if(status==="LIKED"){
        return "#F48225"
    }else {
        return "#BABFC4";
    }
}
    const checkStatusDown=(status)=>{
        if(status==="DISLIKED"){
            return "#F48225"
        }else {
            return "#BABFC4";
        }
    }
    return (
        <View style={[styles.container,style]}>
            {statusClose!=="CLOSE"&&<TouchableOpacity onPress={onPressUp}>
                <FontAwesomeIcon icon={faCaretUp} size={size} color={checkStatusUp(status)}/>
            </TouchableOpacity>}
            <Text style={styles.text}>{votes}</Text>
            {statusClose!=="CLOSE"&&<TouchableOpacity onPress={onPressDown}>
                <FontAwesomeIcon icon={faCaretDown} size={size} color={checkStatusDown(status)}/>
            </TouchableOpacity>}

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