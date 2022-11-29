import React, {useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NotifyComponent from "../../components/NotifyComponent";

function Notification({navigation, modalNotifyVisible, setModalNotifyVisible}) {
    const listNotify =[{
        title: "Lionel Messi là ngôi sao mới nhất xuất hiện trong game sinh tồn PUBG Mobile ở bản cập nhật sắp tới.",
        time: "1",
        date: "s",
    },
        {
            title: "Vụ 3 con gái đổ xăng đốt nhà mẹ: Người dân vẫn bủn rủn khi kể lại lúc đưa các nạn nhân ra ngoài",
            time: "1",
            date: "s",
        },
        {
            title: "Chiều 31/10, khắp các nẻo đường, từ quán trà đá cho tới những người đi đổ xăng ở xã Trung Hòa (huyện Yên Mỹ, tỉnh Hưng Yên) vẫn bàn tán xôn xao về vụ việc 3 người con gái đốt nhà mẹ đẻ ở thôn Thiên Lộc.  ",
            time: "1",
            date: "s",
        },
        {
            title: "fgh",
            time: "1",
            date: "s",
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
                        <View style={styles.notify}>
                            <TouchableOpacity>
                                <Text style={styles.textNotify}> ALL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textNotify}> UNREAD</Text>
                            </TouchableOpacity>
                        </View>
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
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    textNotify: {
        fontWeight: "bold",
        fontSize:16,
        marginTop:20,
        marginLeft:30,
    },
    notify:{
        flexDirection:"row"
    },
});
export default Notification;