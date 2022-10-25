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
//import { styles } from "./Document.style";
import HomeTopNavigator from "../navigations/HomeNavigation";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Report 3",
    labname: "FPT Labmanagement",
    time: "9 year ago",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Report 3",
    labname: "FPT Labmanagement",
    time: "9 year ago",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Report 3",
    labname: "FPT Labmanagement",
    time: "9 year ago",
  },
];

const DATA2 = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b1",
    title: "Report 3",
    labname: "FPT Labmanagement",
    change: "9 year ago",
    content: "fiuywqhbefiuolbqweiulf",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f62",
    title: "Report 3",
    labname: "FPT Labmanagement",
    change: "9 year ago",
    content: "fiuywqhbefiuolbqweiulf",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Report 3",
    labname: "FPT Labmanagement",
    change: "9 year ago",
    content: "fiuywqhbefiuolbqweiulf",
  },
];

const Item = ({ title, labname, time }) => (
  <View style={styles.item}>
    <View style={styles.first}>
      <Icon style={styles.iconBook} name="book" size={25}></Icon>
    </View>
    <View style={styles.secound}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.labname}>
        {labname} | {time}
      </Text>
    </View>
    <View style={styles.third}>
      <Icon style={styles.iconEdit} name="edit" size={20}></Icon>
    </View>
  </View>
);

const Item2 = ({ title, labname, change, content }) => (
  <View style={styles.item}>
    <View style={styles.first}>
      <Icon style={styles.iconBook} name="book" size={25}></Icon>
    </View>
    <View style={styles.secound}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.labname}>
        {labname} | {change}
      </Text>
      <Text style={styles.labname}>{content}</Text>
    </View>
    <View style={styles.third}>
      <Icon style={styles.iconEdit} name="edit" size={20}></Icon>
    </View>
  </View>
);

const Doucument = ({ navigation }) => {
  const image = {
    uri: "https://ptc-directory-sited-static.us-east-1.prod.public.atl-paas.net/gradients/3.svg",
  };
  const renderItem = ({ item }) => (
    <Item title={item.title} labname={item.labname} time={item.time} />
  );
  const renderItem2 = ({ item }) => (
    <Item2
      title={item.title}
      labname={item.labname}
      change={item.change}
      content={item.content}
    />
  );
  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <ImageBackground source={image}>
            <View style={styles.displaycenter}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.avatar}
              />
              <Text style={styles.username}>Hoang Hai Son</Text>
            </View>
          </ImageBackground>
          <View>
            <View style={styles.inlineIcon}>
              <Icon
                style={styles.iconPadding}
                name="home"
                size={20}
                color="#0052CC"
              ></Icon>
              <Text style={styles.leftText}>Overview</Text>
            </View>
            <View style={styles.inlineIcon}>
              <Icon
                style={styles.iconPadding}
                name="history"
                size={20}
                color="#0052CC"
              ></Icon>
              <Text style={styles.leftText}>Recent</Text>
            </View>
          </View>
        </View>
        <View style={styles.center}>
          <View style={styles.top}>
            <ImageBackground source={image}>
              <View style={styles.bannerCenter}>
                <Text style={styles.contentCenter}>
                  Pick up where you left off
                </Text>
              </View>
            </ImageBackground>
            <SafeAreaView style={styles.flatlist}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView>
          </View>

          <View style={styles.bot}>
            <ImageBackground source={image}>
              <View style={styles.bannerCenter}>
                <Text style={styles.contentCenter}>
                  Discover what's happening
                </Text>
              </View>
            </ImageBackground>
            <SafeAreaView style={styles.flatlist}>
              <FlatList
                data={DATA2}
                renderItem={renderItem2}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView>
          </View>
        </View>
        <View style={styles.right}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    marginBottom: 30,
  },
  bot: {},
  bannerCenter: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    height: 70,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  contentCenter: {
    fontSize: 22,
    marginLeft: 20,
  },
  labname: {
    color: "#172b4d",
  },
  iconEdit: {
    paddingBottom: 5,
  },
  iconBook: {
    paddingTop: 10,
  },
  titleText: {
    fontSize: 18,
    color: "#172b4d",
    fontWeight: "bold",
  },
  first: {
    width: 30,
  },
  secound: {
    width: 600,
  },
  third: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  item: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
  },
  leftText: {
    fontSize: 17,
    color: "#0052CC",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 8,
    paddingTop: 8,
  },
  inlineIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  username: {
    marginTop: 10,
    color: "rgb(53,77,119)",
    fontFamily: "BeVietnamPro_200ExtraLight_Italic, sans-serif",
    fontSize: 17,
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 200,
    marginRight: 200,
  },
  right: {
    // backgroundColor: "blue",
    width: 450,
    height: 300,
  },
  center: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    width: 700,
    height: "auto",
    marginRight: 50,
  },
  left: {
    width: 275,
    height: 300,
    marginRight: 50,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  displaycenter: {
    marginTop: 32,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Doucument;
