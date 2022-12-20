import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import HTMLReactParser from "html-react-parser";
import Separator from "../../components/Separator";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import {
  commentToNews,
  deleteNews,
  getListNews,
  getNewsDetailComment,
} from "../../networking/CustomNetworkService";
import CommentNewsComponent from "../../components/CommentNewsComponent";

function NewsDetail({ route, navigation }) {
  const res = route.params.data;
  let isValid = true;
  console.log("Data in News detail: " + JSON.stringify(res));
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(false);

  function validateComment(newsId, comment) {
    if (!comment) {
      setIsComment(true);
      isValid = false;
    }
    if (isValid) {
      commentNews(newsId, comment);
    }
  }

  const formatTime = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    return d.getDate() + "/" + month + "/" + d.getFullYear();
  };
  const newsId = res.newsId;
  const [title, setTitle] = useState(res.title);
  const [author, setAuthor] = useState(res.author);
  const [time, setTime] = useState(res.createdDate);
  const [content, setContent] = useState(res.content);
  const [views, setViews] = useState(res.views);
  const [userComment, setUserComment] = useState(res.comments);
  const deleteANews = (newsId, navigation) => {
    deleteNews(newsId).then(() => getListNews(navigation));
  };
  const commentNews = (newsId, content) => {
    commentToNews(newsId, content).then((v) =>
      getNewsDetailComment(newsId).then((r) => {
        setUserComment(r.data.comments);
      })
    );
  };
  const callBackCommentNews = () => {
    getNewsDetailComment(newsId).then((r) => {
      setUserComment(r.data.comments);
    });
  };
  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <View style={styles.row}>
            <View style={styles.containerT}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "Bold",
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                {title}
              </Text>
              <Text style={styles.txt}>
                Post by {author} on {formatTime(time)} Views : {views}
              </Text>
            </View>
            <View>
              <Buttons
                text={"..."}
                style={styles.btnModal}
                onPressTo={() => setModalVisible(true)}
              />
              <Buttons
                text={"Back"}
                style={[styles.btnModal, { width: 50 }]}
                onPressTo={() => navigation.goBack(navigation)}
              />
              <View styles={{ position: "absolute" }}>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.modal}
                  >
                    <View style={styles.modalView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.push("UpdateNews", { data: res });
                          setModalVisible(!modalVisible);
                        }}
                        style={[styles.buttonModal]}
                      >
                        <Text style={styles.textStyle}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteANews(newsId, navigation);
                          setModalVisible(!modalVisible);
                        }}
                        style={[styles.buttonModal]}
                      >
                        <Text style={styles.textStyle}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Modal>
              </View>
            </View>
          </View>
        </View>
        <Separator />
        <View View style={styles.containerTitle}>
          <Text style={styles.txt}>{content}</Text>
        </View>
        <View style={styles.containerComment}>
          <TextField
            text={comment}
            onChangeText={(newText) => setComment(newText)}
            placeholder={" Comment Here"}
            secureTextEntry={false}
            multiline={false}
            style={styles.comment}
          />

          <Buttons
            text={"Comment"}
            style={styles.button}
            onPressTo={() => {
              validateComment(newsId, comment);
              setComment("");
            }}
          />
        </View>

        {isComment && <Text style={styles.inputInvalid}>Invalid comment</Text>}

        {userComment?.map((item) => (
          <View key={item.commentId}>
            <CommentNewsComponent
              newsId={newsId}
              commentId={item.commentId}
              username={item.createdBy.fullName}
              content={item.content}
              createdDate={formatTime(item.createdDate)}
              listSubComment={item.comments}
              callBackCommentNews={callBackCommentNews}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "65%",
    alignSelf: "center",
    marginTop: 20,
    flex: 1,
  },
  inputInvalid: {
    marginLeft: 15,
    color: "red",
  },
  containerTitle: {
    marginLeft: 20,
  },
  comment: {
    width: "80%",
    height: 40,
  },
  button: {
    height: 40,
  },
  containerComment: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  userComment: {
    backgroundColor: "#F2F2F2",
  },
  flatList: {
    marginLeft: 50,
  },
  text: {
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  txt: {
    fontSize: 17,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnModal: {
    width: 30,
    height: 30,
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  modal: {
    alignItems: "flex-end",
    flex: 1,
  },
  modalView: {
    position: "absolute",
    marginTop: 100,
    marginRight: "18%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  textStyle: {
    fontWeight: "bold",
  },
  buttonModal: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: 135,
  },
  containerT: {
    flex: 0.8,
  },
});
export default NewsDetail;
