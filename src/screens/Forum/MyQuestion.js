import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ForumNavigation from "../../navigations/ForumNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import QuestionItem from "../../components/QuestionItem";
import AsyncStorage from "@react-native-community/async-storage";
import {getListMyQuestion, getListQuestion} from "../../networking/CustomNetworkService";
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

function MyQuestion({navigation}) {
    const [text, setText] = useState("");
    const [list, setList] = useState("");
    const [accountId, setAccountId] = useState();
    const [numberOfElement, setNumberOfElement] = useState(0);
    useEffect(() => {
        getAccountId().then(v => {
            setAccountId(v);
            getListMyQuestion(v, text, 0, 5).then(r => {
                setList(r.data.items);
                setNumberOfElement(r.data.totalPage * 5)
            })
        })
    }, []);
    const callbackChangePage = (page) => {
        getListMyQuestion(accountId, text, 0, 5).then(v => {
            setList(v.data.items);
            setNumberOfElement(v.data.totalPage * 5)
        })
    }
    const searchQues=()=>{
        getListMyQuestion(accountId, text, 0, 5).then(v => {
            setList(v.data.items);
            setNumberOfElement(v.data.totalPage * 5)
        })
    }
    return (
        <View>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.forum}>
                    <ForumNavigation navigation={navigation}/>
                </View>
                <View style={styles.content}>
                    <View style={styles.containerContent}>
                        <View>
                            <Text style={styles.text}>My Question</Text>
                        </View>
                        <View style={styles.containerSearch}>
                            <TextField
                                text={text}
                                onChangeText={(newText) => setText(newText)}
                                placeholder={" Search"}
                                secureTextEntry={false}
                                multiline={false}
                                style={{width: 400}}
                                onSubmitEditing={()=>searchQues()}
                            />
                            <Buttons text={"Search"} onPressTo={()=>searchQues()}/>
                            <Buttons
                                text={"Add Question"}
                                style={[styles.button, {marginLeft: 20}]}
                                onPressTo={() => navigation.push("AddQuestion")}
                            />
                        </View>
                    </View>
                    <View style={styles.typeView}>
                        <Buttons
                            text={"Interesting"}
                            style={{backgroundColor: "white", borderWidth: 1}}
                            styleText={{color: "black"}}
                        ></Buttons>
                        <Buttons
                            text={"Bountied"}
                            style={{backgroundColor: "white", borderWidth: 1}}
                            styleText={{color: "black"}}
                        ></Buttons>
                        <Buttons
                            text={"Hot"}
                            style={{backgroundColor: "white", borderWidth: 1}}
                            styleText={{color: "black"}}
                        ></Buttons>
                        <Buttons
                            text={"Week"}
                            style={{backgroundColor: "white", borderWidth: 1}}
                            styleText={{color: "black"}}
                        ></Buttons>
                        <Buttons
                            text={"Month"}
                            style={{backgroundColor: "white", borderWidth: 1}}
                            styleText={{color: "black"}}
                        ></Buttons>
                    </View>
                    <FlatList
                        data={list}
                        renderItem={({item}) => (
                            <QuestionItem
                                questionId={item.questionId}
                                title={item.title}
                                tags={item.tags}
                                score={item.score}
                                views={item.views}
                                answers={item.answers}
                                askedBy={item.askedBy.username}
                                createdDate={item.createdDate}
                                navigation={navigation}
                            />
                        )}
                    />
                    <View style={styles.containerButton}>
                        <PaginationBar currentSizes={5}
                        numberOfElement={numberOfElement}
                        callbackSelectedPage={callbackChangePage}/>
                    </View>
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
        width: 180,
    },
    typeView: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
export default MyQuestion;