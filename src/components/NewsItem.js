import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from "react-native";
import Separator from "./Separator";
import {useDispatch} from "react-redux";
import {getNewsDetailByNewsId} from "../actions/NewsAction";

function NewsItem({newsId, title, author, thumbnail, createdDate,views,comments, style, navigation}) {
    const dispatch=useDispatch();
    const handleClick=()=>{
        dispatch(getNewsDetailByNewsId(newsId,navigation))
    }
    const formatTime=(date)=>{
        const d= new Date(date);
        const month= d.getMonth()+1;
        return d.getDate() + "/" + month + "/" + d.getFullYear();
    }
    return (
        <View style={[styles.container,style]}>
            <TouchableOpacity onPress={handleClick}>
                <View style={styles.containerContent}>
                    <View style={styles.containerLogo}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: thumbnail,
                            }}
                        />
                    </View>
                    <View  style={styles.containerTitle}>
                        <View>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                        </View>

                        <View style={styles.info}>
                            <Text style={styles.textInfo}>
                                Tác giả: {author}
                            </Text>
                            <Text style={styles.textInfo}>
                                Ngày đăng: {formatTime(createdDate)}
                            </Text>
                            <Text style={styles.textView}>
                                Lượt xem: {views}
                            </Text>
                            <Text style={styles.textView}>
                                Bình luận: {comments}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <Separator/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 100,
        marginRight: 100,
        flex:1,
    },
    containerContent: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        flex:1,
    },
    containerLogo: {
        flex:0.1,
        justifyContent:"center",
        alignItems:"center",
    },
    containerTitle: {
        flex:0.9,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    info: {
        flexDirection: "row",
    },
    textInfo: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 60,
    },
    textView: {
        fontStyle: "italic",
        fontSize: 15,
        marginRight: 60,
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
});
export default NewsItem;