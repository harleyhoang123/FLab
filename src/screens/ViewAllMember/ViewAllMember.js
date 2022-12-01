import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from "react-native";
import LabNavigator from "../../navigations/LabNavigator";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
    role: "lead",
    ava: "https://reactnative.dev/img/tiny_logo.png",
    code: "HE140112",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Item",
    role: "lead",
    ava: "https://reactnative.dev/img/tiny_logo.png",
    code: "HE140112",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Third Item",
    role: "lead",
    ava: "https://reactnative.dev/img/tiny_logo.png",
    code: "HE140112",
  },
];

const Item = ({ name, role, ava, code }) => (
  <View style={styles.item}>
    <View style={styles.ava}>
      <Text style={styles.title}>{code}</Text>
    </View>
    <View style={styles.ava}>
      <Image style={styles.tinyLogo} source={{ uri: ava }} />
    </View>
    <View style={styles.name}>
      <Text style={styles.title}>{name}</Text>
    </View>
    <View style={styles.role}>
      <Text style={styles.title}>{role}</Text>
    </View>
  </View>
);

const ViewAllMember = ({ route, navigation }) => {
  const data = route.params.data;
  const listMember = data.items;
  const renderItem = ({ item }) => (
    <Item
      id={item.memberId}
      name={item.userInfo.userInfo.fullName}
      role={item.userInfo.userInfo.roles}
      ava={item.ava}
      code={item.memberId}
    />
  );
  return (
    <View style={styles.comp}>
      <LabNavigator navigation={navigation} />
      <View>
        <Text style={styles.titleContent}>List all member in your lab</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.tableForm}>
          <View style={[styles.ava]}>
            <Text style={styles.title}>Code</Text>
          </View>
          <View style={[styles.ava]}>
            <Text style={styles.title}>Ava</Text>
          </View>
          <View style={[styles.name]}>
            <Text style={styles.title}>Name</Text>
          </View>
          <View style={[styles.role]}>
            <Text style={styles.title}>Role</Text>
          </View>
        </View>
        <FlatList
          data={listMember}
          renderItem={renderItem}
          keyExtractor={(item) => item.memberId}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  comp: {
    backgroundColor: "rgb(255, 255, 255)",
  },
  tableForm: {
    display: "flex",
    flexDirection: "row",
  },
  ava: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  name: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  role: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    marginTop: 30,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    marginLeft: 10,
    marginRight: 10,
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
  },
  titleContent: {
    fontSize: 32,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    color: "#0078D4",
  },
});

export default ViewAllMember;
