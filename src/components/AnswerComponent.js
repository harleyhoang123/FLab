import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextField from "./TextField";
import Buttons from "./Buttons";
import Separator from "./Separator";
import VoteComponent from "./VoteComponent";
import {
  addCommentToAnswer,
  deleteAnswer,
  editAnswer,
} from "../networking/CustomNetworkService";

function AnswerComponent({
  questionId,
  answerId,
  votes,
  createdBy,
  content,
  createdDate,
  userAnswerComment,
  callbackAnswer,
}) {
  const formatTime = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    return d.getDate() + "/" + month + "/" + d.getFullYear();
  };
  const [comment, setComment] = useState("");
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
    editAnswer(commentId, text).then(() => callbackAnswer());
  };
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(content);
  const [showConfirm, setShowConfirm] = useState(false);
  const isEditComment = (isEdit) => {
    if (isEdit) {
      return (
        <View>
          <View style={styles.containerComment}>
            <TextField
              text={text}
              onChangeText={(text) => setText(text)}
              placeholder={" Edit Answer"}
              secureTextEntry={false}
              multiline={true}
              onSubmitEditing={() => {
                handleEdit(answerId, text);
                setText("");
                setIsEdit(!isEdit);
              }}
              style={[styles.comment2]}
            />
            <Buttons
              text={"Save"}
              onPressTo={() => {
                handleEdit(answerId, text);
                setText("");
                setIsEdit(!isEdit);
              }}
              style={styles.button2}
            />
            <Buttons
              text={"Cancel"}
              onPressTo={() => {
                setIsEdit(!isEdit);
              }}
              style={styles.button2}
            />
          </View>
        </View>
      );
    } else {
      return <Text style={styles.text}>{content}</Text>;
    }
  };
  return (
    <View>
      <View style={styles.row}>
        <VoteComponent votes={votes} size={"2x"} style={{ marginRight: 5 }} />
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
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
                >
                  Do you want to delete this answer?
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
          <View>
            <View style={styles.containerComment}>
              <Text style={styles.textUsername}>{createdBy}</Text>
              {isEditComment(isEdit)}
            </View>
            <View style={styles.containerComment}>
              <Text style={styles.text}>{formatTime(createdDate)}</Text>
              <View style={styles.login}>
                <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
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
      </View>
      <View style={{ marginLeft: "5%" }}>
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
            text={comment}
            onChangeText={(comment) => setComment(comment)}
            placeholder={" Comment Here"}
            secureTextEntry={false}
            multiline={false}
            onSubmitEditing={() => handleComment()}
            style={[styles.comment]}
          />
          <Buttons
            text={"Comment"}
            onPressTo={() => handleComment()}
            style={styles.button}
          />
        </View>
      </View>

      <Separator />
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
    alignItems: "flex-start",
    justifyContent: "center",
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
export default AnswerComponent;
