import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from "react-native";
import Separator from "./Separator";

function NewsItem({title, time, author, view, comments,style, navigation}) {
    return (
        <View style={[styles.container,style]}>
            <TouchableOpacity onPress={() => navigation.push("NewsDetail")}>
                <View style={styles.containerContent}>
                    <View style={styles.containerLogo}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: 'https://flab-forum-bucket.s3.eu-central-1.amazonaws.com/83739451-4303-439f-b96d-a4e33e8799df',
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
                                Ngày đăng: {time}
                            </Text>
                            <Text style={styles.textView}>
                                Lượt xem: {view}
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
        marginRight: 20,
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