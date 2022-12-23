import React, {useState} from "react";
import CommentItem from "./CommentItem";
import {Modal, StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent, View} from "react-native";
import TextField from "./TextField";
import Buttons from "./Buttons";
import Separator from "./Separator";
import VoteComponent from "./VoteComponent";
import {
    acceptAnswer,
    addCommentToAnswer,
    deleteAnswer,
    editAnswer, getAnswerDetail, voteAnswer, voteQuestion,
} from "../networking/CustomNetworkService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserInfoComponent from "./UserInfoComponent";
import UserAnswer from "./UserAnswer";

function AnswerComponent({
                             questionId,
                             answerId,
                             votes,
                             createdBy,
                             content,
                             createdDate,
                             userAnswerComment,
                             status,
                             callbackAnswer,
                         }) {
    const formatTime = (date) => {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        return d.getDate() + "/" + month + "/" + d.getFullYear();
    };
    const [comment, setComment] = useState("");
    let isValid = true;
    const [isCommentEdit, setIsCommentEdit] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [vote, setVote] = useState(votes);

    function validateEdit(commentId, text) {
        if (!text) {
            setIsCommentEdit(true);
            isValid = false;
        }
        if (isValid) {
            handleEdit(commentId, text);
            setIsEdit(false)
        }
    }

    function validateComment() {
        if (!comment) {
            setIsComment(true);
            isValid = false;
        }
        if (isValid) {
            handleComment();
        }
    }

    const handleVote = (status) => {
        voteAnswer(answerId, status).then(r => getAnswerDetail(answerId).then(v => {
            setVote(v.data.score)
        }))
    }
    const handleDelete = () => {
        deleteAnswer(questionId, answerId).then(() => callbackAnswer());
    };
    const handleComment = () => {
        addCommentToAnswer(answerId, comment).then(() => {
            setComment("");
            callbackAnswer();
        });
    };
    const handleEdit = (commentId, text) => {
        editAnswer(commentId, text).then(() => {
            callbackAnswer();
            setIsEdit(!isEdit);
        });
    };
    const acceptAnAnswer = () => {
        acceptAnswer(questionId, answerId).then(v => callbackAnswer());
    }
    const checkColor = (status) => {
        if (status === "ACCEPTED") {
            return "#6ECB64"
        } else {
            return "#BABFC4"
        }
    }
    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState(content);
    const [showConfirm, setShowConfirm] = useState(false);
    return (
        <View s>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showConfirm}
                onRequestClose={() => {
                    setShowConfirm(false);
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.modalProfileView}>
                        <Text
                            style={{fontSize: 20, fontWeight: "bold", marginBottom: 20}}
                        >
                            Do you want to delete this answer?
                        </Text>
                        <View style={{flexDirection: "row"}}>
                            <Buttons
                                text={"Delete"}
                                style={{marginRight: 20}}
                                onPressTo={() => {
                                    handleDelete();
                                    setShowConfirm(false);
                                }}
                            />
                            <Buttons
                                text={"Cancel"}
                                style={{backgroundColor: "#F4F5F7"}}
                                styleText={{color: "black"}}
                                onPressTo={() => setShowConfirm(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isEdit}
                onRequestClose={() => {
                    setIsEdit(false);
                }}
            >
                <View style={styles.modalEdit}>
                    <View style={styles.modalEditView}>
                        <TextField
                            text={text}
                            onChangeText={(text) => setText(text)}
                            placeholder={" Edit Answer"}
                            secureTextEntry={false}
                            multiline={true}
                            onSubmitEditing={() => {
                                validateEdit(answerId, text);
                                setText("");
                            }}
                            style={{height: 150, width: "95%"}}
                        />
                        {isCommentEdit && (
                            <Text style={styles.inputInvalid}>Invalid comment</Text>
                        )}
                        <View style={{flexDirection: "row"}}>
                            <Buttons
                                text={"Save"}
                                onPressTo={() => {
                                    validateEdit(answerId, text);
                                    setText("");
                                }}
                                style={{marginLeft: 20}}
                            />
                            <Buttons
                                text={"Cancel"}
                                style={{backgroundColor: "#F4F5F7", marginLeft: 20}}
                                styleText={{color: "black"}}
                                onPressTo={() => setIsEdit(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.row}>
                <View>
                    <VoteComponent votes={vote} size={"2x"} style={{marginRight: 5}}
                                   onPressUp={() => handleVote("LIKED")}
                                   onPressDown={() => handleVote("DISLIKED")}
                    />
                    <TouchableOpacity onPress={() => acceptAnAnswer()}>
                        <MaterialCommunityIcons name={"check-bold"} size={40} color={checkColor(status)}/>
                    </TouchableOpacity>
                </View>
                <View style={{width:"95%"}}>
                    <UserAnswer info={createdBy}/>
                    <View style={{margin: 10}}>
                        <Text style={styles.text}>{content}</Text>
                    </View>
                    <View style={[styles.row,{marginLeft:10}]}>
                        <Text style={styles.text}>{formatTime(createdDate)}</Text>
                        <View style={styles.login}>
                            <TouchableOpacity onPress={() => {
                                setIsEdit(true);
                                setText(content)
                            }}>
                                <Text style={styles.txt}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.login}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowConfirm(true);
                                }}
                            >
                                <Text style={styles.txt}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginLeft: "5%"}}>
                {userAnswerComment?.map((item) => (
                    <View key={item.commentId}>
                        <CommentItem
                            parentId={answerId}
                            parentType={"ANSWER"}
                            commentId={item.commentId}
                            username={item.createdBy.fullName}
                            content={item.content}
                            time={formatTime(item.createdDate)}
                            callBackComment={callbackAnswer}
                        />
                    </View>
                ))}
                <View style={styles.containerComment}>
                    <TextField
                        style={[styles.comment]}
                        text={comment}
                        onChangeText={(comment) => setComment(comment)}
                        placeholder={" Comment Here"}
                        secureTextEntry={false}
                        multiline={false}
                        onSubmitEditing={validateComment}

                    />
                    <Buttons
                        text={"Comment"}
                        onPressTo={validateComment}
                    />
                </View>
                {isComment && <Text style={styles.inputInvalid}>Invalid comment</Text>}
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
    inputInvalid: {
        marginLeft: 15,
        marginBottom: 15,
        color: "red",
    },

    comment2: {
        width: 400,
        height: 40,
    },
    button2: {
        width: 100,
        height: 40,
        marginLeft: 20,
    },
    row: {
        flexDirection: "row",
    },
    container: {
        margin: 10,
        backgroundColor: "white",
        justifyContent: "flex-start"
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
        marginLeft: 10,
    },
    txt: {
        fontWeight: "bold",
        borderBottomWidth: 1,
        fontSize: 15,
    },
    modal: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    modalProfileView: {
        width: "30%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        padding: 30,
    },
    modalEdit: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    modalEditView: {
        width: "50%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        padding: 30,
    },
});
export default AnswerComponent;
