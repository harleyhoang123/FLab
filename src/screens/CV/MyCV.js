import React, {useState} from 'react';
import { CheckBox, Text, StyleSheet, View } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import Buttons from "../../components/Buttons";
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
function MyCv({navigation}) {
    const [isSelected, setSelection] = useState(false);
    const element = (data, index) => (
        <CheckBox
            value={isSelected}
            onValueChange={isSelected =>setSelection(isSelected)}
            style={styles.checkbox}
        />
    );
    const rowData = [];
    const tableHead= ['', 'Name', 'Last Edited']
    const listCV=[
        {
            id:1,
            name:"abc",
            lastEdit:"abc",
        },
        {
            id:2,
            name:"abc",
            lastEdit:"abc",
        },
        {
            id:3,
            name:"abc",
            lastEdit:"abc",
        },
    ]
    for (let i = 0; i < listCV.length; i++) {
        let dataTable = [];
        dataTable[0] = listCV[i].id;
        dataTable[1] = listCV[i].name;
        dataTable[2] = listCV[i].lastEdit;
        rowData[i] = dataTable;
    }
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.myCV}> My CV</Text>
                    </View>
                    <View style={styles.containerButton}>
                        <Buttons style={styles.button} text={"Download"} />
                        <Buttons style={styles.button} text={"Update"} />
                        <Buttons style={styles.button} text={"Delete"} />
                        <Buttons style={styles.button} text={"Upload"} />
                    </View>
                </View>
                <View style={styles.content}>
                    <Table borderStyle={{borderColor: 'transparent'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {
                            rowData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 0 ? element(cellData, index) : cellData} textStyle={styles.text}/>
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
    container:{
        alignContent:"center",
        flex:1
    },
    containerContent:{
        flex:1,
        alignSelf:"center",
        width:"60%",
        backgroundColor:'white',
    },
    header:{
        marginTop:30,
        flexDirection: 'row',
        justifyContent:"space-between",
    },
    containerButton:{
        flexDirection:"row",
    },
    myCV:{
        fontWeight:"bold",
        fontSize:30,
        marginLeft:30
    },
    button:{
      marginRight:30,
    },
    content:{
        marginTop:50
    },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    checkbox: {
        alignSelf: "center",
    },
});
export default MyCv;