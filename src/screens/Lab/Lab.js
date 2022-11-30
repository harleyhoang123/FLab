import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./Lab.style";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
} from "react-native";

import LabNavigator from "../../navigations/LabNavigator";

function Lab ({ route, navigation }) {
  const res = route.params;
  console.log(JSON.stringify(res));

  const items = res.data.items;

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
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.container}>
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
  );
};

export default Lab;
