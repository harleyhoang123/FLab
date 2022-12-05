import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import NewsItem from "../../components/NewsItem";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";

function ListNews({route,navigation}) {
    const res = route.params;
    const listNews= res.data.items
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
                               multiline={false}
                               style={{width:400}}/>
                    <Buttons text={"Search"} />
                    <Buttons text={"Add News"} style={[styles.button,{marginLeft:20}]} onPressTo={()=> navigation.push("AddNews")}/>
                </View>
            </View>
            <FlatList
                data={listNews}
                renderItem={({ item }) => (
                    <NewsItem newsId={item.newsId} title={item.title} author={item.author} thumbnail={item.thumbnail.url} createdDate={item.createdDate}
                              views={item.views} comments={item.comments} navigation={navigation} />
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