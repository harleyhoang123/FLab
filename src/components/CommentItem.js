import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useDispatch} from "react-redux";
import {deleteComment} from "../actions/ForumAction";


function CommentItem({commentId, username, content, time,questionId, navigation}) {

    const dispatch= useDispatch();
    const handleDelete=() =>{
        dispatch(deleteComment(commentId,questionId, navigation));
    }
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.containerComment}>
                    <Text style={styles.textUsername}>{username}</Text>
                    <Text style={styles.text}>{content}</Text>
                </View>
                <View style={styles.containerComment}>
                    <Text style={styles.text}>{time}</Text>
                    <View style={styles.login}>
                        <TouchableOpacity>
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
    }
);
export default CommentItem;