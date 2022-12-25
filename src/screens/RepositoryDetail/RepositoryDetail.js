import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Linking,
  Modal,
} from "react-native";
import Buttons from "../../components/Buttons";
import { RadioButton } from "react-native-paper";
import TextField from "../../components/TextField";
import LabNavigator from "../../navigations/LabNavigator";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import {
  downLoadFileByFileId,
  getFolderDetailId,
} from "../../actions/RepositoryAction";
import { useDispatch } from "react-redux";
import {
  deleteFolderOrFile,
  getListFolderDetail,
} from "../../networking/CustomNetworkService";

function RepositoryDetail({ route, navigation }) {
  const data = route.params.data;
  const parentFolderId = route.params.parentFolderId;
  const folderName = route.params.folderName;
  const [itemsFile, setItemsFile] = useState(data.listFile);
  const [itemsFolder, setItemsFolder] = useState(data.listFolder);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [typeChecked, setTypeChecked] = useState("");
  const [checked, setChecked] = useState("");
  const [fName, setFName] = useState("");
  const [description, setDescription] = useState("");
  const [urlDownload, setUrlDownload] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [disable, setDisable] = useState(true);
  console.log("folderName in Detail" + folderName);
  console.log("parentFolderId in Detail" + parentFolderId);
  const downLoadFileHandler = () => {
    Linking.openURL(urlDownload).then((r) => {});
  };
  const deleteAFileOrFolder = (id, type, parentFolderId) => {
    deleteFolderOrFile(parentFolderId, id, type, navigation).then((v) =>
      getListFolderDetail(parentFolderId, navigation).then((r) => {
        setItemsFile(r.data.listFile);
        setItemsFolder(r.data.listFolder);
      })
    );
  };
  const formatterDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const d = new Date(date);
    return (
      d.toLocaleDateString("en-US", options) +
      ", " +
      d.toTimeString().split("G")[0]
    );
  };
  const getFolderDetailIdHandler = (id, name) => {
    dispatch(getFolderDetailId(id, name, navigation));
  };
  const handleUpdate = (type) => {
    setDisable(true);
    if (type === "Folder") {
      navigation.push("UpdateSubFolder", {
        parentFolderName: folderName,
        parentFolderId: parentFolderId,
        folderId: checked,
        folderName: fName,
        description: description,
      });
    } else {
      navigation.push("UpdateFile", {
        parentFolderName: folderName,
        parentFolderId: parentFolderId,
        fileId: checked,
        type: typeChecked,
        fileName: fName,
        description: description,
      });
    }
  };

  const ItemFile = ({
    id,
    name,
    type,
    description,
    lastEdit,
    size,
    publicURL,
  }) => (
    <View style={styles.table}>
      <View style={styles.columnCheckBox}>
        <RadioButton.Group>
          <RadioButton
            value={id}
            status={checked === id ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(id);
              setTypeChecked(type);
              setFName(name);
              setDescription(description);
              setUrlDownload(publicURL);
              setDisable(false);
            }}
          />
        </RadioButton.Group>
      </View>
      <View style={styles.column}>
        <Text>{name}</Text>
      </View>
      <View style={styles.column}>
        <Text>{description}</Text>
      </View>
      <View style={styles.column}>
        <Text>{type}</Text>
      </View>
      <View style={styles.column}>
        <Text>{formatterDate(lastEdit)}</Text>
      </View>
      <View style={styles.column}>
        <Text>{size}</Text>
      </View>
    </View>
  );

  const ItemFolder = ({
    folderId,
    folderName,
    type,
    description,
    lastModifiedDate,
    parentFolderName,
  }) => (
    <View style={styles.table}>
      <View style={styles.columnCheckBox}>
        <RadioButton.Group>
          <RadioButton
            value={folderId}
            status={checked === folderId ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(folderId);
              setTypeChecked(type);
              setFName(folderName);
              setDescription(description);
              console.log("File ID in RepositoryDetail " + checked);
            }}
          />
        </RadioButton.Group>
      </View>
      <View style={styles.column}>
        <Text
          onPress={() =>
            getFolderDetailIdHandler(
              folderId,
              parentFolderName + "/" + folderName
            )
          }
          style={{ color: "blue" }}
        >
          {folderName}
        </Text>
      </View>
      <View style={styles.column}>
        <Text>{description}</Text>
      </View>
      <View style={styles.column}>
        <Text>{type}</Text>
      </View>
      <View style={styles.column}>
        <Text>{formatterDate(lastModifiedDate)}</Text>
      </View>
      <View style={styles.column}>
        <Text>{"--"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ProjectNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showConfirm}
          onRequestClose={() => {
            setShowConfirm(false);
          }}
        >
          <View style={styles.modalDelete}>
            <View style={styles.modalDeleteView}>
              {typeChecked === "Folder" ? (
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
                >
                  Do you want to delete this folder?
                </Text>
              ) : (
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
                >
                  Do you want to delete this file?
                </Text>
              )}
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Buttons
                  text={"Delete"}
                  style={{ marginRight: 40 }}
                  onPressTo={() => {
                    deleteAFileOrFolder(checked, typeChecked, parentFolderId);
                    setDisable(true);
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
        <View style={styles.header}>
          <View>
            <Text style={styles.myCV}> {folderName}/</Text>
          </View>
        </View>
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
              text={"Update"}
              disabled={disable}
              onPressTo={() => handleUpdate(typeChecked)}
            />
            <Buttons
              style={styles.button}
              text={"Delete"}
              disabled={disable}
              onPressTo={() => {
                setShowConfirm(true);
              }}
            />
            <Buttons
              onPressTo={downLoadFileHandler}
              style={styles.button}
              text={"Download"}
              disabled={disable}
            />
            <Buttons
              style={styles.button}
              text={"Upload"}
              onPressTo={() =>
                navigation.push("Upload", {
                  parentFolderId: parentFolderId,
                  folderName: folderName,
                })
              }
            />
          </View>
          <View style={styles.table}>
            <View style={[styles.columnCheckBox, styles.borderbot]}></View>
            <View style={[styles.column, styles.borderbot]}>
              <Text style={{ marginTop: 10, marginBottom: 10 }}>Name</Text>
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
          <View>
            {itemsFile?.map((item) => (
              <ItemFile
                key={item.fileId}
                id={item.fileId}
                name={item.fileName}
                type={item.type}
                description={item.description}
                lastEdit={item.lastModifiedDate}
                size={item.size}
                publicURL={item.publicURL}
              />
            ))}
            {itemsFolder?.map((item) => (
              <ItemFolder
                key={item.folderId}
                folderId={item.folderId}
                folderName={item.folderName}
                type={"Folder"}
                description={item.description}
                lastModifiedDate={item.lastModifiedDate}
                parentFolderName={folderName}
              />
            ))}
          </View>
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
    width: "15%",
    borderColor: "black",
    borderRightWidth: 1,
    justifyContent: "center",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  containerContent: {
    width: "100%",
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
  modalDelete: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalDeleteView: {
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

export default RepositoryDetail;
