import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../assets/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import Notification from "../screens/Notification/Notification";
import { useDispatch } from "react-redux";
import { getLaboratoryByAccountId } from "../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import { logout } from "../actions/UserAction";
import AvatarComponent from "../components/AvatarComponent";

const getAccountId = async () => {
  try {
    const accountId = await AsyncStorage.getItem("@accountId");
    console.log("AccountId: " + accountId);
    return accountId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};

export default function HomeTopNavigator({ navigation }) {
  const [accountId, setAccountId] = useState("");
  getAccountId().then((v) => setAccountId(v));
  const dispatch = useDispatch();
  const goToLabPage = () => {
    dispatch(getLaboratoryByAccountId(accountId, navigation));
  };
  const handleLogout = () => {
    dispatch(logout);
    navigation.push("Login");
  };
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [modalNotifyVisible, setModalNotifyVisible] = useState(false);
  return (
    <View style={styles.container}>
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
                navigation.push("Profile");
                setModalProfileVisible(!modalProfileVisible);
              }}
              style={[styles.buttonModal]}
            >
              <Text style={styles.textStyle}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonModal]}>
              <Text style={styles.textStyle}>My Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonModal]}>
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
      <View style={styles.topNavigationContent}>
        <View style={styles.topNavigationContentLeft}>
          <TouchableOpacity
            style={styles.btnLogo}
            onPress={() => navigation.push("Home")}
          >
            <Logo />
            <Text style={styles.textLogo}>FLAB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("Home")}
          >
            <Text style={styles.textLogo}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => goToLabPage()}>
            <Text style={styles.textLogo}>Lab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("Forum")}
          >
            <Text style={styles.textLogo}>Forum</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("ListNews")}
          >
            <Text style={styles.textLogo}>News</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topNavigationContentRight}>
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
            <AvatarComponent height={30} width={30}/>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  topNavigationContent: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  topNavigationContentLeft: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
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
  btnLogo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  textLogo: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
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
