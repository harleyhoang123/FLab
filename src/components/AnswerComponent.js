import React, {useState} from "react";
import CommentItem from "./CommentItem";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import TextField from "./TextField";
import Buttons from "./Buttons";
import Separator from "./Separator";
import VoteComponent from "./VoteComponent";
import {
    acceptAnswer,
    addCommentToAnswer,
    deleteAnswer,
    editAnswer,
    getAnswerDetail,
    voteAnswer,
} from "../networking/CustomNetworkService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserAnswer from "./UserAnswer";
import AsyncStorage from "@react-native-community/async-storage";

const getUserAccount = async () => {
    try {
        return await AsyncStorage.getItem("@userAccount");
    } catch (e) {
        console.log("Can't get username: " + e);
    }
};
const getRoles = async () => {
    try {
        return await AsyncStorage.getItem("@roles");
    } catch (e) {
        console.log("Can't get roles: " + e);
    }
};

function AnswerComponent({
                             questionId,
                             answerId,
                             votes,
                             createdBy,
                             content,
                             createdDate,
                             userAnswerComment,
                             authorQuestion,
                             status,
                             callbackAnswer,
                             votedStatus,
                             statusClose,
                             navigation,
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
    const [voted, setVoted] = useState(votedStatus);
    const [userAccount, setUserAccount] = useState("");
    const [roles, setRoles] = useState([]);
    getRoles().then((v) => {
        setRoles(v)
    });
    getUserAccount().then((r) => {
        setUserAccount(r)
    });
    const checkCanEdit = (roles, userAccount, author, statusClose) => {
        if (statusClose === "CLOSE") {
            return false;
        } else {
            if (roles.includes("MANAGER") || roles.includes("ADMIN")) {
                return true;
            } else {
                return userAccount === author;
            }
        }
    }
    const checkCanDelete = (roles, userAccount, author, statusClose, vote, numberComment) => {
        console.log("DATA " + roles + " " + userAccount + " " + author + " " + statusClose + " " + vote + " " + numberComment)
        if (statusClose === "CLOSE") {
            return false;
        } else {
            if (vote !== 0 || numberComment !== 0) {
                return false
            } else {
                if (roles.includes("MANAGER") || roles.includes("ADMIN")) {
                    return true;
                } else {
                    return userAccount === author;
                }
            }
        }
    }

    function validateEdit(commentId, text) {
        if (!text) {
            setIsCommentEdit(true);
            isValid = false;
        }
        if (isValid) {
            handleEdit(commentId, text);
            setIsEdit(false);
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
        voteAnswer(answerId, status, navigation).then((r) =>
            getAnswerDetail(answerId, navigation).then((v) => {
                setVote(v.data.score);
                setVoted(v.data.votedStatus);
            })
        );
    };
    const handleDelete = () => {
        deleteAnswer(questionId, answerId, navigation).then(() => callbackAnswer());
    };
    const handleComment = () => {
        addCommentToAnswer(answerId, comment, navigation).then(() => {
            setComment("");
            callbackAnswer();
        });
    };
    const handleEdit = (commentId, text) => {
        editAnswer(commentId, text, navigation).then(() => {
            callbackAnswer();
            setIsEdit(!isEdit);
        });
    };
    const acceptAnAnswer = () => {
        acceptAnswer(questionId, answerId, navigation).then((v) =>
            callbackAnswer()
        );
    };
    const checkColor = (status) => {
        if (status === "ACCEPTED") {
            return "#6ECB64";
        } else {
            return "#BABFC4";
        }
    };
    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState(content);
    const [showConfirm, setShowConfirm] = useState(false);
    return (
        <View>
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
                    <VoteComponent
                        votes={vote}
                        size={"2x"}
                        style={{marginRight: 5}}
                        onPressUp={() => handleVote("LIKED")}
                        onPressDown={() => handleVote("DISLIKED")}
                        status={voted}
                        statusClose={statusClose}
                    />{userAccount === authorQuestion && <View><TouchableOpacity onPress={() => acceptAnAnswer()}>
                    <MaterialCommunityIcons
                        name={"check-bold"}
                        size={40}
                        color={checkColor(status)}
                    />
                </TouchableOpacity></View>}


                </View>
                <View style={{width: "95%"}}>
                    <UserAnswer info={createdBy}/>
                    <View style={{margin: 10}}>
                        <Text style={styles.text}>{content}</Text>
                    </View>
                    <View style={[styles.row, {marginLeft: 10}]}>
                        <Text style={styles.text}>{formatTime(createdDate)}</Text>
                        {checkCanEdit(roles, userAccount, createdBy.username, statusClose) &&
                            <View style={styles.login}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsEdit(true);
                                        setText(content);
                                    }}
                                >
                                    <Text style={styles.txt}>Edit</Text>
                                </TouchableOpacity>
                            </View>}
                        {checkCanDelete(roles, userAccount, createdBy.username, statusClose, vote, userAnswerComment.length) &&
                            <View style={styles.login}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowConfirm(true);
                                    }}
                                >
                                    <Text style={styles.txt}>Delete</Text>
                                </TouchableOpacity>
                            </View>}

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
                            author={item.createdBy.username}
                            content={item.content}
                            time={formatTime(item.createdDate)}
                            callBackComment={callbackAnswer}
                            navigation={navigation}
                            statusClose={statusClose}
                        />
                    </View>
                ))}
                {statusClose !== "CLOSE" && (
                    <View>
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
                            <Buttons text={"Comment"} onPressTo={validateComment}/>
                        </View>
                        {isComment && (
                            <Text style={styles.inputInvalid}>Invalid comment</Text>
                        )}
                    </View>
                )}
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
        justifyContent: "flex-start",
    },
    containerComment: {
        flexDirection: "row",
        alignItems: "center",
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
