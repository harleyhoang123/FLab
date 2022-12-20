import React, { useState } from "react";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import { Image, StyleSheet, Text, View } from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import * as DocumentPicker from "expo-document-picker";
import {
  getNewsDetail,
  updateNews,
} from "../../networking/CustomNetworkService";

function UpdateNews({ route, navigation }) {
  const data = route.params.data;
  let isValid = true;
  const [thumbnail, setThumbnail] = useState();
  const [content, setContent] = useState(data.content);
  const [title, setTitle] = useState(data.title);

  const [isTitle, setIsTitle] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [isImage, setIsImage] = useState(false);

  function validateData() {
    if (!title) {
      setIsTitle(true);
      isValid = false;
    }
    if (!content) {
      setIsContent(true);
      isValid = false;
    }
    if (!thumbnail) {
      setIsImage(true);
      isValid = false;
    }
    if (isValid) {
      updateThisNews(data.newsId, title, content, thumbnail, navigation);
    }
  }

  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });
    console.log(result);
    if (!result.cancelled) {
      const imagePicked = {
        name: result.name,
        base64: result.uri,
        size: result.size,
        mimeType: result.mimeType,
      };
      setThumbnail(imagePicked);
    }
  };

  const updateThisNews = (newsId, title, content, thumbnail, navigation) => {
    updateNews(newsId, title, content, thumbnail).then((r) =>
      getNewsDetail(newsId, navigation)
    );
  };
  return (
    <View style={styles.container}>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.text}>Update News</Text>
        <AddComponent
          title={"Title"}
          multiline={false}
          style={{ width: "97%" }}
          text={title}
          onChangeText={(title) => setTitle(title)}
        />
        {isTitle && <Text style={styles.inputInvalid}>Invalid title</Text>}
        <AddComponent
          title={"News Detail"}
          multiline={true}
          style={{ width: "97%", height: 300 }}
          text={content}
          onChangeText={(content) => setContent(content)}
        ></AddComponent>
        {isContent && <Text style={styles.inputInvalid}>Invalid title</Text>}
        <View style={styles.row}>
          <View>
            <Buttons
              text={"Add Image"}
              onPressTo={pickImage}
              style={styles.button}
            />
            {isImage && <Text style={styles.inputInvalid}>Invalid title</Text>}
          </View>
          <View>
            {thumbnail && (
              <Image
                source={{ uri: thumbnail.base64 }}
                style={{ width: 200, height: 200, marginLeft: 50 }}
              />
            )}
          </View>
        </View>

        <View style={styles.row}>
          <Buttons
            text={"Update News"}
            style={styles.button}
            onPressTo={validateData}
          />
          <Buttons
            text={"Back"}
            style={styles.button}
            onPressTo={() => {
              navigation.goBack(navigation);
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    flex: 1,
  },
  inputInvalid: {
    marginLeft: 55,
    color: "red",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 30,
  },
  button: {
    margin: 30,
    width: 200,
  },
  row: {
    flexDirection: "row",
  },
});
export default UpdateNews;
