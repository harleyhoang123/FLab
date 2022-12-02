import React,{useState,useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function TaskDetailComponent({isVisible}) {
  console.log("Visible: " + isVisible);
  const [Comments, SetComments] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [showComment, setShowComment] = useState(false);
  const InputRef = useRef();

  // Function to add comments to array
  const AddToComments = () => {
    let temp = {
      id: GenerateUniqueID(),
      commentValue: commentValue,
    };
    SetComments([...Comments, temp]); // Adds comment to Array
    InputRef.current.clear(); // This clears the TextInput Field
  };

  // Function to Generate a Unique ID for array elements
  const GenerateUniqueID = () => {
    return Math.floor(Math.random() * Date.now()).toString();
  };
  const data = [
    { key: "1", value: "Done" },
    { key: "2", value: "Inprogess" },
  ];

  const childIssue = [
    {
      id: "1",
      content: "Bla Bla Bla",
    },
    {
      id: "2",
      content: "Bla Bla Bla",
    },
    {
      id: "3",
      content: "Bla Bla Bla",
    },
  ];

  const Item = ({ id, content }) => (
    <View style={styles.childIssue}>
      <Text style={styles.childIssueContent}>{content}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item id={item.id} content={item.content} />;
  return(
      <View>
      {isVisible? <View style={[styles.container]}>
          <View style={styles.wrapper}>
            <Text style={styles.source}>FLab15/Flab1</Text>
            <Text style={styles.title}>
              Summary of features in existing laboratory management systems
            </Text>

            <SelectList
                setSelected={(val) => setSelected(val)}
                placeholder={"Task status"}
                data={data}
                save="value"
                boxStyles={{
                  width: 130,
                  height: 45,
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 5,
                }}
                dropdownStyles={{
                  width: 130,
                }}
                search={false}
            />
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descriptionDetail}>
              Summary of features in existing laboratory management systems
            </Text>
            <Text style={styles.descriptionDetail}>Child Issues</Text>
            <SafeAreaView style={styles.flatlist}>
              <FlatList
                  data={childIssue}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
              />
            </SafeAreaView>

            <View style={styles.borderBot}>
              <View style={styles.borderBot}>
                <Text style={styles.descriptionDetail}>Details</Text>
              </View>
              <View>
                <Text style={styles.descriptionDetail}>Assignee: Hai Son</Text>
                <Text style={styles.descriptionDetail}>Sprint: 1</Text>
                <Text style={styles.descriptionDetail}>Estimate: 1 point</Text>
                <Text style={styles.descriptionDetail}>Reporter: Hai Son</Text>
              </View>
            </View>
            <View style={styles.comment}>
              <Image
                  style={styles.tinyLogo}
                  source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              />
              <TextInput style={styles.input} placeholder="Comment..." />
              <Pressable
                  style={styles.button}
                  onPress={() => Alert.alert("Simple Button pressed")}
              >
                <Text style={styles.text}>Submit</Text>
              </Pressable>
            </View>
          </View>
        <View style={styles.containerComment}>
          <View style={styles.comment_container}>
            <TextInput
                style={styles.input_txt}
                onChangeText={(text) => setCommentValue(text)}
                placeholder="type something ..."
                ref={InputRef}
            />
            <Button title="send" onPress={() => AddToComments()} />
          </View>

          {Comments.map((c) => (
              <View style={styles.showComment_container} key={c.id}>
                <Text>{c.commentValue}</Text>
              </View>
          ))}
        </View>
        </View> :<View></View>}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    height: "auto",
  },
  button: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "blue",
    margin: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  comment: {
    display: "flex",
    flexDirection: "row",
  },
  tinyLogo: {
    width: 50,
    width: 50,
    height: 50,
    margin: 12,
  },
  input: {
    width: 150,
    height: 40,
    margin: 18,
    borderWidth: 1,
    padding: 10,
  },
  flatlist: {
    margin: 5,
  },
  borderBot: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  childIssueContent: {
    padding: 5,
  },
  childIssue: {
    borderEndWidth: 1,
    borderRadius: 7,
    backgroundColor: "#34b1eb",
    marginBottom: 2,
  },
  wrapper: {
    margin: 7,
  },
  title: {
    width: "100%",
    fontSize: 22,
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  descriptionDetail: {
    fontSize: 16,
    marginBottom: 20,
  },
  dropList: {
    width: 50,
  },
  source: {
    color: "green",
  },
  containerComment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment_container: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 40,
  },
  input_txt: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
  },
  showComment_container: {
    width: '70%',
    minHeight: 50,
    backgroundColor: '#B0C4DE',
    marginTop: 10,
  },
});