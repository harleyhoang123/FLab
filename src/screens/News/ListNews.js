import React, {useEffect, useState} from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NewsItem from "../../components/NewsItem";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import {getListAllNews, getListQuestion} from "../../networking/CustomNetworkService";
import PaginationBar from "../../components/PaginationBar";

function ListNews({navigation }) {
  const [text, setText] = useState("");
  const [numberOfElement, setNumberOfElement] = useState(0);
  const [listNews, setListNews] = useState();
  useEffect(() => {
    getListAllNews(text,0,5).then(v=>{
      setListNews(v.data.data.items);
      setNumberOfElement(v.data.data.totalPage*5)
    })
  }, []);
  const callbackChangePage = (page) => {
    getListAllNews(text,page-1,5).then(v=>{
      setListNews(v.data.data.items);
      setNumberOfElement(v.data.data.totalPage*5)
    })
  }
  const searchNews=()=>{
    getListAllNews(text,0,5).then(v=>{
      setListNews(v.data.data.items);
      setNumberOfElement(v.data.data.totalPage*5)
    })
  }
  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>List News</Text>
        </View>
        <View style={styles.containerSearch}>
          <TextField
            text={text}
            onChangeText={(newText) => setText(newText)}
            placeholder={" Search"}
            secureTextEntry={false}
            multiline={false}
            style={{ width: 400 }}
            onSubmitEditing={()=>searchNews()}
          />
          <Buttons text={"Search"} onPressTo={()=>searchNews()}/>
          <Buttons
            text={"Add News"}
            style={[styles.button, { marginLeft: 20 }]}
            onPressTo={() => navigation.push("AddNews")}
          />
        </View>
      </View>
      <FlatList
        data={listNews}
        renderItem={({ item }) => (
          <NewsItem
            newsId={item.newsId}
            title={item.title}
            author={item.author}
            thumbnail={item.thumbnail.url}
            createdDate={item.createdDate}
            views={item.views}
            comments={item.comments}
            navigation={navigation}
          />
        )}
      />
      <PaginationBar currentSizes={5} numberOfElement={numberOfElement} callbackSelectedPage={callbackChangePage}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 100,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 150,
    marginTop: 10,
    marginBottom: 20,
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 150,
  },
});
export default ListNews;
