import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from "react-native";
import Separator from "./Separator";

import { useDispatch } from "react-redux";
import { getMaterialById } from "../actions/LaboratoryAction";
import Buttons from "./Buttons";
import {deleteMaterial} from "../networking/CustomNetworkService";


function MaterialItem({ id, image, title, amount, navigation }) {
  console.log("IDL:" + id);
  const dispatch = useDispatch();
  const goToMaterialDetail = () => {
    console.log("Call go to material detail: " + id);
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
                uri: image,
              }}
            />
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textInfo}>Total amount: {amount}</Text>
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
