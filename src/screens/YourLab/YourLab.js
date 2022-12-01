import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Icon,
  StatusBar,
  Modal,
  Pressable,
  TextField,
} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ProfileComponent from "../../components/ProfileComponent";
import Buttons from "../../components/Buttons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllMemberInLaboratoryById } from "../../actions/LaboratoryAction";

export default function YourLab({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const data = route.params.data;
  const isJoined = route.params.isJoined;

  const dispatch = useDispatch();
  const goToViewAllMemberPage = (labId) => {
    dispatch(getAllMemberInLaboratoryById(labId, navigation));
  };
  return (
    <View style={styles.container}>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.containerProfile}>
        <View style={styles.containerName}>
          <Text style={styles.textName}>{data.laboratoryName}</Text>
        </View>
        <View style={styles.containerInfo}>
          <View style={styles.info}>
            <ProfileComponent
              title={"Start from"}
              information={data.createdDate}
            />
          </View>
          <ProfileComponent
            title={"Address"}
            information={data.lastModifiedDate}
          />
          <ProfileComponent
            title={"Contact"}
            information={data.ownerBy.userInfo.email}
          />
          <ProfileComponent
            title={"Host"}
            information={data.ownerBy.userInfo.username}
          />
          <ProfileComponent
            title={"Description"}
            information={data?.projects?.description}
          />
          <View style={styles.info}></View>
          <View style={styles.info}>
            <ProfileComponent title={"Major"} information={data.major} />
            <ProfileComponent
              title={"Number of member"}
              information={data.projects.members}
            />
          </View>
        </View>
        <View style={styles.containerInfo}>
          <Buttons
            style={styles.button}
            text={"View All Member"}
            onPressTo={() => goToViewAllMemberPage(data.laboratoryId)}
          />
          <View style={styles.leavebtn}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              {isJoined ? (
                <Text style={styles.textStyle}>Leave</Text>
              ) : (
                <Text style={styles.textStyle}>Join</Text>
              )}
            </Pressable>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.visibleModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Do you want to leave this Lab
              </Text>
              <View style={styles.wrapper}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  {isJoined ? (
                    <Text style={styles.textStyle}>Leave</Text>
                  ) : (
                    <Text style={styles.textStyle}>Join</Text>
                  )}
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
  },
  containerProfile: {
    flex: 1,
    alignSelf: "center",
    width: "60%",
    backgroundColor: "white",
  },
  containerName: {
    paddingLeft: 150,
    margin: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  containerInfo: {
    margin: 20,
    paddingLeft: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  info: {
    flexDirection: "row",
  },
  userImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginRight: 50,
  },
  textName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: 250,
    marginLeft: 15,
  },
  leavebtn: {
    width: 120,
    height: 66,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
