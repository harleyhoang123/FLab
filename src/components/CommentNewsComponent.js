import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CommentItem from "./CommentItem";
import TextField from "./TextField";
import Buttons from "./Buttons";
import Separator from "./Separator";
import {commentToComment, deleteCommentInNews, editCommentNews} from "../networking/CustomNetworkService";

function CommentNewsComponent({newsId, commentId, username, content, createdDate, listSubComment,callBackCommentNews}) {
    const formatTime = (date) => {
        const d = new Date(date);
        const month= d.getMonth()+1;
        return d.getDate() + "/" + month + "/" + d.getFullYear();
    }
    const [comment, setComment] = useState("");
    const [isEdit,setIsEdit]=useState(false);
    const [text, setText]=useState(content)
    const [showConfirm,setShowConfirm]=useState(false);
    const handleComment = () => {
        commentToComment(commentId,comment).then(()=> callBackCommentNews())
    };
    const handleEdit = () => {
        editCommentNews(commentId,text).then(()=> callBackCommentNews())
    };
    const handleDelete = () => {
        deleteCommentInNews(newsId,commentId).then(()=> callBackCommentNews())
    };
    const isEditComment =(isEdit)=>{
        if (isEdit){
            return(
                <View>
                    <View style={styles.containerComment}>
                        <TextField text={text} onChangeText={text=>setText(text)}
                                   placeholder={" Edit Answer"}
                                   secureTextEntry={false}
                                   multiline={true}
                                   onSubmitEditing={()=>{handleEdit(); setText("");setIsEdit(!isEdit)} }
                                   style={[styles.comment2]}/>
                        <Buttons text={"Save"} onPressTo={()=>{handleEdit(); setText("");setIsEdit(!isEdit)} } style={styles.button2}/>
                        <Buttons text={"Cancel"} onPressTo={()=>{setIsEdit(!isEdit)} } style={styles.button2}/>
                    </View>
                </View>

            )
        }else{
            return (
                <Text style={styles.text}>{content}</Text>
            )
        }
    }
    return (
        <View>
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showConfirm}
                    onRequestClose={() => {
                        setShowConfirm(false);
                    }}>
                    <View style={styles.modalDelete}>
                        <View style={styles.modalDeleteView}>
                            <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 20}}>Do you want to delete this comment?</Text>
                            <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                                <Buttons text={"Delete"} style={{marginRight: 40}} onPressTo={() => {
                                    handleDelete()
                                    setShowConfirm(false)
                                }}/>
                                <Buttons text={"Cancel"} style={{backgroundColor: '#F4F5F7'}} styleText={{color: 'black'}}
                                         onPressTo={() => setShowConfirm(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View>
                    <View style={styles.containerComment}>
                        <Text style={styles.textUsername}>{username}</Text>
                        {isEditComment(isEdit)}
                    </View>
                    <View style={styles.containerComment}>
                        <Text style={styles.text}>{createdDate}</Text>
                        <View style={styles.login}>
                            <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
                                <Text style={styles.txt}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.login}>
                            <TouchableOpacity onPress={()=>{setShowConfirm(true)}}>
                                <Text style={styles.txt}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginLeft: "5%"}}>
                {listSubComment?.map((item) => (
                    <View key={item.commentId}>
                        <CommentItem parentId={commentId} parentType={"NEWS"} commentId={item.commentId}
                                     username={item.createdBy.fullName} content={item.content}
                                     time={formatTime(item.createdDate)} callBackComment={callBackCommentNews}/>
                    </View>
                ))
                }
                <View style={styles.containerComment}>
                    <TextField text={comment} onChangeText={comment => setComment(comment)}
                               placeholder={" Reply Here"}
                               secureTextEntry={false}
                               multiline={false}
                               onSubmitEditing={() => {handleComment(); setComment("")}}
                               style={[styles.comment]}/>
                    <Buttons text={"Reply"} onPressTo={() => {handleComment(); setComment("")}} style={styles.button}/>
                </View>
            </View>

            <Separator/>
        </View>
    );
}

const styles = StyleSheet.create({
    comment: {
        width: "95%",
        height: 40,
    },
    button: {
        width: 80,
        height:40
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
    modalDelete: {
        alignItems: "center",
        justifyContent:"center",
        flex: 1,
    },
    modalDeleteView: {
        width: "30%",
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
        padding: 50,
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
export default CommentNewsComponent;