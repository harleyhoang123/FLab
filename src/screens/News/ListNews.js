import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import NewsItem from "../../components/NewsItem";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";

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
function ListNews({navigation}) {
    const [text, setText] = useState('');
    return (
        <View>
            <HomeTopNavigator navigation={navigation}/>
            <View style ={styles.container}>
                <View>
                    <Text style ={styles.text}>List News</Text>
                </View>
                <View style ={styles.containerSearch}>
                    <TextField text={text} onChangeText={newText => setText(newText)}
                               placeholder={" Search"}
                               secureTextEntry={false}
                               multiline={false}/>
                    <Buttons text={"Search"} />
                    <Buttons text={"Add News"} style={[styles.button,{marginLeft:20}]} onPressTo={()=> navigation.push("AddNews")}/>
                </View>
            </View>
            <FlatList
                data={listNews}
                renderItem={({ item }) => (
                    <NewsItem title={item.title} time={item.time} author={item.author} view={item.view} comments={item.comment} navigation={navigation} />
                )}
            />
            <View style={styles.containerButton}>
                <Buttons text={"Load more"} style={styles.button} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    containerSearch:{
        flexDirection:"row",
        alignItems:"center",
        marginRight:100,
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
        width:150
    },
});
export default ListNews;