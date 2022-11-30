import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Modal, TouchableOpacity} from "react-native";
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
    const [modalVisible, setModalVisible] = useState(false);
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
                    <View style={styles.row}>
                        <View style={styles.containerT}>
                            <Text >
                                {HTMLReactParser(title)}
                            </Text>
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
            width:"65%",
            alignSelf:"center",
            marginTop:20,
            flex:1,
        },
        containerTitle:{
            marginLeft:20,
        },
        comment:{
            width: "80%",
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
        row:{
            flexDirection:"row",
            justifyContent:"space-between",
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
            marginRight:"18%",
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
        containerT: {
            flex: 0.8,
        },
    }
);
export default NewsDetail;