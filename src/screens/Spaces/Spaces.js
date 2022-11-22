import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";
import {
  useFonts,
  BeVietnamPro_200ExtraLight_Italic,
} from "@expo-google-fonts/dev";
import LabNavigator from "../../navigations/LabNavigator";

const listWorkSpace = [
  {
    id: "1",
    nameWorkSpace: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
  },
  {
    id: "2",
    nameWorkSpace: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
  },
];

const yourSpace = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: "https://reactnative.dev/img/tiny_logo.png",
    name: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bz",
    image: "https://reactnative.dev/img/tiny_logo.png",
    name: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
  },
];
const Item = ({ image, name }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemData}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.nameSpace}>{name}</Text>
    </View>
  </View>
);

const ItemWorkSpace = ({ nameWorkSpace }) => (
  <View style={styles.itemWsData}>
    <Text style={styles.nameSpace}>{nameWorkSpace}</Text>
  </View>
);

const Spaces = ({ navigation }) => {
  const renderItem = ({ item }) => <Item image={item.image} name={item.name} />;
  const renderItemWorkSpace = ({ item }) => (
    <ItemWorkSpace nameWorkSpace={item.nameWorkSpace} />
  );
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.leftHeader}>
            <Text style={styles.leftContent}>List WorkSpace</Text>
          </View>
          <View style={styles.yourSpace}>
            <SafeAreaView style={styles.flatlist}>
              <FlatList
                numColumns={1}
                data={listWorkSpace}
                renderItem={renderItemWorkSpace}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.rightContent}>
            <Text style={styles.cotentName}>Your spaces</Text>
            <View style={styles.yourSpace}>
              <SafeAreaView style={styles.flatlist}>
                <FlatList
                  numColumns={5}
                  data={yourSpace}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </SafeAreaView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  yourSpace: { marginTop: 30 },
  itemContainer: {
    borderColor: "#DEE2E6",
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    borderWidth: 1,
    width: 350,
    height: 145,
    margin: 4,
  },
  nameSpace: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemData: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
  },
  itemWsData: {
    borderColor: "#DEE2E6",
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  left: {
    width: "18%",
    height: "100vh",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  right: {
    width: "82%",
    height: "100%",
  },
  leftContent: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 8,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRightColor: "white",
    fontFamily: "sans-serif",
    fontSize: 16,
  },
  rightContent: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 8,
    paddingLeft: 20,
  },
  cotentName: {
    fontSize: 24,
  },
});

export default Spaces;
