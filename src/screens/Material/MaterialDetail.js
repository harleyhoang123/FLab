import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import Buttons from "../../components/Buttons";
import LabNavigator from "../../navigations/LabNavigator";
import {useDispatch} from "react-redux";
import {getListMaterialByLabId} from "../../actions/LaboratoryAction";
function MaterialDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const goToListMaterial = () =>{
    dispatch(getListMaterialByLabId("", navigation))
  }
  const data = route.params.data;
  const status = data.status;
  const isAdmin = false;
  const handleButton = () => {
    if (status === "FREE") {
      return (
        <Buttons
          text={"Request"}
          style={styles.button}
          onPressTo={() => {
            navigation.push("RequestMaterial");
          }}
        />
      );
    } else {
      return (
        <Buttons
          text={"Return"}
          style={styles.button}
          onPressTo={goToListMaterial}
        />
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
              uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
            }}
          />
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.name}>{data.materialName}</Text>
          <Text style={styles.text}>Status: {data.status}</Text>
          <Text style={styles.text}>Amount: {data.amount}</Text>
          <Text style={styles.text}>Description: {data.description}</Text>
          <Text style={styles.text}>Note: None</Text>
          <View style={styles.row}>
            {handleButton()}
            <Buttons text={"Cancel"} style={styles.button} onPressTo={()=> {navigation.goBack(navigation)}}/>
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
    width: "60%",
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
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  containerInfo: {
    flex: 0.5,
  },
  button: {
    marginTop: 50,
    width: 130,
    marginRight:40,
  },
  image: {
    width: 500,
    height: 500,
  },
  row:{
    flexDirection:"row",
  },
});
export default MaterialDetail;
