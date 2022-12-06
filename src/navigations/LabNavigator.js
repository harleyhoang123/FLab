import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import Logo from "../assets/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import Notification from "../screens/Notification/Notification";
import { useDispatch } from "react-redux";
import { getAllRepository } from "../actions/RepositoryAction";
import {getAllMemberInLaboratoryById, getAllProjectByLabId, getListMaterialByLabId} from "../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import {getAccountInfoByAccountId, logout} from "../actions/UserAction";
import AvatarComponent from "../components/AvatarComponent";
import { getFolderByRepositoryId } from "../actions/RepositoryAction";
const getRepoId = async () => {
  try {
    const repoId = await AsyncStorage.getItem("@currentProjectId");
    console.log("repoId: " + repoId);
    return repoId;
  } catch (e) {
    console.log("Can't get repo id: " + e);
  }
};
const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@labId");
    console.log("labId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId: " + e);
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
const getAvatar = async () => {
  try {
    const avatar = await AsyncStorage.getItem("@avatar");
    console.log("avatar: " + avatar);
    return avatar;
  } catch (e) {
    console.log("Can't get avatar: " + e);
  }
};
export default function LabNavigator({ route, navigation }) {
  const [repoId, setRepoId] = useState("");
  getRepoId().then((v) => setRepoId(v));
  const [accountId, setAccountId] = useState("");
  const [avatar, setAvatar] = useState('');
  getAvatar().then((v) => setAvatar(v));
  getAccountId().then((v) => setAccountId(v));
  const [labId, setLabId] = useState('');
  getLabId().then((v) => setLabId(v));
  const dispatch = useDispatch();
  const goToRepository = () => {
    dispatch(getFolderByRepositoryId(repoId, navigation));
  };
  const goToViewAllMemberPage = (labId) => {
    dispatch(getAllMemberInLaboratoryById(labId, navigation));
  };
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [modalNotifyVisible, setModalNotifyVisible] = useState(false);

  const goToListMaterial = () => {
    dispatch(getListMaterialByLabId("", navigation));
  };
  const goToViewAllProjectPage = (labId) => {
    dispatch(getAllProjectByLabId(labId, navigation));
  };
  const goToProfile = () => {
    dispatch(getAccountInfoByAccountId(accountId, navigation));
  };
  const handleLogout = () => {
    dispatch(logout);
    navigation.push("Login");
  };
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
                  goToProfile()
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
            onPress={() => goToViewAllProjectPage(labId)}
          >
            <Text style={styles.textLogo}>Project</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("Spaces")}
          >
            <Text style={styles.textLogo}>Spaces</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.button}
            onPress={()=>goToViewAllMemberPage(labId)}
          >
            <Text style={styles.textLogo}>Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToListMaterial}>
            <Text style={styles.textLogo}>Material</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToRepository()}
          >
            <Text style={styles.textLogo}>Repository</Text>
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
            <AvatarComponent avatarURL={avatar}/>
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
