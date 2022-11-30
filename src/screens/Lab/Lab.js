import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Linking } from "react-native";
import { styles } from "../Lab/Lab.style";

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import {
  useFonts,
  BeVietnamPro_200ExtraLight_Italic,
} from "@expo-google-fonts/dev";
import LabNavigator from "../../navigations/LabNavigator";
import UserComponent from "../../components/UserComponent";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
    host: "SonHH8",
    numberMem: "100",
    description: "blablah",
    major: "SE",
    numberOfProject: "2",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
    host: "SonHH8",
    numberMem: "100",
    description: "blablah",
    major: "SE",
    numberOfProject: "2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "SW Architecture and Design_Kiến trúc và Thiết kế phần mềm",
    host: "SonHH8",
    numberMem: "100",
    description: "blablah",
    major: "SE",
    numberOfProject: "2",
  },
];

const Lab = ({ navigation }) => {
  const Item = ({
    id,
    title,
    host,
    numberMem,
    description,
    major,
    numberOfProject,
  }) => (
    <View style={styles.item}>
      <View style={styles.itemInfor}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inlineIcon}>
          <Icon style={styles.iconPadding} name="user-circle"></Icon>
          <Text style={styles.host}>{host}</Text>
        </View>
        <View style={styles.inlineIcon}>
          <Icon style={styles.iconPadding} name="id-card"></Icon>
          <Text style={styles.numberMem}>Number of students: {numberMem}</Text>
        </View>
        <View></View>
        <View style={styles.inlineIcon}>
          <Icon style={styles.iconPadding} name="file"></Icon>
          <Text style={styles.description}>Description: {description}</Text>
        </View>
        <View style={styles.inlineIcon}>
          <Icon style={styles.iconPadding} name="object-group"></Icon>
          <Text style={styles.description}>Major: {major}</Text>
        </View>
        <View style={styles.inlineIcon}>
          <Icon style={styles.iconPadding} name="window-restore"></Icon>
          <Text style={styles.description}>
            Number Of Project: {numberOfProject}
          </Text>
        </View>
        <View style={styles.inlineIconLink}>
          <Text onPress={() => navigation.push("YourLab")} style={styles.link}>
            Go to your Lab{"  "}
          </Text>
          <Icon
            style={styles.iconPadding}
            size={16}
            color="#0078D4"
            name="arrow-right"
          ></Icon>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      title={item.title}
      host={item.host}
      numberMem={item.numberMem}
      description={item.description}
      major={item.major}
      numberOfProject={item.numberOfProject}
    />
  );
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 120 }}>
            Suggestion
          </Text>
          <SafeAreaView style={styles.flatlist}>
            <FlatList
              numColumns={5}
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
        <View style={styles.bot}>
          <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 120 }}>
            Recent
          </Text>
          <SafeAreaView style={styles.flatlist}>
            <FlatList
              numColumns={5}
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default Lab;
