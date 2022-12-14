import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {
    deleteCommentInAnswer,
    deleteCommentInComment,
    deleteCommentInQuestion,
    editComment, editCommentNews
} from "../networking/CustomNetworkService";
import TextField from "./TextField";
import Buttons from "./Buttons";


function CommentItem({parentId, commentId, username, content, time,parentType, callBackComment}) {

    const handleDelete=() =>{
        if(parentType==="QUESTION"){
            deleteCommentInQuestion(parentId, commentId).then(()=>callBackComment())
        }else  if(parentType==="ANSWER"){
            deleteCommentInAnswer(parentId, commentId).then(()=>callBackComment())
        }else  if(parentType==="NEWS"){
            deleteCommentInComment(parentId, commentId).then(()=>callBackComment())
        }

    }
    const handleEdit=()=>{
        if(parentType==="NEWS"){
            editCommentNews(commentId,text).then(()=> callBackComment())
        }else{
            editComment(commentId,text).then(()=> callBackComment())
        }

    }
    const [isEdit,setIsEdit]=useState(false);
    const [text, setText]=useState(content)
    const isEditComment =(isEdit)=>{
        if (isEdit){
            return(
                <View style={styles.containerComment}>
                    <TextField text={text} onChangeText={text=>setText(text)}
                               placeholder={" Edit Comment"}
                               secureTextEntry={false}
                               multiline={false}
                               onSubmitEditing={()=>{handleEdit(); setText("");setIsEdit(!isEdit)}}
                               style={[styles.comment]}/>
                    <Buttons text={"Save"} onPressTo={()=>{handleEdit(); setText("");setIsEdit(!isEdit)} } style={styles.button}/>
                    <Buttons text={"Cancel"} onPressTo={()=>{setIsEdit(!isEdit)} } style={styles.button}/>
                </View>
            )
        }else{
            return (
                <Text style={styles.text}>{content}</Text>
            )
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.containerComment}>
                    <Text style={styles.textUsername}>{username}</Text>
                    {isEditComment(isEdit)}
                </View>
                <View style={styles.containerComment}>
                    <Text style={styles.text}>{time}</Text>

                    <View style={styles.login}>
                        <TouchableOpacity onPress={()=> setIsEdit(!isEdit)}>
                            <Text style={styles.txt}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.login}>
                        <TouchableOpacity onPress={handleDelete}>
                            <Text style={styles.txt}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            margin: 10,
            backgroundColor: 'white',
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
        },
        containerComment: {
            flexDirection: "row",
            alignItems: "center",
        },
        textUsername: {
            fontWeight: "bold",
            marginRight: 20,
            fontSize: 15,
        },
        text: {
            fontSize: 15,
        },
        login: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginLeft: 10,
        },
        txt: {
            fontWeight: "bold",
            borderBottomWidth: 1,
            fontSize: 15,
        },
        comment: {
            width: 400,
            height: 40,
        },
        button: {
            width: 100,
            height: 40,
            marginLeft:20,
        },
    }
);
export default CommentItem;