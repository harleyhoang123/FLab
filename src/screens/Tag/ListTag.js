import React, {useEffect, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import {addTag, deleteTag, getAccountAdmin, getAllTag, updateTag} from "../../networking/CustomNetworkService";
import ForumNavigation from "../../navigations/ForumNavigation";
import {Dropdown} from "react-native-element-dropdown";
import {RadioButton} from "react-native-paper";
import PaginationBar from "../../components/PaginationBar";

function ListTag({navigation}) {
    const [text, setText] = useState(null);
    const [listTag, setListTag] = useState();
    const [listAccount, setListAccount] = useState();
    const [tagName, setTagName] = useState("");
    const [ownerBy, setOwnerBy] = useState("");
    const [tagNameUpdate, setTagNameUpdate] = useState("");
    const [ownerByUpdate, setOwnerByUpdate] = useState("");
    const [checked, setChecked] = useState('');
    const [add, setAdd] = useState(false);
    const [update, setUpdate] = useState(false);
    const [deleteT, setDeleteT] = useState(false);
    const [disable, setDisable] = useState(true);
    const [numberOfElement, setNumberOfElement] = useState(0);
    useEffect(() => {
        getAllTag(text, 0, 10).then(v => {
            setListTag(v.data.items);
            setNumberOfElement(v.data.totalPage * 10)
        });
        getAccountAdmin().then(v => {
            let newArray = v.data.items.map((item) => {
                return {
                    label: item.fullName + "(" + item.email + ")",
                    value: item.email,
                };
            });
            setListAccount(newArray);
        })
    }, []);


    const callbackChangePage = (page) => {
        getAllTag(text, page-1, 10).then(v => {
            setListTag(v.data.items);
            setNumberOfElement(v.data.totalPage*10)
        });
    }
    const addATag = (tagName, ownerBy) => {
        addTag(tagName, ownerBy).then(r => getAllTag(text, 0, 10).then(v => {
            setListTag(v.data.items);
            setNumberOfElement(v.data.totalPage * 10)
        }))
    }
    const updateATag = (tagId, tagName, ownerBy) => {
        updateTag(tagId, tagName, ownerBy).then(r => {
            getAllTag(text, 0, 10).then(v => {
                setListTag(v.data.items);
                setNumberOfElement(v.data.totalPage * 10)
            })
        })
    }
    const deleteATag = (tagId) => {
        deleteTag(tagId).then(r => {
            getAllTag(text, 0, 10).then(v => {
                setListTag(v.data.items);
                setNumberOfElement(v.data.totalPage * 10)
            })
        })
    }
    const  searchTag=()=>{
        getAllTag(text, 0, 10).then(v => {
            setListTag(v.data.items);
            setNumberOfElement(v.data.totalPage * 10)
        });
    }
    const formatterDate = (date) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const d = new Date(date);
        return d.toLocaleDateString("en-US", options) + ", " + d.toTimeString().split("G")[0];
    }
    const TagItem = ({tagId, tagName, ownerBy, createdDate, createdBy, lastModifiedBy, lastModifiedDate}) => (
        <View style={styles.table}>
            <View style={styles.columnCheckBox}>
                <RadioButton.Group>
                    <RadioButton
                        value={tagId}
                        status={checked === tagId ? "checked" : "unchecked"}
                        onPress={() => {
                            setDisable(false);
                            setChecked(tagId);
                            setTagNameUpdate(tagName);
                            setOwnerByUpdate(ownerBy);
                        }}
                    />
                </RadioButton.Group>
            </View>
            <View style={styles.column}>
                <Text>{tagName}</Text>
            </View>
            <View style={styles.column}>
                <Text>{ownerBy}</Text>
            </View>
            <View style={styles.column}>
                <Text>{createdBy}</Text>
            </View>
            <View style={styles.column}>
                <Text>{formatterDate(createdDate)}</Text>
            </View>
            <View style={styles.column}>
                <Text>{lastModifiedBy}</Text>
            </View>
            <View style={styles.column}>
                <Text>{formatterDate(lastModifiedDate)}</Text>
            </View>
        </View>
    );
    return (
        <View>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.forum}>
                    <ForumNavigation navigation={navigation}/>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={add}
                    onRequestClose={() => {
                        setAdd(false);
                    }}
                >
                    <View
                        style={styles.modal}
                    >
                        <View style={styles.modalProfileView}>
                            <Text style={{fontSize: 20, fontWeight: "bold", margin: 10}}>Add a tag</Text>
                            <Text style={{fontSize: 12, marginLeft: 10}}>Tag name</Text>
                            <TextField text={tagName}
                                       style={{height: 40}}
                                       onChangeText={tagName => setTagName(tagName)}/>
                            <Text style={{fontSize: 12, marginLeft: 10}}>Owner</Text>
                            <Dropdown
                                style={styles.dropdown}
                                value={ownerBy}
                                data={listAccount}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select owner"
                                onChange={item => {
                                    setOwnerBy(item.value)
                                }}
                            />
                            <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                                <Buttons text={"Add"} style={{marginRight: 40}} onPressTo={() => {
                                    addATag(tagName, ownerBy);
                                    setAdd(false)
                                }}/>
                                <Buttons text={"Cancel"} style={{backgroundColor: '#F4F5F7'}}
                                         styleText={{color: 'black'}}
                                         onPressTo={() => setAdd(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={update}
                    onRequestClose={() => {
                        setUpdate(false);
                    }}
                >
                    <View
                        style={styles.modal}
                    >
                        <View style={styles.modalProfileView}>
                            <Text style={{fontSize: 20, fontWeight: "bold", margin: 10}}>Update a tag</Text>
                            <Text style={{fontSize: 12, marginLeft: 10}}>Tag name</Text>
                            <TextField text={tagNameUpdate}
                                       style={{height: 40}}
                                       onChangeText={tagNameUpdate => setTagNameUpdate(tagNameUpdate)}/>
                            <Text style={{fontSize: 12, marginLeft: 10}}>Owner</Text>
                            <Dropdown
                                style={styles.dropdown}
                                value={ownerByUpdate}
                                data={listAccount}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select owner"
                                onChange={item => {
                                    setOwnerByUpdate(item.value)
                                }}
                            />
                            <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                                <Buttons text={"Update"} style={{marginRight: 40}} onPressTo={() => {
                                    updateATag(checked, tagNameUpdate, ownerByUpdate);
                                    setTagNameUpdate("");
                                    setOwnerByUpdate("");
                                    setUpdate(false)
                                }}/>
                                <Buttons text={"Cancel"} style={{backgroundColor: '#F4F5F7'}}
                                         styleText={{color: 'black'}}
                                         onPressTo={() => setUpdate(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={deleteT}
                    onRequestClose={() => {
                        setDeleteT(false);
                    }}
                >
                    <View
                        style={styles.modal}
                    >
                        <View style={styles.modalProfileView}>
                            <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 20}}>Do you want to delete
                                this tag?</Text>
                            <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                                <Buttons text={"Delete"} style={{marginRight: 40}} onPressTo={() => {
                                    deleteATag(checked);
                                    setDisable(true);
                                    setDeleteT(false)
                                }}/>
                                <Buttons text={"Cancel"} style={{backgroundColor: '#F4F5F7'}}
                                         styleText={{color: 'black'}}
                                         onPressTo={() => setDeleteT(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.content}>
                    <View style={styles.containerContent}>
                        <View>
                            <Text style={styles.text}>List Tag</Text>
                        </View>
                        <View style={styles.containerSearch}>
                            <TextField text={text} onChangeText={newText => setText(newText)}
                                       placeholder={" Search"}
                                       secureTextEntry={false}
                                       multiline={false}
                                       style={{width: 400}}/>
                            <Buttons text={"Search"} style={styles.button} onPressTo={()=>searchTag()}/>
                            <Buttons text={"Update"} style={[styles.button, {marginLeft: 20}]}
                                     onPressTo={() => setUpdate(true)} disabled={disable}/>
                            <Buttons text={"Delete"} style={[styles.button, {marginLeft: 20}]} onPressTo={() => {
                                setDeleteT(true)
                            }} disabled={disable}/>
                            <Buttons text={"Add Tag"} style={[styles.button, {marginLeft: 20}]}
                                     onPressTo={() => setAdd(true)}/>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={[styles.columnCheckBox, styles.borderbot]}></View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text style={{marginTop: 10, marginBottom: 10}}>Tag Name</Text>
                        </View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text>Owner By</Text>
                        </View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text>Created By</Text>
                        </View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text>Created Date</Text>
                        </View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text>Last Modified By</Text>
                        </View>
                        <View style={[styles.column, styles.borderbot]}>
                            <Text>Last Modified Date</Text>
                        </View>
                    </View>
                    <FlatList
                        data={listTag}
                        renderItem={({item}) => (
                            <TagItem tagId={item.tagId}
                                     tagName={item.tagName}
                                     ownerBy={item.ownerBy}
                                     createdBy={item.createdBy.fullName}
                                     createdDate={item.createdDate}
                                     lastModifiedBy={item.lastModifiedBy.fullName}
                                     lastModifiedDate={item.lastModifiedDate}
                            />
                        )}
                    />
                    <PaginationBar currentSizes={10}
                                   numberOfElement={numberOfElement}
                                   callbackSelectedPage={callbackChangePage}
                    />
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
    forum: {
        flex: 0.15,
        marginTop: 20,
        alignItems: "flex-end",
    },
    content: {
        flex: 0.75,
        borderLeftWidth: 1,
    },
    containerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerSearch: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 100,
        marginTop: 10,
        marginBottom: 20,
    },
    containerButton: {
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "12%"
    },
    typeView: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    modal: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    modalProfileView: {
        width: "30%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        padding: 50,
    },
    dropdown: {
        width: "90%",
        height: 40,
        margin: 20,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
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
        backgroundColor: 'white'
    },
    column: {
        width: "15%",
        borderColor: "black",
        borderRightWidth: 1,
        justifyContent: "center",
        borderBottomWidth: 1,
        alignItems: "center",
        backgroundColor: 'white'
    },
    checkbox: {
        alignSelf: "center",

    },
    borderbot: {
        borderColor: "black",
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
});
export default ListTag;