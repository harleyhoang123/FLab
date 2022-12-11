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

function NewsDetail({route,navigation}) {
    const res = route.params;
    console.log("Data in News detail: "+JSON.stringify(res));
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
    const formatTime=(date)=>{
        const d= new Date(date);
        const month= d.getMonth()+1;
        return d.getDate() + "/" + month + "/" + d.getFullYear();
    }
    const title = res.data.title;
    const author= res.data.author;
    const time = res.data.createdDate;
    const content= res.data.content;
    const views= res.data.views
    const [userComment, setUserComment] = useState(res.data.comments);
    return (
        <View>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <View style={styles.row}>
                        <View style={styles.containerT}>
                            <Text style={{fontSize:20, fontWeight:"Bold", marginTop:20}}>
                                {title}
                            </Text>
                            <Text style={styles.txt}>
                                Post by {author} on {formatTime(time)}              Views : {views}
                            </Text>
                        </View>
                        <View>
                            <Buttons text={"..."} style={styles.btnModal} onPressTo={() => setModalVisible(true)}/>
                            <Buttons text={"Back"} style={styles.btnModal} onPressTo={() => navigation.goBack(navigation)}/>
                            <View styles={{position: "absolute"}}>
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
                    </View>

                </View>
                <Separator/>
                <View View style={styles.containerTitle}>
                    <Text style={styles.txt}>
                        {content}
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
                {/*<FlatList*/}
                {/*    data={userComment}*/}
                {/*    renderItem={({ item }) => (*/}
                {/*        <View>*/}
                {/*            <CommentItem username={item.username} content={item.cmt} time={item.time}/>*/}
                {/*            <FlatList*/}
                {/*                style={styles.flatList}*/}
                {/*                data={item.reply}*/}
                {/*                renderItem={({ item }) => (*/}
                {/*                    <CommentItem username={item.username} content={item.cmt} time={item.time}/>*/}
                {/*                )}*/}
                {/*            />*/}
                {/*        </View>*/}
                {/*    )}*/}
                {/*/>*/}

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
            marginTop:20,
            fontSize:17,
        },
        row:{
            flexDirection:"row",
            justifyContent:"space-between",
        },
        btnModal:{
            width:30,
            height:40,
            marginBottom:10,
        },
        modal:{
            alignItems: "flex-end",
            flex:1,
        },
        modalView: {
            position:"absolute",
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