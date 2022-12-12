import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {RadioButton} from "react-native-paper";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";

function CurriculumVitae({navigation}) {
    // const formatterDate=(date)=>{
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     const d= new Date(date);
    //     return d.toLocaleDateString("en-US", options) +", "+ d.toTimeString().split("G")[0];
    // }
    const [checked, setChecked] = useState("");
    const [text, setText] = useState("");
    const [listCV, setListCV] = useState();
    // const CVItem = ({ cvId, cvName, description, lastEdit }) => (
        // <View style={styles.table}>
        //     <View style={styles.columnCheckBox}>
        //             <RadioButton
        //                 value={cvId}
        //                 status={checked === cvId ? "checked" : "unchecked"}
        //                 onPress={() => {setChecked(cvId)}}
        //             />
        //     </View>
        //     <View style={styles.column}>
        //         <Text>
        //             {cvName}
        //         </Text>
        //     </View>
        //     <View style={styles.column}>
        //         <Text>{description}</Text>
        //     </View>
        //     <View style={styles.column}>
        //         <Text>{formatterDate(lastEdit)}</Text>
        //     </View>
        // </View>
    // );
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation} />
            <View style={styles.containerContent}>
                <Text style={styles.myCV}> List CV</Text>
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
                    <View style={styles.containerButton}>
                        <Buttons style={styles.button} text={"View"} />
                        <Buttons
                            style={styles.button}
                            text={"Upload"}
                            onPressTo={()=>navigation.push("UploadFileCV")}
                        />
                        <Buttons
                            style={styles.button}
                            text={"Update"}
                        />
                        <Buttons
                            style={styles.button}
                            text={"Delete"}
                        />
                    </View>
                    <View style={styles.table}>
                        <View style={[styles.columnCheckBox, styles.borderBot]}></View>
                        <View style={[styles.column, styles.borderBot]}>
                            <Text style={{ marginTop: 10, marginBottom: 10 }}>File Name</Text>
                        </View>
                        <View style={[styles.column, styles.borderBot]}>
                            <Text>Description</Text>
                        </View>
                        <View style={[styles.column, styles.borderBot]}>
                            <Text>Last Edit</Text>
                        </View>
                    </View>
                    <View >
                        {/*{items?.map((item) => (*/}
                        {/*    <CVItem*/}
                        {/*        key ={item.folderId}*/}
                        {/*        id={item.folderId}*/}
                        {/*        name={item.folderName}*/}
                        {/*        description={item.description}*/}
                        {/*        lastEdit={item.lastModifiedDate}*/}
                        {/*    />*/}
                        {/*))}*/}
                    </View>
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
});

export default CurriculumVitae;