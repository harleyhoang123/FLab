import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity, Image, Modal} from "react-native";
import Logo from "../assets/Logo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";

export default function HomeTopNavigator({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style = {styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>  setModalVisible(!modalVisible) }
                    style={styles.modal}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => {navigation.push("Profile")
                            setModalVisible(!modalVisible)}}
                            style={[styles.buttonModal]}>
                            <Text style={styles.textStyle}>My Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonModal]}>
                            <Text style={styles.textStyle}>My Rewards</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonModal]}>
                            <Text style={styles.textStyle}>My CV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonModal]}>
                            <Text style={styles.textStyle}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style = {styles.topNavigationContent}>
                <View style = {styles.topNavigationContentLeft}>
                    <TouchableOpacity style={styles.btnLogo} onPress={() => navigation.push("Home")}>
                        <Logo/>
                        <Text style={styles.textLogo}>FLAB</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.push("Home")}>
                        <Text style={styles.textLogo}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.push("Lab")}>
                        <Text style={styles.textLogo}>Lab</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.push("Forum")}>
                        <Text style={styles.textLogo}>Forum</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.push("ListNews")}>
                        <Text style={styles.textLogo}>News</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.topNavigationContentRight}>
                    <TouchableOpacity style={[styles.button,{marginHorizontal:50,}]} onPress={() => navigation.push("Notification")}>
                        <FontAwesomeIcon icon={faBell} size={"xl"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{flexDirection: 'row',}]}  onPress={() => setModalVisible(true)}>
                        <Image
                            style={styles.userImage}
                            source={{
                            uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
                        }}/>
                        <Text>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        borderBottomWidth:1,
    },
    topNavigationContent: {
        flexDirection: 'row',
        height: 50,
        backgroundColor:'white',
        justifyContent:'space-between',
    },
    topNavigationContentLeft: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    topNavigationContentRight: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight:50,
    },
    button: {
        justifyContent: "center",
        alignItems:"center",
        margin: 15,
    },
    buttonModal:{
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: 135,
    },
    btnLogo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    textLogo: {
        fontSize:20,
        fontWeight: "bold",
        marginLeft: 5,
    },
    userImage:{
        width: 30,
        height: 30,
        borderRadius:15,
        marginRight:10,
    },
    modal:{
        alignItems: "flex-end",
        flex:1,
    },
    modalView: {
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
    textStyle: {
        fontWeight: "bold",
    },
});
