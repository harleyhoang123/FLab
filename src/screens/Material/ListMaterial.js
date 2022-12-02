import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import MaterialItem from "../../components/MaterialItem";
import PaginationBar from "../../components/PaginationBar";
import LabNavigator from "../../navigations/LabNavigator";

const list1 = [
  {
    title: "Laptop 1",
    status: "Free",
  },
  {
    title: "Iphone",
    status: "Free",
  },
  {
    title: "Ipad",
    status: "Free",
  },
  {
    title: "PC",
    status: "Busy",
  },
];
const list2 = [
  {
    title: "Laptop 1",
    status: "Free",
  },
  {
    title: "Iphone",
    status: "Free",
  },
  {
    title: "Ipad",
    status: "Free",
  },
];
function ListMaterial({ navigation }) {
  const meterialIdfake = "638812440de84f751463f558";

  const [text, setText] = useState("");
  const [booked, setBooked] = useState(false);
  const [list, setList] = useState(list1);
  const handleClick = () => {
    setBooked(!booked);
    handleData();
  };
  const handleData = () => {
    if (booked) {
      setList(list1);
    } else {
      setList(list2);
    }
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>List Materials</Text>
        </View>
        <View style={styles.containerSearch}>
          <TextField
            text={text}
            onChangeText={(newText) => setText(newText)}
            placeholder={" Search"}
            secureTextEntry={false}
            multiline={false}
          />
          <Buttons text={"Search"} onPressTo={handleClick} />
          <Buttons
            text={"Order Material"}
            style={[styles.button, { marginLeft: 20 }]}
            onPressTo={() => navigation.push("OrderMaterial")}
          />
          <Buttons
            text={"Add Material"}
            style={[styles.button, { marginLeft: 20 }]}
            onPressTo={() => navigation.push("AddMaterial")}
          />
        </View>
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <MaterialItem
            id={meterialIdfake}
            title={item.title}
            status={item.status}
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
});
export default ListMaterial;
