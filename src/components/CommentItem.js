import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import {
    deleteCommentInAnswer,
    deleteCommentInComment,
    deleteCommentInQuestion,
    editComment,
    editCommentNews,
} from "../networking/CustomNetworkService";
import TextField from "./TextField";
import Buttons from "./Buttons";

function CommentItem({
                         parentId,
                         commentId,
                         username,
                         content,
                         time,
                         parentType,
                         callBackComment,
                         navigation,
                         statusClose,
                     }) {
    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState(content);
    const [isComment, setIsComment] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    let isValid = true;

    function validateComment() {
        if (!text) {
            setIsComment(true);
            isValid = false;
        }
        if (isValid) {
            handleEdit();
            setIsEdit(false);
        }
    }

    const handleDelete = () => {
        if (parentType === "QUESTION") {
            deleteCommentInQuestion(parentId, commentId, navigation).then(() =>
                callBackComment()
            );
        } else if (parentType === "ANSWER") {
            deleteCommentInAnswer(parentId, commentId, navigation).then(() =>
                callBackComment()
            );
        } else if (parentType === "NEWS") {
            deleteCommentInComment(parentId, commentId, navigation).then(() =>
                callBackComment()
            );
        }
    };
    const handleEdit = () => {
        if (parentType === "NEWS") {
            editCommentNews(commentId, text, navigation).then(() => {
                callBackComment();
                setIsEdit(!isEdit);
            });
        } else {
            editComment(commentId, text).then(() => {
                callBackComment();
                setIsEdit(!isEdit);
            });
        }
    };

    return (
        <View style={styles.container}>
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
                            Do you want to delete this comment?
                        </Text>
                        <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                            <Buttons
                                text={"Delete"}
                                style={{marginRight: 40}}
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
                            placeholder={" Edit Comment"}
                            secureTextEntry={false}
                            multiline={true}
                            onSubmitEditing={() => {
                                validateComment();
                                setText("");
                            }}
                            style={{height: 150, width: "95%"}}
                        />
                        {isComment && (
                            <Text style={styles.inputInvalid}>Invalid comment</Text>
                        )}
                        <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                            <Buttons
                                text={"Save"}
                                onPressTo={() => {
                                    validateComment();
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
            <View style={{width: "95%"}}>
                <Text style={styles.text}>
                    <Text style={styles.textUsername}>{username}</Text> {content}
                </Text>
            </View>
            <View style={styles.containerComment}>
                <Text style={styles.text}>{time}</Text>
                {statusClose !== "CLOSE" &&
                    <View><View style={styles.login}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsEdit(true);
                                setText(content);
                            }}
                        >

                            <Text style={styles.txt}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={styles.login}>
                            <TouchableOpacity onPress={() => setShowConfirm(true)}>
                                <Text style={styles.txt}>Delete</Text>
                            </TouchableOpacity>
                        </View></View>
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: "white",
    },
    containerComment: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputInvalid: {
        marginLeft: 15,
        marginBottom: 15,
        color: "red",
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
        alignItems: "flex-start",
        justifyContent: "center",
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
        marginLeft: 20,
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
        padding: 50,
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
export default CommentItem;
