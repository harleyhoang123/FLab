import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Linking } from "react-native";
import { styles } from "../Lab/Lab.style";
import { useDispatch } from "react-redux";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import { getLaboratoryById } from "../../actions/LaboratoryAction";
import Buttons from "../../components/Buttons";

const Lab = ({ route, navigation }) => {
  const data = route.params.data;
  const items = data.joinedLaboratories.items;
  const itemsSugges = data.suggestLaboratories.items;
  const dispatch = useDispatch();
  const goToLabDetailPage = (labId, isJoined) => {
    dispatch(getLaboratoryById(labId, isJoined, navigation));
  };

  const Item = ({
    id,
    title,
    host,
    numberMem,
    description,
    major,
    numberOfProject,
    isJoined,
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
          <Text
            onPress={() => goToLabDetailPage(id, isJoined)}
            style={styles.link}
          >
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

  const Item2 = ({
    id,
    title,
    host,
    numberMem,
    description,
    major,
    numberOfProject,
    isJoined,
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
          <Text
            onPress={() => goToLabDetailPage(id, isJoined)}
            style={styles.link}
          >
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
      isJoined={true}
    />
  );

  const renderItem2 = ({ item }) => (
    <Item2
      id={item.laboratoryId}
      title={item.laboratoryName}
      host={item.ownerBy.userInfo.username}
      numberMem={item.members}
      description={item.description}
      major={item.major}
      numberOfProject={item.projects}
      isJoined={false}
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
              renderItem={renderItem}
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
              renderItem={renderItem2}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
        <View style={styles.btn}>
          <Buttons
            text={"Create Lab"}
            style={styles.button}
            onPressTo={() => {
              navigation.navigate("CreateLab");
            }}
          />
          <Buttons
            text={"Back"}
            style={styles.button}
            onPressTo={() => {
              navigation.goBack(null);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Lab;
