import React, {useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NotifyComponent from "../../components/NotifyComponent";

function Notification({navigation, modalNotifyVisible, setModalNotifyVisible}) {
    const listNotify =[{
        title: "you have been accepted into lab 211",
        time: "12:13",
        date: "23-12-2022",
    },
        {
            title: "you are added to project 1",
            time: "10:19",
            date: "22-12-2022",
        },
        {
            title: "Nguyen Cong Son answered your question ",
            time: "20:13",
            date: "20-12-2022",
        },
        {
            title: "you have assigned task 2",
            time: "17:12",
            date: "18-12-2022",
        },
    ]
    return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalNotifyVisible}
                onRequestClose={() => {
                    setModalNotifyVisible(!modalNotifyVisible);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>  setModalNotifyVisible(!modalNotifyVisible) }
                    style={styles.modal}>
                    <View style={styles.modalNotifyView}>
                        <FlatList data={listNotify}
                                  renderItem={({ item }) => (
                                      <NotifyComponent date={item.date} time={item.time} title={item.title} />
                                  )}/>
                    </View>
                </TouchableOpacity>
            </Modal>
    );
}
const styles = StyleSheet.create({
    modal:{
        alignItems: "flex-end",
        flex:1,
    },
    modalNotifyView: {
        marginTop: 50,
        marginRight:15,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
export default Notification;