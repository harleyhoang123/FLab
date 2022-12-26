import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommentItem from "./CommentItem";
import TextField from "./TextField";
import Buttons from "./Buttons";
import Separator from "./Separator";
import {
  commentToComment,
  deleteCommentInNews,
  editCommentNews,
} from "../networking/CustomNetworkService";
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
function CommentNewsComponent({
  newsId,
  commentId,
  username,
  content,
  createdDate,
  listSubComment,
    authorComment,
  callBackCommentNews,
  navigation,
}) {
  const formatTime = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    return d.getDate() + "/" + month + "/" + d.getFullYear();
  };
  const [comment, setComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(content);
  let isValid = true;
  const [userAccount, setUserAccount] = useState("");
  const [roles, setRoles] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [isReply, setIsReply] = useState(false);
  getRoles().then((v) => {
    setRoles(v)
  });
  getUserAccount().then((r) => {
    setUserAccount(r)
  });
  const checkCanEdit = (roles, userAccount, author) => {
      if (roles.includes("MANAGER") || roles.includes("ADMIN")) {
        return true;
      } else {
        return userAccount === author;
      }
  }
  function validateComment() {
    if (!text) {
      setIsComment(true);
      isValid = false;
    }
    if (isValid) {
      handleEdit();
      setIsEdit(!isEdit);
    }
  }

  function validateReply() {
    if (!comment) {
      setIsReply(true);
      isValid = false;
    }
    if (isValid) {
      handleComment();
    }
  }

  const handleComment = () => {
    commentToComment(commentId, comment, navigation).then(() =>
      callBackCommentNews()
    ).catch(error => {});
  };
  const handleEdit = () => {
    editCommentNews(commentId, text, navigation).then(() => {
      callBackCommentNews();
      setIsEdit(!isEdit);
    }).catch(error => {});
  };
  const handleDelete = () => {
    deleteCommentInNews(newsId, commentId, navigation).then(() =>
      callBackCommentNews()
    ).catch(error => {});
  };
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <View>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showConfirm}
          onRequestClose={() => {
            setShowConfirm(false);
          }}
        >
          <View style={styles.modalDelete}>
            <View style={styles.modalDeleteView}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
              >
                Do you want to delete this comment?
              </Text>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Buttons
                  text={"Delete"}
                  style={{ marginRight: 40 }}
                  onPressTo={() => {
                    handleDelete();
                    setShowConfirm(false);
                  }}
                />
                <Buttons
                  text={"Cancel"}
                  style={{ backgroundColor: "#F4F5F7" }}
                  styleText={{ color: "black" }}
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
                  validateComment();
                  setText("");
                }}
                style={{ height: 150, width: "95%" }}
              />
              {isComment && (
                <Text style={styles.inputInvalid}>Invalid comment</Text>
              )}
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Buttons
                  text={"Save"}
                  onPressTo={() => {
                    validateComment();
                    setText("");
                  }}
                  style={{ marginLeft: 20 }}
                />
                <Buttons
                  text={"Cancel"}
                  style={{ backgroundColor: "#F4F5F7", marginLeft: 20 }}
                  styleText={{ color: "black" }}
                  onPressTo={() => setIsEdit(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View style={{width: "95%"}}>
          <Text style={styles.text}>
            <Text style={styles.textUsername}>{username} </Text> {content}
          </Text>
        </View>
          <View style={styles.containerComment}>
            <Text style={styles.text}>{createdDate}</Text>
            {checkCanEdit(roles,userAccount,authorComment)&&
                <View style={styles.containerComment}>
                  <View style={styles.login}>
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
                    <TouchableOpacity
                        onPress={() => {
                          setShowConfirm(true);
                        }}
                    >
                      <Text style={styles.txt}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            }
          </View>

      </View>
      <View style={{ marginLeft: "5%" }}>
        {listSubComment?.map((item) => (
          <View key={item.commentId}>
            <CommentItem
              parentId={commentId}
              parentType={"NEWS"}
              commentId={item.commentId}
              username={item.createdBy.userInfo.fullName}
              content={item.content}
              time={formatTime(item.createdDate)}
              callBackComment={callBackCommentNews}
              navigation={navigation}
              author={item.createdBy.userInfo.username}
            />
          </View>
        ))}
        <View style={styles.containerComment}>
          <TextField
            text={comment}
            onChangeText={(comment) => setComment(comment)}
            placeholder={" Reply Here"}
            secureTextEntry={false}
            multiline={false}
            onSubmitEditing={() => {
              validateReply();
              setComment("");
            }}
            style={[styles.comment]}
          />
          <Buttons
            text={"Reply"}
            onPressTo={() => {
              validateReply();
              setComment("");
            }}
            style={styles.button}
          />
        </View>
        {isReply && <Text style={styles.inputInvalid}>Invalid reply</Text>}
      </View>
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    width: "95%",
    height: 40,
  },
  inputInvalid: {
    marginLeft: 15,
    marginBottom: 15,
    color: "red",
  },
  button: {
    width: 80,
    height: 40,
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
    backgroundColor: "white",
    justifyContent: "space-between",
    flex: 1,
  },
  containerComment: {
    flexDirection: "row",
    alignItems: "center",
  },
  textUsername: {
    fontWeight: "bold",
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
  modalDelete: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalDeleteView: {
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
export default CommentNewsComponent;
