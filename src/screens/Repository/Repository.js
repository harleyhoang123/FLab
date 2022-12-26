import React, {useState} from "react";
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Button,
    Modal, TouchableOpacityComponent,
} from "react-native";
import Buttons from "../../components/Buttons";
import {RadioButton} from "react-native-paper";
import TextField from "../../components/TextField";
import LabNavigator from "../../navigations/LabNavigator";
import {useDispatch} from "react-redux";
import {getFolderDetailId} from "../../actions/RepositoryAction";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import {
    deleteFolderInRepository,
    getListFolder,
} from "../../networking/CustomNetworkService";
import AsyncStorage from "@react-native-community/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const getRepoId = async () => {
    try {
        const repoId = await AsyncStorage.getItem("@currentProjectId");
        console.log("repoId: " + repoId);
        return repoId;
    } catch (e) {
        console.log("Can't get repo id: " + e);
    }
};

const getRoleInProject = async () => {
    try {
        const role = await AsyncStorage.getItem("@roleInProject");
        console.log("role: " + role);
        return role;
    } catch (e) {
        console.log("Can't get role: " + e);
    }
};

function Repository({route, navigation}) {
    const data = route.params.data;
    const [items, setItems] = useState(data.items);
    console.log("Data in repository: " + JSON.stringify(data));
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const [repoId, setRepoId] = useState("");
    getRepoId().then((v) => setRepoId(v));
    const [role, setRole] = useState("");
    getRoleInProject().then((v) => setRole(v));
    const getFolderDetailIdHandler = (id, name) => {
        dispatch(getFolderDetailId(id, name, navigation));
    };

    const formatterDate = (date) => {
        const options = {year: "numeric", month: "long", day: "numeric"};
        const d = new Date(date);
        return (
            d.toLocaleDateString("en-US", options) +
            ", " +
            d.toTimeString().split("G")[0]
        );
    };
    const deleteAFolder = (repoId, folderId) => {
        deleteFolderInRepository(repoId, folderId, navigation).then((r) => {
            getListFolder(repoId, navigation).then((v) => setItems(v.data.items));
        });
    };
    const [checked, setChecked] = useState("");
    const [folderName, setFolderName] = useState("");
    const [description, setDescription] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [disable, setDisable] = useState(true);
    const Item = ({id, name, description, lastEdit}) => (
        <View style={styles.table}>
            <View style={styles.columnCheckBox}>
                <RadioButton.Group>
                    <RadioButton
                        value={id}
                        status={checked === id ? "checked" : "unchecked"}
                        onPress={() => {
                            setChecked(id);
                            setFolderName(name);
                            setDescription(description);
                            setDisable(false);
                        }}
                    />
                </RadioButton.Group>
            </View>
            <View style={[styles.column,{ alignItems: "flex-start", paddingLeft:10}]}>
                <TouchableOpacity onPress={() => getFolderDetailIdHandler(id, name)}>
                    <View style={{flexDirection: "row"}}>
                        <MaterialCommunityIcons name={"folder-multiple-outline"} size={25}
                                                color="#3f444a"></MaterialCommunityIcons>
                        <Text style={{color: "blue", marginLeft: 10}}>{name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.column,{ alignItems: "flex-start", paddingLeft:10}]}>
                <Text>{description}</Text>
            </View>
            <View style={styles.column}>
                <Text>{formatterDate(lastEdit)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ProjectNavigator navigation={navigation}/>
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
                            <Text
                                style={{fontSize: 20, fontWeight: "bold", marginBottom: 20}}
                            >
                                Do you want to delete this folder?
                            </Text>
                            <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                                <Buttons
                                    text={"Delete"}
                                    style={{marginRight: 40}}
                                    onPressTo={() => {
                                        deleteAFolder(repoId, checked);
                                        setDisable(true);
                                        setShowConfirm(false);
                                    }}
                                />
                                <Buttons
                                    text={"Cancel"}
                                    style={{backgroundColor: "#F4F5F7"}}
                                    styleText={{color: "black"}}
                                    onPressTo={() => setShowConfirm(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.myCV}> Repository</Text>
                <View style={styles.row}>
                    <View style={styles.containerSearch}>
                        <TextField
                            text={text}
                            onChangeText={(newText) => setText(newText)}
                            placeholder={" Search"}
                            secureTextEntry={false}
                            multiline={false}
                            style={{width: 400}}
                        />
                        <Buttons text={"Search"}/>
                    </View>
                    <View style={{marginRight: 30}}>
                        <Buttons text={"Back"} onPressTo={() => navigation.goBack()}/>
                    </View>
                </View>

                <View>
                    <View style={styles.containerButton}>
                        <Buttons
                            style={styles.button}
                            onPressTo={() => navigation.push("CreateFolderInRepo")}
                            text={"Create Folder"}
                        />
                        <Buttons
                            style={styles.button}
                            text={"Update"}
                            disabled={disable}
                            onPressTo={() => {
                                navigation.push("UpdateFolderInRepo", {
                                    repoId: repoId,
                                    folderId: checked,
                                    folderName: folderName,
                                    description: description,
                                });
                                setDisable(true);
                            }}
                        />
                        {role !== "MEMBER" ? (
                            <Buttons
                                style={styles.button}
                                text={"Delete"}
                                disabled={disable}
                                onPressTo={() => setShowConfirm(true)}
                            />
                        ) : null}
                    </View>
                    <View style={styles.table}>
                        <View style={[styles.columnCheckBox, styles.borderbot]}></View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text style={{marginTop: 10, marginBottom: 10}}>Name</Text>
                        </View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text>Description</Text>
                        </View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text>Last Edit</Text>
                        </View>
                    </View>
                    <SafeAreaView style={styles.flatlist}>
                        {items?.map((item) => (
                            <Item
                                key={item.folderId}
                                id={item.folderId}
                                name={item.folderName}
                                description={item.description}
                                lastEdit={item.lastModifiedDate}
                            />
                        ))}
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

export default Repository;
