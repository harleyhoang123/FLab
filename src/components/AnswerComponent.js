import React, {useState} from 'react';
import CommentItem from "./CommentItem";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TextField from "./TextField";
import Buttons from "./Buttons";
import Separator from "./Separator";
import VoteComponent from "./VoteComponent";
import {deleteAnswer, postCommentToAnswer} from "../actions/ForumAction";
import {useDispatch} from "react-redux";

function AnswerComponent({answerId, votes, createdBy, content, createdDate, userAnswerComment,questionId, navigation}) {
    const formatTime = (date) => {
        const d = new Date(date);
        return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    }
    const dispatch= useDispatch();
    const [userComment, setUserComment] = useState(userAnswerComment);

    const [answerComment, setAnswerComment] = useState('');
    const handleDelete = () => {
        dispatch(deleteAnswer(answerId,questionId,navigation));
    };
    const handleComment = () => {
        setUserComment([...userComment, answerComment]);
        dispatch(postCommentToAnswer(answerComment,answerId,questionId,navigation));
        setAnswerComment('');
    };

    return (
        <View>
            <View style={styles.row}>
                <VoteComponent votes={votes} size={"2x"} style={{marginRight: 5}}/>
                <View style={styles.container}>
                    <View>
                    <View style={styles.containerComment}>
                        <Text style={styles.textUsername}>{createdBy}</Text>
                        <Text style={styles.text}>{content}</Text>
                    </View>
                    <View style={styles.containerComment}>
                        <Text style={styles.text}>{formatTime(createdDate)}</Text>
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
            </View>
            <View style={{marginLeft:"5%"}}>
                {userAnswerComment?.map((item) => (
                    <View key={item.commentId}>
                        <CommentItem questionId={questionId} navigation={navigation} commentId={item.commentId} username={item.createdBy.fullName} content={item.content}
                                     time={formatTime(item.createdDate)}/>
                    </View>
                ))
                }
                <View style={styles.containerComment}>
                    <TextField text={answerComment} onChangeText={newText => setAnswerComment(newText)}
                               placeholder={" Comment Here"}
                               secureTextEntry={false}
                               multiline={true}
                               style={[styles.comment]}/>
                    <Buttons text={"Comment"} onPressTo={handleComment} style={styles.button}/>
                </View>
            </View>

            <Separator/>
        </View>

    );
}

const styles = StyleSheet.create({
    comment: {
        width: "95%",
        height: 50,
    },
    button: {
        width: 200,
    },
    containerComment: {
        flexDirection: "row",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
    },
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
});
export default AnswerComponent;