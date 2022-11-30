import React, {useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ForumNavigation from "../../navigations/ForumNavigation";
import Separator from "../../components/Separator";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import CommentItem from "../../components/CommentItem";
import QuestionItem from "../../components/QuestionItem";
import VoteComponent from "../../components/VoteComponent";

const listQuestion = [{
    title: "Lionel Messi là ngôi sao mới nhất xuất hiện trong game sinh tồn PUBG Mobile ở bản cập nhật sắp tới.",
    time: "1",
    author: "s",
    views: "10",
    answers: "10",
    votes: "10",
    tags: ["react-native", "react", "web",],
},
    {
        title: "Vụ 3 con gái đổ xăng đốt nhà mẹ: Người dân vẫn bủn rủn khi kể lại lúc đưa các nạn nhân ra ngoài",
        time: "1",
        author: "s",
        views: "10",
        answers: "10",
        votes: "10",
        tags: ["react-native", "react", "web",],
    },
    {
        title: "Chiều 31/10, khắp các nẻo đường, từ quán trà đá cho tới những người đi đổ xăng ở xã Trung Hòa (huyện Yên Mỹ, tỉnh Hưng Yên) vẫn bàn tán xôn xao về vụ việc 3 người con gái đốt nhà mẹ đẻ ở thôn Thiên Lộc.  ",
        time: "1",
        author: "s",
        views: "10",
        answers: "10",
        votes: "10",
        tags: ["react-native", "react", "web",],
    },
]

function QuestionDetail({navigation}) {
    const [comment, setComment] = useState('');
    const [answer, setAnswer] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const title = "Unable to resolve dependency for installing html-parser"
    const author = "sa"
    const time = "11"
    const views = "10"
    const content = "I am trying to install npm install react-html-parser in my current project. So I am trying to install the npm install react-html-parser but after I use the command."
    const userComment = [
        {
            username: "A",
            cmt: "abc",
            time: "1",
        },
        {
            username: "A",
            cmt: "abc",
            time: "1",
        },
        {
            username: "A",
            cmt: "abc",
            time: "1",
        },
    ]
    const tags = ["react-native", "react", "web",]
    const numberAnswer="3"
    const userAnswer = [
        {
            username: "A",
            cmt: "abc",
            time: "1",
            reply: [
                {
                    username: "B",
                    cmt: "xyz",
                    time: "2",
                },
                {
                    username: "C",
                    cmt: "123",
                    time: "3",
                }
            ]
        },
        {
            username: "A",
            cmt: "abc",
            time: "1",
            reply: [
                {
                    username: "B",
                    cmt: "xyz",
                    time: "2",
                },
                {
                    username: "C",
                    cmt: "123",
                    time: "3",
                }
            ]
        },
        {
            username: "A",
            cmt: "abc",
            time: "1",
            reply: [
                {
                    username: "B",
                    cmt: "xyz",
                    time: "2",
                },
                {
                    username: "C",
                    cmt: "123",
                    time: "3",
                }
            ]
        },
    ]
    const votes="5"
    const [value, setValue] = useState('Highest score (default)');
    const data=[
        {label: 'Highest score (default)', value: 'Highest score (default)'},
        {label: 'Trending (recent votes count more)', value: 'Trending (recent votes count more)'},
        {label: 'Date modified (newest first)', value: 'Date modified (newest first)'},
        {label: 'Date created (oldest first)', value: 'Date created (oldest first)'},
    ]
    return (
        <View>

            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.forum}>
                    <ForumNavigation navigation={navigation}/>
                </View>
                <View style={styles.content}>
                    <View style={styles.containerTitle}>
                        <View style={styles.containerT}>
                            <Text style={styles.textTitle}>{title}</Text>
                            <Text style={styles.textContent}>Post by {author} on {time}                 Viewed {views} times</Text>
                        </View>
                        <View>
                            <Buttons text={"..."} style={styles.btnModal} onPressTo={() => setModalVisible(true)}/>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={()=>  setModalVisible(!modalVisible) }
                                    style={styles.modal}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(!modalVisible)}}
                                                          style={[styles.buttonModal]}>
                                            <Text style={styles.textStyle}>Add Question</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(!modalVisible)}}
                                                          style={[styles.buttonModal]}>
                                            <Text style={styles.textStyle}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(!modalVisible)}}
                                                          style={[styles.buttonModal]}>
                                            <Text style={styles.textStyle}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                        </View>
                    </View>
                    <Separator/>
                    <View style={styles.containerContent}>
                        <VoteComponent votes={votes}/>
                        <View style={styles.containerCon}>
                            <Text style={styles.textContent}>{content}</Text>
                            <FlatList
                                style={styles.flatListTag}
                                horizontal={true}
                                data={tags}
                                renderItem={({item}) => (
                                    <TouchableOpacity>
                                        <Text style={styles.textView}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                    <View style={{marginLeft:100,marginTop:50,}}>
                        <FlatList
                            data={userComment}
                            renderItem={({item}) => (
                                <CommentItem username={item.username} content={item.cmt} time={item.time}/>
                            )}
                        />
                        <View style={styles.containerComment}>
                            <TextField text={comment} onChangeText={newText => setComment(newText)}
                                       placeholder={" Comment Here"}
                                       secureTextEntry={false}
                                       multiline={true}
                                       style={styles.comment}/>
                            <Buttons text={"Comment"} style={styles.button}/>
                        </View>
                    </View>
                    <View style={styles.containerTitle}>
                        <Text style={styles.textContent}>{numberAnswer} Answers</Text>
                        <View style={styles.containerComment}>
                            <Text style={styles.textContent}>Sorted by: </Text>
                            <Dropdown
                                style={styles.dropdown}
                                value={value}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                onChange={item => {
                                    setValue(item.value)
                                }}
                            />
                        </View>
                    </View>
                    <FlatList
                        data={userAnswer}
                        renderItem={({ item }) => (
                            <View>
                                <CommentItem username={item.username} content={item.cmt} time={item.time}/>
                                <FlatList
                                    style={styles.flatList}
                                    data={item.reply}
                                    renderItem={({ item }) => (
                                        <CommentItem username={item.username} content={item.cmt} time={item.time}/>
                                    )}
                                />
                                <Separator/>
                            </View>
                        )}
                    />
                    <Text style={styles.textContent}>Your Answers</Text>
                        <TextField text={comment} onChangeText={newText => setComment(newText)}
                                   placeholder={" Answer Here"}
                                   secureTextEntry={false}
                                   multiline={true}
                                   style={[styles.comment,{height: 500}]}/>
                        <Buttons text={"Post Your Answer"} style={[styles.button, {marginLeft:20}]}/>

                    <Separator/>
                    <View style={{marginBottom:30}}>
                        <Text style={styles.text}>Related Question:</Text>
                        <FlatList
                            data={listQuestion}
                            renderItem={({item}) => (
                                <QuestionItem title={item.title} time={item.time} author={item.author}
                                              navigation={navigation} views={item.views}
                                              tags={item.tags} votes={item.votes} answers={item.answers}/>
                            )}
                        />
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
        backgroundColor: 'white',
        marginTop: 20,
        paddingLeft: 50,
    },
    containerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    comment: {
        width: 1000,
        height: 50,
    },
    button: {
        width: 200,
    },
    containerComment: {
        flexDirection: "row",
        alignItems: "center",
    },
    flatList: {
        marginLeft: 100,
    },
    text: {
        marginLeft: 30,
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 20,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
    },
    textContent: {
        fontSize: 20,
        marginRight:20,
    },
    containerT: {
        flex: 0.8,
        marginTop:20,
    },
    containerC: {
        paddingLeft: 200,
    },
    flatListTag: {
        marginBottom:10,
        marginTop:10,

    },
    textView: {
        fontSize: 17,
        marginRight: 10,
        backgroundColor:'#E1ECF4',
    },
    dropdown: {
        width:300,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    containerContent:{
        flexDirection:"row",
    },
    containerCon:{
        width:"90%"
    },
    btnModal:{
        width:30,
        height:40,
    },
    modal:{
        alignItems: "flex-end",
        flex:1,
    },
    modalView: {
        marginTop: 110,
        marginRight:"10%",
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    textStyle: {
        fontWeight: "bold",
    },
    buttonModal:{
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: 135,
    },
});

export default QuestionDetail;