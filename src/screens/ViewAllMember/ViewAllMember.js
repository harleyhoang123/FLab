import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Pressable,
  Modal,
  Image,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LabNavigator from "../../navigations/LabNavigator";
import { SelectList } from "react-native-dropdown-select-list";
import Buttons from "../../components/Buttons";
import { useDispatch } from "react-redux";
import { getmemberDetailByProfileId } from "../../actions/LaboratoryAction";

const ViewAllMember = ({ route, navigation }) => {
  const data = route.params.data;
  const listMember = data.items;
  const [shouldShow, setShouldShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = React.useState("");
  const dispatch = useDispatch();
  const dataDrop = [
    { key: "1", value: "Admin" },
    { key: "2", value: "Lead" },
    { key: "3", value: "Slave" },
  ];

  const goToMemberDetail = (accountId) => {
    dispatch(getmemberDetailByProfileId(accountId, navigation));
  };

  const Item = ({ accountId, id, name, role, ava, code }) => (
    <View style={styles.item}>
      <View style={styles.ava}>
        <Text style={styles.title}>{code}</Text>
      </View>
      <View style={styles.ava}>
        <Image style={styles.tinyLogo} source={{ uri: ava }} />
      </View>
      <View style={styles.name}>
        <Text
          style={[styles.title, styles.blue]}
          onPress={() => goToMemberDetail(accountId)}
        >
          {name}
        </Text>
      </View>
      <View style={styles.role}>
        <Text style={styles.title}>{role}</Text>
        <Icon
          onPress={() => setShouldShow(!shouldShow)}
          style={{ paddingLeft: 5 }}
          name="wrench"
        ></Icon>
        {shouldShow ? (
          <View style={styles.popUp}>
            <View style={{ backgroundColor: "yellow", width: 30 }}>
              <Text onPress={() => setModalVisible(!modalVisible)}>Edit</Text>
            </View>
            <View style={{ backgroundColor: "red" }}>
              <Text>Remove</Text>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      id={item.memberId}
      accountId={item.userInfo.accountId}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.visibleModal(false);
        }}
      >
        <View style={styles.modal}>
          <Text style={{ fontSize: 20 }}>Enter new role</Text>
          <SelectList
            setSelected={(val) => setSelected(val)}
            placeholder={"Task status"}
            data={dataDrop}
            save="value"
            boxStyles={{
              width: 530,
              height: 45,
              marginTop: 10,
              marginBottom: 10,
              marginRight: 5,
            }}
            dropdownStyles={{
              width: 130,
            }}
            search={false}
          />
          <View
            style={{
              marginTop: 20,
              width: "auto",
              margin: 20,
              flexDirection: "row",
            }}
          >
            <Button title="Submit"></Button>
            <Button
              onPress={() => setModalVisible(!modalVisible)}
              title="Close"
              color={"red"}
            ></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  blue: {
    color: "blue",
  },
  modal: {
    backgroundColor: "#f27474",
    width: "50%",
    borderRadius: 15,
    marginTop: "40vh",
    marginLeft: "50vh",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    width: 215,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "45%",
  },
  popUp: {
    zIndex: 2,
    borderWidth: 1,
    borderRadius: 5,
    position: "absolute",
    marginLeft: 164,
    backgroundColor: "#fc4503",
    color: "white",
    flexDirection: "row",
  },
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
    color: "blue",
  },
  role: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    flexDirection: "row",
    zIndex: 1,
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
