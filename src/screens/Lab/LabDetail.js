import React, { useEffect } from "react";
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
  TouchableOpacity,
} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ProfileComponent from "../../components/ProfileComponent";
import Buttons from "../../components/Buttons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllMemberInLaboratoryById,
  getAllProjectByLabId,
  deleteLaboratory,
} from "../../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import LabNavigator from "../../navigations/LabNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { getAllRequestInLabById } from "../../actions/LaboratoryAction";
import { leaveLaboratory } from "../../actions/LaboratoryAction";
import { getNumberOfApplication } from "../../networking/CustomNetworkService";

const getAccountId = async () => {
  try {
    const accountId = await AsyncStorage.getItem("@accountId");
    console.log("AccountId: " + accountId);
    return accountId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};

const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@currentLabId");
    console.log("LabId in reate Project: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get LabId id: " + e);
  }
};

const getCurrentMemberId = async () => {
  try {
    const memberId = await AsyncStorage.getItem("@currentMemberId");
    console.log("memberId in reate Project: " + memberId);
    return memberId;
  } catch (e) {
    console.log("Can't get memberId id: " + e);
  }
};

export default function LabDetail({ route, navigation }) {
  const [labIdRequest, setLabIdRequest] = useState("");
  getLabId().then((v) => setLabIdRequest(v));
  const [modalVisible, setModalVisible] = useState(false);
  const [accountId, setAccountId] = useState("");
  getAccountId().then((v) => setAccountId(v));
  const data = route.params.data;
  console.log("lab data:" + JSON.stringify(data));
  const memberInfo = route.params.data.memberInfo;
  let isJoined = memberInfo ? true : false;
  console.log("Is Joined In lab detail" + isJoined);
  const allMember = route.params.allMember.items;
  const [numberOfApplication, setNumberOfApplication] = useState(0);

  const [currentMemberId, setCurrentMemberId] = useState("");

  useEffect(() => {
    getCurrentMemberId().then((v) => setCurrentMemberId(v));
    getLabId().then((r) => {
      getNumberOfApplication(r, navigation).then((v) => {
        setNumberOfApplication(v.data);
        console.log("AAAA:" + v.data);
      });
    });
  }, []);

  const isAdmin = true;

  const roles = data?.memberInfo?.role;
  console.log("ROLE: " + roles);

  const dispatch = useDispatch();
  const goToViewAllMemberPage = (labId) => {
    dispatch(getAllMemberInLaboratoryById(labId, navigation));
  };

  console.log("numberOfApplication" + numberOfApplication);

  const memberId = data?.memberInfo?.memberId;
  const goToViewAllProjectPage = (labId, memberId) => {
    dispatch(getAllProjectByLabId(labId, memberId, navigation));
  };

  const goToViewAllRequestPage = () => {
    dispatch(getAllRequestInLabById(labIdRequest, navigation));
  };

  const delteCurrentLab = () => {
    console.log("data.laboratoryId");
    console.log(data.laboratoryId);
    dispatch(deleteLaboratory(accountId, labIdRequest, navigation));
  };

  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <View style={styles.container}>
      <LabNavigator navigation={navigation} isJoined={isJoined} />
      <View style={styles.containerProfile}>
        {isJoined && (
          <TouchableOpacity
            onPress={goToViewAllRequestPage}
            style={styles.request}
          >
            <FontAwesomeIcon icon={faBell} size={"xl"} />
            {numberOfApplication !== 0 ? (
              <Text style={styles.badge}>{numberOfApplication}</Text>
            ) : null}
          </TouchableOpacity>
        )}

        <View style={styles.containerName}>
          <Text style={styles.textName}>{data.laboratoryName}</Text>
        </View>

        <View style={styles.containerInfo}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showConfirm}
            onRequestClose={() => {
              setShowConfirm(false);
            }}
          >
            <View style={styles.modalDelete}>
              <View style={styles.modalDeleteView}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
                >
                  Do you want to delete this lab?
                </Text>
                <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                  <Buttons
                    text={"Delete"}
                    style={{ marginRight: 40 }}
                    onPressTo={() => {
                      delteCurrentLab();
                      setShowConfirm(false);
                    }}
                  />
                  <Buttons
                    text={"Cancel"}
                    style={{ backgroundColor: "#F4F5F7" }}
                    styleText={{ color: "black" }}
                    onPressTo={() => setShowConfirm(false)}
                  />
                </View>
              </View>
            </View>
          </Modal>
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
              information={data.members}
            />
          </View>
        </View>
        <View style={styles.containerInfo}>
          {isJoined && (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Buttons
                  style={styles.button}
                  text={"View All Member"}
                  onPressTo={() => goToViewAllMemberPage(data.laboratoryId)}
                />
                <Buttons
                  style={styles.button}
                  text={"View All Project"}
                  onPressTo={() =>
                    goToViewAllProjectPage(data.laboratoryId, memberId)
                  }
                />
              </View>
            </View>
          )}

          <View style={styles.leavebtn}>
            {!isJoined && (
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  onPress={() =>
                    navigation.navigate("ApplyToLab", {
                      labId: data.laboratoryId,
                    })
                  }
                  style={styles.textStyle}
                >
                  Apply
                </Text>
              </Pressable>
            )}
            {isJoined && (
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() =>
                  navigation.navigate("AddMemberToLab", { labData: data })
                }
              >
                <Text style={styles.textStyle}>Add Member</Text>
              </Pressable>
            )}
          </View>
          {isJoined && (
            <View style={{ marginTop: 20, flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  setShowConfirm(true);
                }}
              >
                <View>
                  <Text style={styles.textStyle}>Delete</Text>
                </View>
                <Text></Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]}>
                <View>
                  <Text
                    style={styles.textStyle}
                    onPress={() => {
                      navigation.push("UpdateLab", {
                        labInfo: data,
                        listMember: allMember,
                      });
                    }}
                  >
                    Update
                  </Text>
                </View>
                <Text></Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  request: {
    width: 60,
    height: 57,
    borderRadius: "50%",
    backgroundColor: "#555",
    flexDirection: "row",
    color: "white",
    padding: 15,
    position: "relative",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    margin: 20,
  },
  badge: {
    width: 29,
    height: 29,
    borderRadius: "50%",
    position: "absolute",
    top: -10,
    right: -10,
    padding: 5,
    borderRadius: "50%",
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
  },
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
  modalDelete: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalDeleteView: {
    width: "30%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  leavebtn: {
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
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
    marginRight: 10,
    width: 200,
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
