import { View, Text, StyleSheet, FlatList } from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import React, { useEffect, useState } from "react";
import LabNavigator from "../../navigations/LabNavigator";
import PaginationBar from "../../components/PaginationBar";
import { Dropdown } from "react-native-element-dropdown";
import OrderItem from "../../components/OrderItem";
import AsyncStorage from "@react-native-community/async-storage";
import { getListOrderByLabId } from "../../networking/CustomNetworkService";
import TextField from "../../components/TextField";
const getLabId = async () => {
  try {
    const labId = await AsyncStorage.getItem("@labId");
    console.log("labId: " + labId);
    return labId;
  } catch (e) {
    console.log("Can't get labId: " + e);
  }
};
function OrderMaterial({ navigation }) {
  const [value, setValue] = useState("ALL");
  const [listOrder, setListOrder] = useState();
  const [listItem, setListItem] = useState();
  const [text, setText] = useState("");
  const [labId, setLabId] = useState();
  const callBackOrder = () => {
    getListOrderByLabId(labId, navigation).then((r) => {
      setListItem(r.data.items);
      filterStatus(r.data.items, value);
    }).catch(error => {});
  };
  useEffect(() => {
    getLabId().then((v) => {
      {
        setLabId(v);
        getListOrderByLabId(v, navigation).then((r) => {
          checkDataNull(r);
        }).catch(error => {});
      }
    });
  }, []);
  const checkDataNull = (r) => {
    if (r !== null) {
      setListItem(r.data.items);
      filterStatus(r.data.items, value);
    }
  };
  function filterStatus(list, value) {
    if (value === "ALL") {
      setListOrder(list);
    } else {
      if (list != null) {
        const filData = list.filter(function (item) {
          return item.status === value;
        });
        setListOrder(filData);
      }
    }
  }
  const data = [
    { label: "ALL", value: "ALL" },
    { label: "WAITING FOR APPROVAL", value: "WAITING_FOR_APPROVAL" },
    { label: "APPROVED", value: "APPROVED" },
    { label: "REJECTED", value: "REJECTED" },
    { label: "COMPLETED", value: "COMPLETED" },
  ];
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          value={value}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          onChange={(item) => {
            setValue(item.value);
            filterStatus(listItem, item.value);
          }}
        />
        <View style={styles.containerSearch}>
          <TextField
            text={text}
            onChangeText={(newText) => setText(newText)}
            placeholder={" Search"}
            secureTextEntry={false}
            multiline={false}
          />
          <Buttons text={"Search"} />
          <Buttons
            text={"Back"}
            style={[styles.button, { marginLeft: 20 }]}
            onPressTo={() => navigation.goBack()}
          />
        </View>
      </View>
      <FlatList
        data={listOrder}
        numColumns={5}
        renderItem={({ item }) => (
          <OrderItem
            orderId={item.orderId}
            materialName={item.materialName}
            borrowBy={item.borrowBy}
            amount={item.amount}
            reason={item.reason}
            status={item.status}
            fromDate={item.orderFromDate}
            toDate={item.orderToDate}
            callBackOrder={callBackOrder}
            navigation={navigation}
          />
        )}
      />
      <PaginationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 100,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 150,
    marginTop: 10,
    marginBottom: 20,
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 180,
  },
  dropdown: {
    marginTop: 30,
    marginLeft: 100,
    width: "25%",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
export default OrderMaterial;
