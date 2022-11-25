import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import HTMLReactParser from 'html-react-parser';
import Separator from "../../components/Separator";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import CommentItem from "../../components/CommentItem";
import NewsItem from "../../components/NewsItem";
import HomeTopNavigator from "../../navigations/HomeNavigation";
const listNews =[{
    title: "Lionel Messi là ngôi sao mới nhất xuất hiện trong game sinh tồn PUBG Mobile ở bản cập nhật sắp tới.",
    time: "1",
    author: "s",
    view: "10",
    comment:"10",
},
    {
        title: "Vụ 3 con gái đổ xăng đốt nhà mẹ: Người dân vẫn bủn rủn khi kể lại lúc đưa các nạn nhân ra ngoài",
        time: "1",
        author: "s",
        view: "10",
        comment:"10",
    },
    {
        title: "Chiều 31/10, khắp các nẻo đường, từ quán trà đá cho tới những người đi đổ xăng ở xã Trung Hòa (huyện Yên Mỹ, tỉnh Hưng Yên) vẫn bàn tán xôn xao về vụ việc 3 người con gái đốt nhà mẹ đẻ ở thôn Thiên Lộc.  ",
        time: "1",
        author: "s",
        view: "10",
        comment:"10",
    },
    {
        title: "fgh",
        time: "1",
        author: "s",
        view: "10",
        comment:"10",
    },
]

function NewsDetail({navigation}) {
    const [comment, setComment] = useState('');
    const title = "<h1>This is heading 1</h1>\n"
    const author= "s"
    const time = "1"
    const content= "<h1>This is heading 1</h1>\n" +
        "<h2>This is heading 2</h2>\n" +
        "<h3>This is heading 3</h3>"
    const userComment= [
        {
            username: "A",
            cmt: "abc",
            time:"1",
            reply: [
                {
                    username: "B",
                    cmt: "xyz",
                    time:"2",
                },
                {
                    username: "C",
                    cmt: "123",
                    time:"3",
                }
            ]
        },
        {
            username: "A",
            cmt: "abc",
            time:"1",
            reply: [
                {
                    username: "B",
                    cmt: "xyz",
                    time:"2",
                },
                {
                    username: "C",
                    cmt: "123",
                    time:"3",
                }
            ]
        },
        {
            username: "A",
            cmt: "abc",
            time:"1",
            reply: [
                {
                    username: "B",
                    cmt: "xyz",
                    time:"2",
                },
                {
                    username: "C",
                    cmt: "123",
                    time:"3",
                }
            ]
        },
    ]
    return (
        <View>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.container}>

                <View style={styles.containerTitle}>
                    <Text >
                        {HTMLReactParser(title)}
                    </Text>
                    <Text style={styles.txt}>
                        Post by {author} on {time}
                    </Text>
                </View>
                <Separator/>
                <View View style={styles.containerTitle}>
                    <Text>
                        {HTMLReactParser(content)}
                    </Text>
                </View>
                <View style={styles.containerComment}>
                    <TextField text={comment} onChangeText={newText => setComment(newText)}
                               placeholder={" Comment Here"}
                               secureTextEntry={false}
                               multiline={true}
                               style={styles.comment}/>
                    <Buttons text={"Comment"} style={styles.button}/>
                </View>
                <FlatList
                    data={userComment}
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
                        </View>
                    )}
                />

                <View style={styles.userComment}>
                    <Separator/>
                    <Text style={styles.text}>Other News:</Text>
                    <FlatList
                        data={listNews}
                        renderItem={({ item }) => (
                            <NewsItem title={item.title} time={item.time} author={item.author} view={item.view} comments={item.comment} navigation={navigation} style={{marginLeft: 0,}} />
                        )}
                    />
                </View>

            </View>
        </View>

    );
}
const styles= StyleSheet.create(
    {
        container:{
            backgroundColor:'white',
            marginLeft:150,
            marginRight:150,
            marginTop:20,
        },
        containerTitle:{
            marginLeft:20,
        },
        comment:{
            width: 1000,
            height:50,
        },
        button:{
            height:50,
        },
        containerComment:{
            flexDirection:"row",
            alignItems:"center",
        },
        userComment:{
            backgroundColor:"#F2F2F2",
        },
        flatList:{
            marginLeft:50,
        },
        text:{
            marginLeft:30,
            fontWeight:"bold",
            fontSize:18,
            marginBottom: 20,
        },
        txt:{
            fontSize:17,
        },
    }
);
export default NewsDetail;