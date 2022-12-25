import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ForumNavigation from "../../navigations/ForumNavigation";
import Separator from "../../components/Separator";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import CommentItem from "../../components/CommentItem";
import VoteComponent from "../../components/VoteComponent";
import { useDispatch } from "react-redux";
import {
  closeQuestion,
  getListQuestion,
  getQuestionDetailByQuestionId,
} from "../../actions/ForumAction";
import AnswerComponent from "../../components/AnswerComponent";
import {
  addAnswer,
  addCommentToQuestion,
  getQuestionDetail,
  voteQuestion,
} from "../../networking/CustomNetworkService";

function QuestionDetail({ route, navigation }) {
  const res = route.params;
  let isValid = true;
  let isAwsValid = true;
  console.log("Data in question detail: " + JSON.stringify(res));
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [userComment, setUserComment] = useState(res.data.comments);
  const [userAnswer, setUserAnswer] = useState(res.data.answers.items);
  const [title, setTitle] = useState(res.data.title);
  const [questionId, setQuestionId] = useState(res.data.questionId);
  const [author, setAuthor] = useState(res.data.createdBy.fullName);
  const [time, setTime] = useState(res.data.createdDate);
  const [views, setViews] = useState(res.data.views);
  const [problem, setProblem] = useState(res.data.problem);
  const [triedCase, setTriedCase] = useState(res.data.triedCase);
  const [tags, setTags] = useState(res.data.tags);
  const [votes, setVotes] = useState(res.data.score);
  const [statusClose, setStatusClose] = useState(res.data.status);
  const [votedStatus, setVotedStatus] = useState(res.data.votedStatus);
  const [value, setValue] = useState("Score (DESC)");
  const [close, setClose] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);

  function validateComment() {
    if (!content) {
      setIsComment(true);
      isValid = false;
    } else {
      setIsComment(false);
    }
    if (isValid) {
      addCommentToQuestion(questionId, content, navigation).then((v) => {
        getQuestionDetail(questionId, null, null, navigation).then((r) =>
          setUserComment(r.data.comments)
        ).catch((error) => {
          navigation.push("ErrorPage", {
            status: 500,
            displayMessage: "Oops! Something went wrong.",
          });
        })
        setContent("");
      });
      setIsAnswer(false);
    }
  }

  function validateAnswer() {
    if (!answer) {
      setIsAnswer(true);
      isAwsValid = false;
    } else {
      setIsAnswer(false);
    }
    if (isAwsValid) {
      handleAnswer();
      setAnswer("");
      setIsAnswer(false);
    }
  }

  const formatTime = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    return d.getDate() + "/" + month + "/" + d.getFullYear();
  };
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(getQuestionDetailByQuestionId(questionId, navigation, true));
  };
  const handleClose = () => {
    dispatch(closeQuestion(questionId, navigation));
  };
  const handleComment = () => {
    addCommentToQuestion(questionId, content, navigation).then((v) => {
      getQuestionDetail(questionId, null, null, navigation).then((r) =>
        setUserComment(r.data.comments)
      );
      setContent("");
    });
  };
  const callBackComment = () => {
    getQuestionDetail(questionId, null, null, navigation).then((r) => {
      setUserComment(r.data.comments);
    });
  };
  const callbackAnswer = () => {
    getQuestionDetail(questionId, null, null, navigation).then((r) =>
      setUserAnswer(r.data.answers.items)
    );
  };
  const handleAnswer = () => {
    addAnswer(questionId, answer, navigation).then((v) => {
      getQuestionDetail(questionId, null, null, navigation).then((r) =>
        setUserAnswer(r.data.answers.items)
      );
      setAnswer("");
    });
  };
  const handleBack = () => {
    dispatch(getListQuestion(navigation));
  };
  const handleVote = (status) => {
    voteQuestion(questionId, status, navigation).then((v) => {
      getQuestionDetail(questionId, null, null, navigation).then((r) => {
        setVotes(r.data.score);
        setVotedStatus(r.data.votedStatus);
      }).catch((error) => {
        navigation.push("ErrorPage", {
          status: 500,
          displayMessage: "Oops! Something went wrong.",
        });
    });
  })
  };
  const sort = (sortByType) => {
    if (sortByType === "Score (DESC)") {
      getQuestionDetail(questionId, "DESC", null, navigation).then((r) =>
        setUserAnswer(r.data.answers.items)
      );
    } else if (sortByType === "Score (ASC)") {
      getQuestionDetail(questionId, "ASC", null, navigation).then((r) =>
        setUserAnswer(r.data.answers.items)
      );
    } else if (sortByType === "Date created (DESC)") {
      getQuestionDetail(questionId, null, "DESC", navigation).then((r) =>
        setUserAnswer(r.data.answers.items)
      );
    } else if (sortByType === "Date created (ASC)") {
      getQuestionDetail(questionId, null, "ASC", navigation).then((r) =>
        setUserAnswer(r.data.answers.items)
      );
    }
  };
  const data = [
    {
      label: "Score (DESC)",
      value: "Score (DESC)",
    },
    {
      label: "Score (ASC)",
      value: "Score (ASC)",
    },
    {
      label: "Date created (DESC)",
      value: "Date created (DESC)",
    },
    {
      label: "Date created (ASC)",
      value: "Date created (ASC)",
    },
  ];
  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.forum}>
          <ForumNavigation navigation={navigation} />
        </View>
        <View style={styles.content}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={close}
            onRequestClose={() => {
              setClose(false);
            }}
          >
            <View style={styles.modal}>
              <View style={styles.modalProfileView}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
                >
                  Do you want to close this question?
                </Text>
                <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                  <Buttons
                    text={"Close"}
                    style={{ marginRight: 40 }}
                    onPressTo={() => {
                      handleClose();
                      setClose(false);
                    }}
                  />
                  <Buttons
                    text={"Cancel"}
                    style={{ backgroundColor: "#F4F5F7" }}
                    styleText={{ color: "black" }}
                    onPressTo={() => setClose(false)}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.containerTitle}>
            <View style={styles.containerT}>
              <Text style={styles.textTitle}>{title}</Text>
              <Text style={styles.textContent}>
                Post by {author} on {formatTime(time)} Viewed {views} times
              </Text>
            </View>
            <View>
              <Buttons
                text={"AddQuestion"}
                style={[styles.button, { marginBottom: 20 }]}
                onPressTo={() => navigation.push("AddQuestion")}
              />
              <Buttons
                text={"Back"}
                style={styles.button}
                onPressTo={handleBack}
              />
            </View>
          </View>
          <Separator />
          <View style={styles.containerContent}>
            <VoteComponent
              votes={votes}
              size={"4x"}
              onPressUp={() => handleVote("LIKED")}
              onPressDown={() => handleVote("DISLIKED")}
              status={votedStatus}
            />
            <View style={styles.containerCon}>
              <Text style={styles.textContent}>{problem}</Text>
              <Text style={styles.textContent}>{triedCase}</Text>
              <FlatList
                style={styles.flatListTag}
                horizontal={true}
                data={tags}
                renderItem={({ item }) => (
                  <Text style={styles.textView}>{item}</Text>
                )}
              />
              {statusClose !== "CLOSE" && (
                <View style={styles.containerComment}>
                  <View style={styles.login}>
                    <TouchableOpacity onPress={handleEdit}>
                      <Text style={styles.txt}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.login}>
                    <TouchableOpacity
                      onPress={() => {
                        setClose(true);
                      }}
                    >
                      <Text style={styles.txt}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={{ marginLeft: 100, marginTop: 50 }}>
            {userComment?.map((item) => (
              <View key={item.commentId}>
                <CommentItem
                  parentId={questionId}
                  commentId={item.commentId}
                  username={item.createdBy.fullName}
                  content={item.content}
                  parentType={"QUESTION"}
                  time={formatTime(item.createdDate)}
                  callBackComment={callBackComment}
                  navigation={navigation}
                />
              </View>
            ))}
            {statusClose !== "CLOSE" && (
              <View>
                <View style={styles.containerComment}>
                  <TextField
                    text={content}
                    onChangeText={(newText) => setContent(newText)}
                    placeholder={" Comment Here"}
                    secureTextEntry={false}
                    multiline={false}
                    onSubmitEditing={handleComment}
                    style={styles.comment}
                  />
                  <Buttons
                    text={"Comment"}
                    onPressTo={validateComment}
                    style={styles.button}
                  />
                </View>
                {isComment && (
                  <Text style={styles.inputInvalid}>Invalid comment</Text>
                )}
              </View>
            )}
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textContent}>{userAnswer.length} Answers</Text>
            <View style={styles.containerComment}>
              <Text style={styles.textContent}>Sorted by: </Text>
              <Dropdown
                style={styles.dropdown}
                value={value}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                onChange={(item) => {
                  setValue(item.value);
                  sort(item.value);
                }}
              />
            </View>
          </View>
          {userAnswer?.map((item) => (
            <View key={item.answerId}>
              <AnswerComponent
                questionId={questionId}
                answerId={item.answerId}
                votes={item.score}
                createdBy={item.createdBy}
                content={item.content}
                createdDate={item.createdDate}
                userAnswerComment={item.comments}
                status={item.status}
                callbackAnswer={callbackAnswer}
                votedStatus={item.votedStatus}
                statusClose={statusClose}
                navigation={navigation}
              />
            </View>
          ))}
          {statusClose !== "CLOSE" && (
            <View>
              <Text style={styles.textContent}>Your Answers</Text>
              <TextField
                text={answer}
                onChangeText={(newText) => setAnswer(newText)}
                placeholder={" Answer Here"}
                secureTextEntry={false}
                multiline={true}
                onSubmitEditing={validateAnswer}
                style={[styles.comment, { height: 300, width: "95%" }]}
              />
              {isAnswer && (
                <Text style={styles.inputInvalid}>Invalid answer</Text>
              )}
              <View>
                <Buttons
                  text={"Post Your Answer"}
                  onPressTo={validateAnswer}
                  style={{ marginLeft: 20, width: "25%" }}
                />
              </View>
              <Separator />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  inputInvalid: {
    marginLeft: 15,
    color: "red",
    marginBottom: 10,
  },
  forum: {
    flex: 0.15,
    marginTop: 20,
    alignItems: "flex-end",
  },
  content: {
    flex: 0.75,
    borderLeftWidth: 1,
    backgroundColor: "white",
    marginTop: 20,
    paddingLeft: 50,
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comment: {
    width: "90%",
    height: 50,
  },
  button: {
    minWidth: 50,
  },
  containerComment: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatList: {
    marginLeft: 100,
  },
  text: {
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textContent: {
    fontSize: 20,
    marginRight: 20,
  },
  containerT: {
    flex: 0.8,
    marginTop: 20,
  },
  containerC: {
    paddingLeft: 200,
  },
  flatListTag: {
    marginBottom: 10,
    marginTop: 10,
    flexGrow: 0,
  },
  textView: {
    fontSize: 17,
    marginRight: 10,
    backgroundColor: "#E1ECF4",
  },
  dropdown: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  containerContent: {
    flexDirection: "row",
  },
  containerCon: {
    width: "90%",
  },
  login: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
  },
  txt: {
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
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
});

export default QuestionDetail;
