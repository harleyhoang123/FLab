import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Documents/Document.style";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";
import {
  useFonts,
  BeVietnamPro_200ExtraLight_Italic,
} from "@expo-google-fonts/dev";
import LabNavigator from "../../navigations/LabNavigator";
import ProjectNavigator from "../../navigations/ProjectNavigator";

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

const Doucument = ({ navigation }) => {
  const Item = ({ title, labname, time }) => (
    <View style={styles.item}>
      <View style={styles.first}>
        <Icon style={styles.iconBook} name="book" size={25}></Icon>
      </View>
      <View style={styles.secound}>
        <Text
          style={styles.titleText}
          onPress={() => navigation.push("DocumentDetail")}
        >
          {title}
        </Text>
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
      <ProjectNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.left}>
          <ImageBackground source={image}>
            <View style={styles.displaycenter}>
              <Image
                source={require("../../assets/logo.png")}
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

export default Doucument;
