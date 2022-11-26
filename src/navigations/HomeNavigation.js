import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity, Image, Modal, FlatList} from "react-native";
import Logo from "../assets/Logo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import NotifyComponent from "../components/NotifyComponent";

export default function HomeTopNavigator({navigation}) {
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
    const [modalProfileVisible, setModalProfileVisible] = useState(false);
    const [modalNotifyVisible, setModalNotifyVisible] = useState(false);
    return (
        <View style = {styles.container}>
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
                    onPress={()=>  setModalProfileVisible(!modalProfileVisible) }
                    style={styles.modal}>
                    <View style={styles.modalProfileView}>
                        <TouchableOpacity onPress={() => {navigation.push("Profile")
                            setModalProfileVisible(!modalProfileVisible)}}
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
                    <TouchableOpacity style={[styles.button,{marginHorizontal:50,}]} onPress={() => setModalNotifyVisible(true)}>
                        <FontAwesomeIcon icon={faBell} size={"xl"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{flexDirection: 'row',}]}  onPress={() => setModalProfileVisible(true)}>
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
    modalProfileView: {
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
    textStyle: {
        fontWeight: "bold",
    },
    notify:{
        flexDirection:"row"
    },
    textNotify: {
        fontWeight: "bold",
        fontSize:16,
        marginTop:20,
        marginLeft:30,
    },
});
