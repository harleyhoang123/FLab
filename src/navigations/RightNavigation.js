import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import AvatarComponent from "../components/AvatarComponent";
import Notification from "../screens/Notification/Notification";
import {getAccountInfoByAccountId, logout} from "../actions/UserAction";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
const getAvatar = async () => {
    try {
        const avatar = await AsyncStorage.getItem("@avatar");
        console.log("avatar: " + avatar);
        return avatar;
    } catch (e) {
        console.log("Can't get avatar: " + e);
    }
};
const getUsername = async () => {
    try {
        return await AsyncStorage.getItem("@username");
    } catch (e) {
        console.log("Can't get username: " + e);
    }
};
const getRoles = async () => {
    try {
        const roles = await AsyncStorage.getItem("@roles");
        console.log("roles: " + roles);
        return roles;
    } catch (e) {
        console.log("Can't get roles: " + e);
    }
};
const getAccountId = async () => {
    try {
        const accountId = await AsyncStorage.getItem("@accountId");
        console.log("AccountId: " + accountId);
        return accountId;
    } catch (e) {
        console.log("Can't get account id: " + e);
    }
};
function RightNavigation({navigation}) {
    const [accountId, setAccountId] = useState("");
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [roles, setRoles] = useState([]);
    //:TODO Get role of user
    getRoles().then((v) => setRoles(v));
    getAvatar().then((v) => setAvatar(v));
    getAccountId().then((v) => setAccountId(v));
    getUsername().then(v=>setUsername(v))
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout);
        navigation.push("Login");
    };
    const goToCV=()=>{
        navigation.push("CurriculumVitae");
    }
    const goToProfile = () => {
        dispatch(getAccountInfoByAccountId(accountId, navigation));
    };
    const [modalProfileVisible, setModalProfileVisible] = useState(false);
    const [modalNotifyVisible, setModalNotifyVisible] = useState(false);
    return (
        <View style={styles.topNavigationContentRight}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalProfileVisible}
                onRequestClose={() => {
                    setModalProfileVisible(!modalProfileVisible);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setModalProfileVisible(!modalProfileVisible)}
                    style={styles.modal}
                >
                    <View style={styles.modalProfileView}>
                        <TouchableOpacity
                            onPress={() => {
                                goToProfile();
                                // navigation.push("EditProfile");
                                setModalProfileVisible(!modalProfileVisible);
                            }}
                            style={[styles.buttonModal]}
                        >
                            <Text style={styles.textStyle}>My Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonModal]}
                                          onPress={()=> {goToCV();
                                              setModalProfileVisible(!modalProfileVisible);
                                          }}
                        >
                            <Text style={styles.textStyle}>My CV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleLogout();
                                setModalProfileVisible(!modalProfileVisible);
                            }}
                            style={[styles.buttonModal]}
                        >
                            <Text style={styles.textStyle}>Log out</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>
            <Notification
                navigation={navigation}
                modalNotifyVisible={modalNotifyVisible}
                setModalNotifyVisible={(modalNotifyVisible) =>
                    setModalNotifyVisible(modalNotifyVisible)
                }
            />
            <TouchableOpacity
                style={[styles.button, { marginHorizontal: 50 }]}
                onPress={() => setModalNotifyVisible(true)}
            >
                <FontAwesomeIcon icon={faBell} size={"xl"} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { flexDirection: "row" }]}
                onPress={() => setModalProfileVisible(true)}
            >
                <AvatarComponent avatarURL={avatar} />
                <Text>{username}</Text>
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
});

export default RightNavigation;