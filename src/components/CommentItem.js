import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
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
    }
  }
  const handleDelete = () => {
    if (parentType === "QUESTION") {
      deleteCommentInQuestion(parentId, commentId).then(() =>
        callBackComment()
      );
    } else if (parentType === "ANSWER") {
      deleteCommentInAnswer(parentId, commentId).then(() => callBackComment());
    } else if (parentType === "NEWS") {
      deleteCommentInComment(parentId, commentId).then(() => callBackComment());
    }
  };
  const handleEdit = () => {
    if (parentType === "NEWS") {
      editCommentNews(commentId, text).then(() => {
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

  const isEditComment = (isEdit) => {
    if (isEdit) {
      return (
        <View style={styles.containerComment}>
          <TextField
            text={text}
            onChangeText={(text) => setText(text)}
            placeholder={" Edit Comment"}
            secureTextEntry={false}
            multiline={false}
            onSubmitEditing={() => {
              validateComment();
              setText("");
            }}
            style={[styles.comment]}
          />
          {isComment && (
            <Text style={styles.inputInvalid}>Invalid comment</Text>
          )}
          <Buttons
            text={"Save"}
            onPressTo={() => {
              validateComment();
              setText("");
            }}
            style={styles.button}
          />
          <Buttons
            text={"Cancel"}
            onPressTo={() => {
              setIsEdit(!isEdit);
            }}
            style={styles.button}
          />
        </View>
      );
    } else {
      return <Text style={styles.text}>{content}</Text>;
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.containerComment}>
          <Text style={styles.textUsername}>{username}</Text>
          {isEditComment(isEdit)}
        </View>
        <View style={styles.containerComment}>
          <Text style={styles.text}>{time}</Text>
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
          <View style={styles.login}>
            <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
              <Text style={styles.txt}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.login}>
            <TouchableOpacity onPress={() => setShowConfirm(true)}>
              <Text style={styles.txt}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  containerComment: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputInvalid: {
    marginLeft: 15,
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
});
export default CommentItem;
