import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ForumNavigation from "../../navigations/ForumNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import QuestionItem from "../../components/QuestionItem";
const listQuestion =[{
    title: "Lionel Messi là ngôi sao mới nhất xuất hiện trong game sinh tồn PUBG Mobile ở bản cập nhật sắp tới.",
    time: "1",
    author: "s",
    views: "10",
    answers:"10",
    votes:"10",
    tags: ["react-native","react", "web",],
},
    {
        title: "Vụ 3 con gái đổ xăng đốt nhà mẹ: Người dân vẫn bủn rủn khi kể lại lúc đưa các nạn nhân ra ngoài",
        time: "1",
        author: "s",
        views: "10",
        answers:"10",
        votes:"10",
        tags: ["react-native","react", "web",],
    },
    {
        title: "Chiều 31/10, khắp các nẻo đường, từ quán trà đá cho tới những người đi đổ xăng ở xã Trung Hòa (huyện Yên Mỹ, tỉnh Hưng Yên) vẫn bàn tán xôn xao về vụ việc 3 người con gái đốt nhà mẹ đẻ ở thôn Thiên Lộc.  ",
        time: "1",
        author: "s",
        views: "10",
        answers:"10",
        votes:"10",
        tags: ["react-native","react", "web",],
    },
]
function Forum({navigation}) {
    const [text, setText] = useState('');
    return (
        <View >
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.container}>
                <View  style={styles.forum}>
                    <ForumNavigation navigation={navigation}/>
                </View>
                <View style={styles.content}>
                    <View style ={styles.containerContent}>
                        <View>
                            <Text style ={styles.text}>Top Questions</Text>
                        </View>
                        <View style ={styles.containerSearch}>
                            <TextField text={text} onChangeText={newText => setText(newText)}
                                       placeholder={" Search"}
                                       secureTextEntry={false}
                                       multiline={false}
                                       style={{width:400}}/>
                            <Buttons text={"Search"} />
                            <Buttons text={"Add Question"} style={[styles.button,{marginLeft:20}]} onPressTo={() => navigation.push("AddQuestion")}/>
                        </View>
                    </View>
                    <View style={styles.typeView}>
                        <Buttons text={"Interesting"} style={{backgroundColor: 'white',borderWidth:1}} styleText={{color: 'black',}} ></Buttons>
                        <Buttons text={"Bountied"} style={{backgroundColor: 'white',borderWidth:1}} styleText={{color: 'black',}}></Buttons>
                        <Buttons text={"Hot"} style={{backgroundColor: 'white',borderWidth:1}} styleText={{color: 'black',}}></Buttons>
                        <Buttons text={"Week"} style={{backgroundColor: 'white',borderWidth:1}} styleText={{color: 'black',}}></Buttons>
                        <Buttons text={"Month"} style={{backgroundColor: 'white',borderWidth:1}} styleText={{color: 'black',}}></Buttons>
                    </View>
                    <FlatList
                        data={listQuestion}
                        renderItem={({ item }) => (
                            <QuestionItem title={item.title} time={item.time} author={item.author} navigation={navigation} views={item.views}
                                          tags={item.tags} votes={item.votes} answers={item.answers} />
                        )}
                    />
                    <View style={styles.containerButton}>
                        <Buttons text={"Load more"} style={[styles.button,{ marginBottom:20,marginTop:20}]} />
                    </View>
                </View>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flex:1,
    },
    forum: {
        flex:0.15,
        marginTop:20,
        alignItems:"flex-end",
    },
    content:{
        flex:0.75,
        borderLeftWidth:1,
    },
    containerContent:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    containerSearch:{
        flexDirection:"row",
        alignItems:"center",
    },
    text:{
        fontSize:25,
        fontWeight:"bold",
        marginLeft:150,
        marginTop:10,
        marginBottom:20,
    },
    containerButton:{
        alignItems:"center",
        justifyContent:"center",
    },
    button:{
        width:180
    },
    typeView:{
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
export default Forum;