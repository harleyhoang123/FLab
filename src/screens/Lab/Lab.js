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
import usePagination from "react-native-flatlist-pagination-hook";

const Lab = ({ route, navigation }) => {
  const data = route.params.data;
  const items = data.joinedLaboratories.items;
  const itemsSugges = data.suggestLaboratories.items;
  console.log(JSON.stringify(items[0].ownerBy.userInfo.username));
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
      id={item.laboratoryId}
      title={item.laboratoryName}
      host={item.ownerBy.userInfo.username}
      numberMem={item.members}
      description={item.description}
      major={item.major}
      numberOfProject={item.projects}
    />
  );

  const renderItem2 = ({ item }) => (
    <Item
      id={item.laboratoryId}
      title={item.laboratoryName}
      host={item.ownerBy.userInfo.username}
      numberMem={item.members}
      description={item.description}
      major={item.major}
      numberOfProject={item.projects}
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
              data={itemsSugges}
              renderItem={renderItem2}
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
              data={items}
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
