import React, {useState} from 'react';
import {Text, StyleSheet, View} from "react-native";
import Buttons from "../../components/Buttons";
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {RadioButton} from "react-native-paper";
import TextField from "../../components/TextField";
import {Touchable, TouchableOpacity} from "react-native-web";
import LabNavigator from "../../navigations/LabNavigator";

function Repository({navigation}) {
    const [checked, setChecked] = useState("");
    const [text, setText] = useState('');
    const radioButton = (index) => (
        <RadioButton
            style={styles.checkbox}
            value={index.toString()}
            status={checked === index.toString() ? 'checked' : 'unchecked'}
            onPress={() => setChecked(index.toString())}
        />
    );
    const f = (cellData,index) => (
        <View style={styles.border}>
            <TouchableOpacity>
                <Text style={styles.textData}>{cellData}</Text>
            </TouchableOpacity>
        </View>

    );
    const rowData = [];
    const tableHead = ['', 'Name','Type', 'Last modified','Size']
    const listFile = [
        {
            id: 1,
            name: "abc",
            type:"Folder",
            lastEdit: "abc",
            size:"102MB",
        },
        {
            id: 1,
            name: "xyz",
            type:"Folder",
            lastEdit: "xyz",
            size:"102MB",
        },
        {
            id: 1,
            name: "123",
            type:"Folder",
            lastEdit: "123",
            size:"102MB",
        },
    ]
    for (let i = 0; i < listFile.length; i++) {
        let dataTable = [];
        dataTable[0] = listFile[i].id;
        dataTable[1] = listFile[i].name;
        dataTable[2] = listFile[i].type;
        dataTable[3] = listFile[i].lastEdit;
        dataTable[4] = listFile[i].size;
        rowData[i] = dataTable;
    }
    return (
        <View style={styles.container}>
            <LabNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.myCV}> Repository</Text>
                    </View>
                    <View style={styles.containerButton}>
                        <Buttons style={styles.button} text={"Refresh"}/>
                        <Buttons style={styles.button} text={"Download"}/>
                        <Buttons style={styles.button} text={"Delete"}/>
                        <Buttons style={styles.button} text={"Create folder"}/>
                        <Buttons style={styles.button} text={"Upload"} o onPressTo={() => navigation.push("Upload")}/>
                    </View>
                </View>
                <View style={styles.containerSearch}>
                    <TextField text={text} onChangeText={newText => setText(newText)}
                               placeholder={" Search"}
                               secureTextEntry={false}
                               multiline={false}
                    style={{width:400}}/>
                    <Buttons text={"Search"} />
                </View>
                <View style={styles.content}>
                    <Table borderStyle={{borderColor: 'transparent'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {
                            rowData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 0 ? radioButton(index) : cellData&& cellIndex === 1 ? f(cellData, index) : cellData}
                                                  textStyle={styles.text}/>
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flex: 1
    },
    containerContent: {
        flex: 1,
        alignSelf: "center",
        width: "90%",
        backgroundColor: 'white',
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    containerButton: {
        flexDirection: "row",
    },
    myCV: {
        fontWeight: "bold",
        fontSize: 30,
        marginLeft: 30
    },
    button: {
        width:180,
        marginRight: 30,
    },
    content: {
        marginTop: 50
    },
    head: {height: 40, backgroundColor: '#808B97'},
    text: {margin: 6},
    row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
    checkbox: {
        alignItems: "center",
        justifyContent:"center",
    },
    containerSearch:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
        marginRight:30,
    },
    textData:{
        color:'blue',
        borderBottomWidth:1
    },
    border:{
        justifyContent:"center",
        alignItems:"flex-start",
    }
});

export default Repository;