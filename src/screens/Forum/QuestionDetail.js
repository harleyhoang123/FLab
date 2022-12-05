import React, {useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Dropdown} from 'react-native-element-dropdown';
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ForumNavigation from "../../navigations/ForumNavigation";
import Separator from "../../components/Separator";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import CommentItem from "../../components/CommentItem";
import QuestionItem from "../../components/QuestionItem";
import VoteComponent from "../../components/VoteComponent";
import {useDispatch} from "react-redux";
import {
    closeQuestion,
    getListQuestion,
    getQuestionDetailByQuestionId,
    postAnswer,
    postComment
} from "../../actions/ForumAction";
import AnswerComponent from "../../components/AnswerComponent";

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

function QuestionDetail({route,navigation}) {

    const res = route.params;

    console.log("Data in question detail: "+JSON.stringify(res));
    const [content, setContent] = useState('');
    const [answer, setAnswer] = useState('');
    const [addedComment, setAddedComment] = useState();
    // const commentQuestion=res.data.comments;
    const [userComment, setUserComment] = useState(res.data.comments);
    // const answerQuestion=res.data.answers
    const [userAnswer, setUserAnswer] = useState(res.data.answers);
    const title = res.data.title;
    const questionId = res.data.questionId;
    const author = res.data.createdBy.fullName;
    const time = res.data.createdDate;
    const views = res.data.views;
    const problem = res.data.problem;
    const triedCase = res.data.triedCase;
    const tags = res.data.tags;
    const numberAnswer=res.data.answers.length;
    const votes=res.data.score;
    const [value, setValue] = useState('Highest score (default)');
    const formatTime=(date)=>{
        const d= new Date(date);
        return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    }
    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(getQuestionDetailByQuestionId(questionId, navigation,true));
    };
    const handleClose = () => {
        dispatch(closeQuestion(questionId, navigation));
    };
    const handleComment = () => {
        dispatch(postComment(content,questionId, navigation));
        setContent('');
    };
    const handleAnswer = () => {
        setUserAnswer([...userAnswer, answer]);
        dispatch(postAnswer(answer,questionId));
        setAnswer('');
    };
    const handleBack = () => {
        dispatch(getListQuestion(navigation));
    };
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
                            <Text style={styles.textContent}>Post by {author} on {formatTime(time)}                 Viewed {views} times</Text>
                        </View>
                        <View>
                            <Buttons text={"AddQuestion"} style={[styles.button,{marginBottom:20}]} onPressTo={() => navigation.push("AddQuestion")}/>
                            <Buttons text={"Back"} style={styles.button} onPressTo={handleBack}/>
                        </View>
                    </View>
                    <Separator/>
                    <View style={styles.containerContent}>
                        <VoteComponent votes={votes} size={"4x"}/>
                        <View style={styles.containerCon}>
                            <Text style={styles.textContent}>{problem}</Text>
                            <Text style={styles.textContent}>{triedCase}</Text>
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
                            <View style={styles.containerComment}>
                                <View style={styles.login}>
                                    <TouchableOpacity onPress={handleEdit}>
                                        <Text style={styles.txt}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.login}>
                                    <TouchableOpacity onPress={handleClose}>
                                        <Text style={styles.txt}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginLeft:100,marginTop:50,}}>
                        {userComment?.map((item)=>(
                            <View key={item.commentId}>
                                <CommentItem questionId={questionId} navigation={navigation} commentId={item.commentId} username={item.createdBy.fullName} content={item.content} time={formatTime(item.createdDate)}/>
                            </View>
                        ))}
                        <View style={styles.containerComment}>
                            <TextField text={content} onChangeText={newText => setContent(newText)}
                                       placeholder={" Comment Here"}
                                       secureTextEntry={false}
                                       multiline={true}
                                       style={styles.comment}/>
                            <Buttons text={"Comment"} onPressTo={handleComment} style={styles.button}/>
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
                    {userAnswer?.map((item)=>(
                        <View key={item.answerId}>
                        <AnswerComponent questionId={questionId} navigation={navigation} answerId={item.answerId} votes={item.score} createdBy={item.createdBy.fullName} content={item.content} createdDate={item.createdDate} userAnswerComment={item.comments}/>
                        </View>
                    ))
                    }
                    <Text style={styles.textContent}>Your Answers</Text>
                        <TextField text={answer} onChangeText={newText => setAnswer(newText)}
                                   placeholder={" Answer Here"}
                                   secureTextEntry={false}
                                   multiline={true}
                                   style={[styles.comment,{height: 300, width: "95%"}]}/>
                        <Buttons text={"Post Your Answer"} onPressTo={handleAnswer} style={[styles.button, {marginLeft:20}]}/>

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
        width: "90%",
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
    login: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
    },
    txt: {
        fontSize: 18,
        fontWeight: "bold",
        borderBottomWidth: 1,
    },
});

export default QuestionDetail;
