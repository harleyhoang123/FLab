import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  CheckBox,
  SafeAreaView,
  Button,
} from "react-native";
import Buttons from "../../components/Buttons";
import { RadioButton } from "react-native-paper";
import TextField from "../../components/TextField";
import LabNavigator from "../../navigations/LabNavigator";
import { useDispatch } from "react-redux";
import { getFolderByRepositoryId } from "../../actions/RepositoryAction";

function Repository({ route, navigation }) {
  const data = route.params.data;
  const [items, setItems] = useState(data.items);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const getFolderByRepository = (id) => {
    dispatch(getFolderByRepositoryId(id, navigation));
  };

  const deleteFolder = () => {
    dispatch(deleteFolderById(id));
  };
  const [checked, setChecked] = useState("");
  const Item = ({ id, name, type, lastEdit, size }) => (
    <View style={styles.table}>
      <View style={styles.columnCheckBox}>
        <RadioButton.Group>
          <RadioButton
            value={id}
            status={checked === id ? "checked" : "unchecked"}
            onPress={() => setChecked(id)}
          />
        </RadioButton.Group>
      </View>
      <View style={styles.column}>
        <Text
          onPress={() => getFolderByRepository(id)}
          style={{ color: "blue" }}
        >
          {name}
        </Text>
      </View>
      <View style={styles.column}>
        <Text>{type}</Text>
      </View>
      <View style={styles.column}>
        <Text>{lastEdit}</Text>
      </View>
      <View style={styles.column}>
        <Text>{size}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      id={item.repositoryId}
      name={item.repositoryName}
      type={item.description}
      lastEdit={"11/2/2022"}
      size={"40MB"}
    />
  );
  return (
    <View style={styles.container}>
      <LabNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.myCV}> Repository</Text>
        <View style={styles.row}>
          <View style={styles.containerSearch}>
            <TextField
              text={text}
              onChangeText={(newText) => setText(newText)}
              placeholder={" Search"}
              secureTextEntry={false}
              multiline={false}
              style={{ width: 400 }}
            />
            <Buttons text={"Search"} />
          </View>
          <View style={{ marginRight: 30 }}>
            <Buttons text={"Back"} onPressTo={() => navigation.goBack()} />
          </View>
        </View>

        <View>
          <Text style={[styles.myCV, { marginLeft: 60 }]}>
            List All Repository
          </Text>
          <View style={styles.containerButton}>
            <Buttons style={styles.button} text={"Refresh"} />
            <Buttons
              style={styles.button}
              onPressTo={() => navigation.navigate("CreateFolderInRepo")}
              text={"Create"}
            />
            <Buttons
              style={styles.button}
              text={"Delete"}
              onPress={() => deleteFolder(id)}
            />
            <Buttons style={styles.button} text={"Download"} />
          </View>
          <View style={styles.table}>
            <View style={[styles.columnCheckBox, styles.borderbot]}></View>
            <View style={[styles.column, styles.borderbot]}>
              <Text style={{ marginTop: 10, marginBottom: 10 }}>File Name</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Type</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Last Edit</Text>
            </View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>Size</Text>
            </View>
          </View>
          <SafeAreaView style={styles.flatlist}>
            <FlatList data={items} renderItem={renderItem} />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "center",
  },
  borderbot: {
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  container: {
    alignContent: "center",
  },
  table: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  columnCheckBox: {
    width: "5%",
    borderColor: "black",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  column: {
    width: "22%",
    borderColor: "black",
    borderRightWidth: 1,
    justifyContent: "center",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  containerContent: {
    width: "90%",
    backgroundColor: "white",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
  },
  containerButton: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "flex-end",
    marginRight: 30,
  },
  myCV: {
    fontWeight: "bold",
    fontSize: 35,
    marginLeft: 30,
    marginTop: 30,
  },
  button: {
    width: 150,
    marginRight: 30,
  },
  content: {
    marginTop: 50,
  },
  containerSearch: {
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Repository;
