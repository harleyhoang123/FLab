import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import Buttons from "../../components/Buttons";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { RadioButton } from "react-native-paper";
import TextField from "../../components/TextField";
import { Touchable, TouchableOpacity } from "react-native-web";
import LabNavigator from "../../navigations/LabNavigator";

function RepositoryDetail({ route, navigation }) {
  const data = route.params.data;
  const items = data.items;
  const [text, setText] = useState("");
  const listFile = [
    {
      id: 1,
      name: "abc",
      type: "Folder",
      lastEdit: "abc",
      size: "102MB",
    },
    {
      id: 2,
      name: "xyz",
      type: "Folder",
      lastEdit: "xyz",
      size: "102MB",
    },
    {
      id: 3,
      name: "123",
      type: "Folder",
      lastEdit: "123",
      size: "102MB",
    },
  ];
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
        <Text onPress={() => getFolderByRepository(id)}>{name}</Text>
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
      id={item.folderId}
      name={item.folderName}
      type={"word"}
      lastEdit={"yesterday"}
      size={"40MB"}
    />
  );
  return (
    <View style={styles.container}>
      <LabNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.myCV}> Repository</Text>
          </View>
        </View>
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
        <View style={styles.bot}>
          <Text style={styles.myCV}>List All Repository</Text>
          <View style={styles.containerButton}>
            <Buttons style={styles.button} text={"Refresh"} />
            <Buttons
              style={styles.button}
              text={"Delete"}
              onPress={() => deleteFolder(id)}
            />
            <Buttons style={styles.button} text={"Download"} />
            <Buttons
              style={styles.button}
              text={"Upload"}
              o
              onPressTo={() => navigation.push("Upload")}
            />
          </View>
          <View style={styles.table}>
            <View style={[styles.columnCheckBox, styles.borderbot]}></View>
            <View style={[styles.column, styles.borderbot]}>
              <Text>File Name</Text>
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
    flex: 1,
  },
  bot: {
    marginTop: 40,
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
    flex: 1,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "white",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerButton: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "flex-end",
    marginRight: 60,
  },
  myCV: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 30,
  },
  button: {
    width: 150,
    height: 20,
    marginRight: 30,
  },
  content: {
    marginTop: 50,
  },
  containerSearch: {
    marginLeft: 30,
  },
});

export default RepositoryDetail;
