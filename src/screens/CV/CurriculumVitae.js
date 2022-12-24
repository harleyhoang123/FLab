import React, {useEffect, useState} from 'react';
import {Linking, Modal, StyleSheet, Text, View} from "react-native";
import {RadioButton} from "react-native-paper";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import AsyncStorage from "@react-native-community/async-storage";
import {
    deleteCVbyAccountId,
    getCVbyAccountId, getListAllNews,
} from "../../networking/CustomNetworkService";
import PaginationBar from "../../components/PaginationBar";

const getAccountId = async () => {
    try {
        const accountId = await AsyncStorage.getItem("@accountId");
        console.log("AccountId: " + accountId);
        return accountId;
    } catch (e) {
        console.log("Can't get account id: " + e);
    }
};

function CurriculumVitae({navigation}) {
    const [checked, setChecked] = useState("");
    const [cvName, setCvName] = useState("");
    const [description, setDescription] = useState("");
    const [text, setText] = useState("");
    const [accountId, setAccountId] = useState("");
    const [listCV, setListCV] = useState();
    const [showConfirm, setShowConfirm] = useState(false);
    const [disable, setDisable] = useState(true);
    const [numberOfElement, setNumberOfElement] = useState(0);
    useEffect(() => {
        getAccountId().then(v => {
            {
                setAccountId(v);
                getCVbyAccountId(v, text, 0, 10).then(r => {
                    setListCV(r.data.items)
                    setNumberOfElement(r.data.totalPage * 10)
                })
            }
        });
    }, []);
    const callbackChangePage = (page) => {
        getCVbyAccountId(accountId, text, page - 1, 10).then(v => {
            setListCV(v.data.items);
            setNumberOfElement(v.data.totalPage * 10)
        })
    }
    const searchCV = () => {
        getCVbyAccountId(accountId, text, 0, 10).then(v => {
            setListCV(v.data.items);
            setNumberOfElement(v.data.totalPage * 10)
        })
    }
    const openURL = (url) => {
        Linking.openURL(url).then(r => {
        });
    }
    const deleteCV = () => {
        deleteCVbyAccountId(accountId, checked).then(v => {
            getCVbyAccountId(accountId).then(r => {
                setListCV(r.data.items);
                setDisable(true);
            })
        })
    }
    const CVItem = ({cvId, cvName, description, url}) => (
        <View style={styles.table}>
            <View style={styles.columnCheckBox}>
                <RadioButton
                    value={cvId}
                    status={checked === cvId ? "checked" : "unchecked"}
                    onPress={() => {
                        setChecked(cvId);
                        setCvName(cvName);
                        setDescription(description)
                        setDisable(false)
                    }}
                />
            </View>
            <View style={styles.column}>
                <Text>
                    {cvName}
                </Text>
            </View>
            <View style={styles.column}>
                <Text>{description}</Text>
            </View>
            <View style={styles.column}>
                <Text style={{color: 'blue'}} onPress={() => {
                    openURL(url)
                }}>{url}</Text>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showConfirm}
                    onRequestClose={() => {
                        setShowConfirm(false);
                    }}>
                    <View style={styles.modalDelete}>
                        <View style={styles.modalDeleteView}>
                            <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 20}}>Do you want to delete
                                this CV?</Text>
                            <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                                <Buttons text={"Delete"} style={{marginRight: 40}} onPressTo={() => {
                                    deleteCV()
                                    setShowConfirm(false)
                                }}/>
                                <Buttons text={"Cancel"} style={{backgroundColor: '#F4F5F7'}}
                                         styleText={{color: 'black'}}
                                         onPressTo={() => setShowConfirm(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.myCV}> List CV</Text>
                <View style={styles.row}>
                    <View style={styles.containerSearch}>
                        <TextField
                            text={text}
                            onChangeText={text => setText(text)}
                            placeholder={" Search"}
                            secureTextEntry={false}
                            multiline={false}
                            style={{width: 400}}
                            onSubmitEditing={() => searchCV()}
                        />
                        <Buttons text={"Search"} onPressTo={() => searchCV()}/>
                    </View>
                    <View style={{marginRight: 30}}>
                        <Buttons text={"Back"} onPressTo={() => navigation.goBack()}/>
                    </View>
                </View>
                <View style={styles.containerButton}>

                    <Buttons
                        style={styles.button}
                        disabled={disable}
                        text={"Update"}
                        onPressTo={() => {
                            setDisable(true)
                            navigation.push("UpdateCv", {cvId: checked, cvName: cvName, description: description})
                        }}
                    />
                    <Buttons
                        style={styles.button}
                        text={"Delete"}
                        disabled={disable}
                        onPressTo={() => setShowConfirm(true)}
                    />
                    <Buttons
                        style={styles.button}
                        text={"Upload"}
                        onPressTo={() => navigation.push("UploadFileCV")}
                    />
                </View>
                <View style={styles.table}>
                    <View style={[styles.columnCheckBox, styles.borderBot]}></View>
                    <View style={[styles.column, styles.borderBot]}>
                        <Text style={{marginTop: 10, marginBottom: 10}}>CV Name</Text>
                    </View>
                    <View style={[styles.column, styles.borderBot]}>
                        <Text>Description</Text>
                    </View>
                    <View style={[styles.column, styles.borderBot]}>
                        <Text>View</Text>
                    </View>
                </View>
                <View>
                    {listCV?.map((item) => (
                        <CVItem
                            key={item.cvId}
                            cvId={item.cvId}
                            cvName={item.cvName}
                            description={item.description}
                            url={item.cvUrl}
                        />
                    ))}
                </View>
                <PaginationBar numberOfElement={numberOfElement} currentSizes={10}
                               callbackSelectedPage={callbackChangePage}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
    },
    borderBot: {
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
        width: "25%",
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

export default CurriculumVitae;