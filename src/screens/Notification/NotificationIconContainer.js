import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import {getNumberNotifyOfAccountId} from "../../networking/CustomNetworkService";
import Notification from "./Notification";

function NotificationIconContainer({navigation, accountId}) {
    const [numberOfNotify, setNumberOfNotify] = useState(0);
    const [modalNotifyVisible, setModalNotifyVisible] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            getNumberNotifyOfAccountId("6388f5e3c3f22c64f52af24f")
                .then( v =>
                    setNumberOfNotify(v.data.notifies)
                );
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <View>
            <Notification
                navigation={navigation}
                modalNotifyVisible={modalNotifyVisible}
                setModalNotifyVisible={(modalNotifyVisible) =>
                    setModalNotifyVisible(modalNotifyVisible)
                }
            />
            <TouchableOpacity
                style={[styles.button, { marginHorizontal: 20 }]}
                onPress={() => setModalNotifyVisible(true)}
            >
                <View>
                    <FontAwesomeIcon icon={faBell} size={"xl"} />
                    <Text style={styles.notifyNumber}>{numberOfNotify}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    topNavigationContentRight: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginRight: 50,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        margin: 15,
    },
    buttonModal: {
        alignItems: "flex-start",
        justifyContent: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: 135,
    },
    modal: {
        alignItems: "flex-end",
        flex: 1,
    },
    modalProfileView: {
        marginTop: 50,
        marginRight: 15,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    textStyle: {
        fontWeight: "bold",
    },
    notifyNumber: {
        position: "absolute",
        backgroundColor: "red",
        right: "-25%",
        top: "-10%",
        color: "white",
        fontSize: 11,
        fontWeight: 900,
        borderRadius: 30,
        padding: 1,
        opacity: "80%"
    }
});

export default NotificationIconContainer;
