import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function UserComponent({ name, role, id }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>
      <View style={styles.right}>
        <View style={styles.up}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
        <View style={styles.down}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: "white",
  },
  role: {
    fontSize: 14,
    color: "white",
  },
  up: {
    height: "60%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#253858",
  },
  down: {
    height: "40%",
    backgroundColor: "#232629",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    height: 100,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  left: {
    width: 90,
    height: "auto",
    backgroundColor: "#253858",
  },
  right: {
    width: 210,
    display: "flex",
    flexDirection: "column",
  },
  tinyLogo: {
    width: 90,
    height: 90,
    borderRadius: "50%",
  },
});
