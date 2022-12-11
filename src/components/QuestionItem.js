import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Separator from "./Separator";
import {useDispatch} from "react-redux";
import {getQuestionDetailByQuestionId} from "../actions/ForumAction";

function QuestionItem({questionId, title, tags, score, views, answers, style, askedBy,createdDate, navigation}) {
    const formatTime=(date)=>{
        const d= new Date(date);
        const month= d.getMonth()+1;
        return d.getDate() + "/" + month + "/" + d.getFullYear();
    }
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(getQuestionDetailByQuestionId(questionId, navigation,false));
    };
    return (
        <View style={[styles.container, style]}>
            <Separator/>
            <TouchableOpacity onPress={handleClick}>
                <View style={styles.containerContent}>
                    <View style={styles.containerLogo}>
                        <Text style={styles.text}>{score} votes</Text>
                        <Text style={styles.text}>{answers} answers</Text>
                        <Text style={styles.text}>{views} views</Text>
                    </View>
                    <View style={styles.containerTitle}>
                        <View>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                        </View>
                        <FlatList
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
                        <View style={styles.info}>
                            <Text style={styles.textInfo}>
                                Post by {askedBy} on {formatTime(createdDate)}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 50,
        flex: 1,
    },
    containerContent: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        flex: 1,
    },
    containerLogo: {
        marginRight: 20,
        alignItems: "flex-end",
        flex: 0.08,
    },
    containerTitle: {
        flex: 0.92,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    info: {
        alignItems:"flex-end",
    },
    textInfo: {
        fontSize: 15,
        fontWeight: "bold",
        marginRight: 60,
    },
    textView: {
        fontSize: 17,
        marginRight: 10,
        backgroundColor:'#E1ECF4',
    },
    text: {
        fontSize: 16,
        marginTop:10,
        marginBottom:5,
    },
});
export default QuestionItem;