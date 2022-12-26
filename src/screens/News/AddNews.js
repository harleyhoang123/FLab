import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch } from "react-redux";
import { createNews } from "../../actions/NewsAction";

function AddNews({ navigation }) {
  let isValid = true;
  const [thumbnail, setThumbnail] = useState();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const [isTitle, setIsTitle] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [isImage, setIsImage] = useState(false);

  function validateData() {
    if (!title) {
      setIsTitle(true);
      isValid = false;
    } else {
      setIsTitle(false);
    }
    if (!content) {
      setIsContent(true);
      isValid = false;
    } else {
      setIsContent(false);
    }
    if (!thumbnail) {
      setIsImage(true);
      isValid = false;
    } else {
      setIsImage(false);
    }
    if (isValid) {
      dispatch(createNews(title, content, thumbnail, navigation));
    }
  }

  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });
    console.log(result);
    if (!result.cancelled) {
      console.log("Picked: " + result);
      console.log("name: " + result.name);
      console.log("uri: " + result.uri);
      console.log("size: " + result.size);
      console.log("mimeType: " + result.mimeType);
      const imagePicked = {
        name: result.name,
        base64: result.uri,
        size: result.size,
        mimeType: result.mimeType,
      };
      setThumbnail(imagePicked);
    }
  };

  return (
    <View style={styles.container}>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.text}>Create a News</Text>
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
        {isContent && <Text style={styles.inputInvalid}>Invalid content</Text>}
        <View style={styles.row}>
          <View>
            <Buttons
              text={"Add Image"}
              onPressTo={pickImage}
              style={styles.button}
            />
          </View>
          {isImage && <Text style={styles.inputInvalid}>Invalid image</Text>}
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
            text={"Post News"}
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
  inputInvalid: {
    marginLeft: 55,
    color: "red",
  },
  containerContent: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    flex: 1,
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
export default AddNews;
