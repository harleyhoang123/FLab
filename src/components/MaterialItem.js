import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from "react-native";
import Separator from "./Separator";

import { useDispatch } from "react-redux";
import { getMaterialById } from "../actions/MaterialAction";

function MaterialItem({ id, title, status, navigation }) {
  console.log("IDL:" + id);
  const dispatch = useDispatch();
  const goToMaterialDetail = () => {
    console.log("Call go to materail detail: " + id);
    dispatch(getMaterialById(id, navigation));
  };
  console.log("In material item");
  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={goToMaterialDetail}>
        <View style={styles.containerContent}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: "https://flab-forum-bucket.s3.eu-central-1.amazonaws.com/83739451-4303-439f-b96d-a4e33e8799df",
              }}
            />
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textInfo}>Status: {status}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Separator />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 100,
    marginRight: 100,
    flex: 1,
  },
  containerContent: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    flex: 1,
  },
  containerLogo: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    flex: 0.9,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  textInfo: {
    fontSize: 16,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
export default MaterialItem;
