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
  const parentFolderId = route.params.parentFolderId;
  const folderName = route.params.folderName;
  const itemsFile = data.listFile;
  const itemsFolder = data.listFolder;
  const [text, setText] = useState("");
  const [checked, setChecked] = useState("");

  const Item = ({ id, name, type, description, lastEdit, size }) => (
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
        <Text>{description}</Text>
      </View>
      <View style={styles.column}>
        <Text>{lastEdit}</Text>
      </View>
      <View style={styles.column}>
        <Text>{size}</Text>
      </View>
    </View>
  );

  const ItemFolder = ({
    folderId,
    folderName,
    description,
    lastModifiedDate,
  }) => (
    <View style={styles.table}>
      <View style={styles.columnCheckBox}>
        <RadioButton.Group>
          <RadioButton
            value={folderId}
            status={checked === folderId ? "checked" : "unchecked"}
            onPress={() => setChecked(id)}
          />
        </RadioButton.Group>
      </View>
      <View style={styles.column}>
        <Text onPress={() => getFolderByRepository(id)}>{folderName}</Text>
      </View>
      <View style={styles.column}>
        <Text>{"Folder"}</Text>
      </View>
      <View style={styles.column}>
        <Text>{description}</Text>
      </View>
      <View style={styles.column}>
        <Text>{lastModifiedDate}</Text>
      </View>
      <View style={styles.column}>
        <Text>{"--"}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      id={item.fileId}
      name={item.fileName}
      type={item.type}
      description={item.description}
      lastEdit={item.lastModifiedDate}
      size={item.size}
    />
  );

  const renderItemFolder = ({ item }) => (
    <ItemFolder
      folderId={item.folderId}
      folderName={item.folderName}
      description={item.description}
      lastModifiedDate={item.lastModifiedDate}
    />
  );
  return (
    <View style={styles.container}>
      <LabNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.myCV}> {folderName}/</Text>
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
          <View style={styles.containerButton}>
            <Buttons style={styles.button} text={"Refresh"} />
            <Buttons
              style={styles.button}
              text={"Create Folder"}
              onPressTo={() =>
                navigation.push("CreateSubFolder", {
                  parentFolderId: parentFolderId,
                  folderName: folderName,
                })
              }
            />
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
              <Text>Description</Text>
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
          <SafeAreaView>
            <FlatList data={itemsFile} renderItem={renderItem} />
            <FlatList data={itemsFolder} renderItem={renderItemFolder} />
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
    marginLeft: "12%",
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
    width: "15%",
    borderColor: "black",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    justifyContent: "center",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  containerContent: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
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
    marginRight: 30,
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
