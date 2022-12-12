import React, {useState} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import { useDispatch } from "react-redux";
import { getListMaterialByLabId } from "../../actions/LaboratoryAction";
import AsyncStorage from "@react-native-community/async-storage";
const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@labId");
    console.log("labId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId: " + e);
  }
};
function MaterialDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const goToListMaterial = () => {
    dispatch(getListMaterialByLabId("", navigation));
  };
  const data = route.params.data;
  const status = data.status;
  const isAdmin = false;
  const [labId, setLabId] = useState();
  getLabId().then(v => setLabId(v))
  const handleButton = () => {
    if (status === "FREE") {
      return (
        <Buttons
          text={"Request"}
          style={styles.button}
          onPressTo={() => {
            navigation.push("RequestMaterial", {data: data, labId: labId});
          }}
        />
      );
    } else {
      return (
        <View style={{ flexDirection: "row" }}>
          <Buttons
            text={"Return"}
            style={styles.button}
          />
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <LabNavigator navigation={navigation} />
      <View style={styles.containerContent}>
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
            <Buttons
              text={"Update"}
              style={styles.button}
              onPressTo={() =>
                navigation.push("UpdateMaterial", { materialInfo: data })
              }
            />
          </View>

          {isAdmin ? (
            <View>
              <Buttons
                text={"Delete"}
                style={[styles.button]}
                onPressTo={() => {
                  navigation.push("Home");
                }}
              />
              <Buttons
                text={"Update"}
                style={[styles.button]}
                onPressTo={() => {
                  navigation.push("Home");
                }}
              />
            </View>
          ) : (
            <Text></Text>
          )}
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
});
export default MaterialDetail;
