import React, {useEffect, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NotifyComponent from "../../components/NotifyComponent";
import AsyncStorage from "@react-native-community/async-storage";
import {getNotification} from "../../networking/CustomNetworkService";
import {ScrollView} from "react-native";

const getAccountId = async () => {
    try {
        const accountId = await AsyncStorage.getItem("@accountId");
        console.log("AccountId: " + accountId);
        return accountId;
    } catch (e) {
        console.log("Can't get account id: " + e);
    }
};

function Notification({navigation, modalNotifyVisible, setModalNotifyVisible, listNotify}) {
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
                onPress={() => setModalNotifyVisible(!modalNotifyVisible)}
                style={styles.modal}>
                <View style={styles.modalNotifyView}>
                    <ScrollView>
                        <FlatList style={{maxHeight:600}}
                            data={listNotify}
                                  renderItem={({item}) => (
                                      <NotifyComponent title={item.content} date={item.createdDate} read={item.read}/>
                                  )}/>
                    </ScrollView>

                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        alignItems: "flex-end",
        flex: 1,
    },
    modalNotifyView: {
        marginTop: 50,
        marginRight: 15,
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
