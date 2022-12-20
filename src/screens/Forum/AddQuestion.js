import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import AddComponent from "../../components/AddComponent";
import { Dropdown } from "react-native-element-dropdown";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ForumNavigation from "../../navigations/ForumNavigation";
import Buttons from "../../components/Buttons";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../actions/ForumAction";

function AddQuestion({ navigation }) {
  let isValid = true;
  const [value, setValue] = useState("Public");
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [triedCase, setTriedCase] = useState("");
  const [tag, setTag] = useState("");

  const [isTitle, setIsTitle] = useState(false);
  const [isProblem, setIsProblem] = useState(false);
  const [isTriedCase, setIsTriedCase] = useState(false);
  const [isTag, setIsTag] = useState(false);

  function validateComment() {
    if (!title) {
      setIsTitle(true);
      isValid = false;
    }
    if (!problem) {
      setIsProblem(true);
      isValid = false;
    }
    if (!triedCase) {
      setIsTriedCase(true);
      isValid = false;
    }
    if (!tag) {
      setIsTag(true);
      isValid = false;
    }
    if (isValid) {
      dispatch(addQuestion(title, problem, triedCase, tag, navigation));
    }
  }

  const dispatch = useDispatch();
  const data = [
    { label: "Public", value: "Public" },
    { label: "Inside Lab Room", value: "Inside Lab Room" },
  ];

  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.forum}>
          <ForumNavigation navigation={navigation} />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Ask a question</Text>
          <AddComponent
            text={title}
            onChangeText={(title) => setTitle(title)}
            title={"Title"}
            suggest={
              "Be specific and imagine you’re asking a question to another person."
            }
            multiline={false}
            style={{ width: "96%" }}
          />
          {isTitle && <Text style={styles.inputInvalid}>Invalid title</Text>}
          <AddComponent
            text={problem}
            onChangeText={(problem) => setProblem(problem)}
            title={"What are the details of your problem?"}
            suggest={
              "Introduce the problem and expand on what you put in the title. Minimum 20 characters."
            }
            multiline={true}
            style={{ width: "96%", height: 300 }}
          />
          {isProblem && (
            <Text style={styles.inputInvalid}>Invalid comment</Text>
          )}
          <AddComponent
            text={triedCase}
            onChangeText={(triedCase) => setTriedCase(triedCase)}
            title={"What did you try and what were you expecting?"}
            suggest={
              "Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters."
            }
            multiline={true}
            style={{ width: "96%", height: 300 }}
          />
          {isTriedCase && (
            <Text style={styles.inputInvalid}>Invalid comment</Text>
          )}
          <AddComponent
            text={tag}
            onChangeText={(tag) => setTag(tag)}
            title={"Tags"}
            suggest={
              "Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
            }
            multiline={false}
            style={{ width: "96%" }}
          />
          {isTag && <Text style={styles.inputInvalid}>Invalid comment</Text>}
          <View style={styles.summit}>
            <Dropdown
              style={styles.dropdown}
              value={value}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              onChange={(item) => {
                setValue(item.value);
              }}
            />
            <View style={styles.row}>
              <Buttons
                text={"Post Your Question"}
                onPressTo={validateComment}
                style={styles.button}
              />
              <Buttons
                text={"Back"}
                onPressTo={() => navigation.goBack(navigation)}
                style={styles.button}
              />
            </View>
          </View>
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
    marginLeft: 55,
    color: "red",
  },
  forum: {
    flex: 0.15,
    marginTop: 20,
    alignItems: "flex-end",
  },
  content: {
    flex: 0.65,
    borderLeftWidth: 1,
    paddingLeft: 50,
  },
  dropdown: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 30,
    marginTop: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 30,
  },
  button: {
    margin: 30,
    width: 250,
  },
  summit: {
    marginLeft: 30,
  },
  row: {
    flexDirection: "row",
  },
});
export default AddQuestion;
