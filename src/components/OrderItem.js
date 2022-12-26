import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Buttons from "./Buttons";
import Separator from "./Separator";
import UserInfoComponent from "./UserInfoComponent";
import { responseOrder } from "../networking/CustomNetworkService";

function OrderItem({
  orderId,
  materialName,
  borrowBy,
  amount,
  reason,
  status,
  fromDate,
  toDate,
  callBackOrder,
  navigation,
}) {
  const formatterDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const d = new Date(date);
    return (
      d.toLocaleDateString("en-US", options) +
      ", " +
      d.toTimeString().split("G")[0]
    );
  };
  const responseOrderWaiting = (statusOder) => {
    responseOrder(orderId, statusOder, navigation).then(() => callBackOrder()).catch(error => {});
  };
  const renderButton = (statusOder) => {
    if (statusOder === "WAITING_FOR_APPROVAL") {
      return (
        <View style={{ flexDirection: "row" }}>
          <Buttons
            text={"Accept"}
            style={styles.button}
            onPressTo={() => responseOrderWaiting("APPROVED")}
          />
          <Buttons
            text={"Reject"}
            style={styles.button}
            onPressTo={() => responseOrderWaiting("REJECTED")}
          />
        </View>
      );
    } else {
      return <Text style={styles.textInfo}>Status: {statusOder}</Text>;
    }
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.containerContent}>
        <Text style={styles.title}>{materialName}</Text>
        <Text style={styles.textInfo}>
          Borrow By: <UserInfoComponent info={borrowBy} />
        </Text>
        <Text style={styles.textInfo}>Amount: {amount}</Text>
        <Text style={styles.textInfo}>Reason: {reason}</Text>
        <Text style={styles.textInfo}>From: {formatterDate(fromDate)}</Text>
        <Text style={styles.textInfo}>To: {formatterDate(toDate)}</Text>
        {renderButton(status)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "20%",
    padding: 30,
  },
  containerContent: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 550,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 20,
  },
  textInfo: {
    fontSize: 16,
    marginRight: 20,
    margin: 20,
    alignItems: "center",
  },
  button: {
    height: 40,
    width: "25%",
    margin: 20,
  },
});
export default OrderItem;
