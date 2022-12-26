import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import { useDispatch } from "react-redux";
import { getListMaterialByLabId } from "../../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
import { deleteMaterial } from "../../networking/CustomNetworkService";
const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@labId");
    console.log("labId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId: " + e);
  }
};

const getLabRole = async () => {
  try {
    const labRole = await AsyncStorage.getItem("@roleInLab");
    console.log("labRole : " + labRole);
    return labRole;
  } catch (e) {
    console.log("Can't get labRole: " + e);
  }
};

function MaterialDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const deleteAMaterial = (labId, materialId) => {
    deleteMaterial(labId, materialId, navigation).then((v) =>
      dispatch(getListMaterialByLabId(labId, navigation))
    ).catch(error => {});
  };
  const data = route.params.data;
  const status = data.status;
  const [labId, setLabId] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  getLabId().then((v) => setLabId(v));
  const [labRole, setLabRole] = useState("");
  getLabRole().then((v) => setLabRole(v));

  const handleButton = () => {
    if (status === "FREE") {
      return (
        <Buttons
          text={"Request"}
          style={styles.button}
          onPressTo={() => {
            navigation.push("RequestMaterial", { data: data, labId: labId });
          }}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <LabNavigator navigation={navigation} />
      <View style={styles.containerContent}>
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
                Do you want to remove this material?
              </Text>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Buttons
                  text={"Remove"}
                  style={{ marginRight: 40 }}
                  onPressTo={() => {
                    deleteAMaterial(labId, data.materialId);
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
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={{
              uri: data.images.url,
            }}
          />
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.name}>{data.materialName}</Text>
          <Text style={styles.text}>Status: {data.status}</Text>
          <Text style={styles.text}>Amount: {data.amount}</Text>
          <Text style={styles.text}>Description: {data.description}</Text>
          <Text style={styles.text}>Note: {data.note}</Text>
          <View style={styles.row}>
            {handleButton()}
            <Buttons
              text={"Cancel"}
              style={styles.button}
              onPressTo={() => {
                navigation.goBack(navigation);
              }}
            />
            {labRole == "MANAGER" || labRole == "OWNER" ? (
              <Buttons
                text={"Update"}
                style={styles.button}
                onPressTo={() =>
                  navigation.push("UpdateMaterial", { materialInfo: data })
                }
              />
            ) : null}
            {labRole == "MANAGER" || labRole == "OWNER" ? (
              <Buttons
                style={styles.button}
                text={"Delete"}
                onPressTo={() => setShowConfirm(true)}
              />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    backgroundColor: "white",
    width: "70%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  name: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    marginTop: 50,
  },
  containerImage: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
  containerInfo: {
    flex: 0.65,
  },
  button: {
    marginTop: 50,
    width: 130,
    marginRight: 40,
  },
  image: {
    width: "60%",
    height: "60%",
  },
  row: {
    flexDirection: "row",
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
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 50,
  },
});
export default MaterialDetail;
