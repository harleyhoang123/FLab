import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch } from "react-redux";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import Buttons from "../../components/Buttons";
import { getRequestDetailByApplicationId } from "../../actions/LaboratoryAction";
import { getAllRequestInLab } from "../../networking/CustomNetworkService";
import PaginationBar from "../../components/PaginationBar";

export default function ViewAllRequest({ route, navigation }) {
  const listRequest = route.params.data;
  const [items, setItem] = useState([]);
  const [numberOfElement, setNumberOfElement] = useState(0);
  const [selected, setSelected] = React.useState("");
  const [selectedId, setSelectedId] = useState("");

  const allStatus = [
    { key: "1", value: "APPROVED" },
    { key: "2", value: "REJECTED" },
    { key: "3", value: "WAITING_FOR_APPROVAL" },
  ];

  let data = listRequest.items;

  // function filterStatus(data) {
  //   const filData = data.filter((item) => {
  //     return item.status === selected;
  //   });
  //   console.log("List all req:" + JSON.stringify(data));
  //   console.log("Data test:" + JSON.stringify(filData));
  //   setData(filData);
  // }

  const getAllRequestInLabHandler = (selectedPage) => {
    getAllRequestInLab(selectedPage - 1, 5).then((v) => {
      setItem(v.data.data.items);
      setNumberOfElement(v.data.data.totalPage * 5);
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getAllRequestInLabHandler(1);
  }, []);

  const changeSelectedPage = (selectedPageNumber) => {
    getAllRequestInLabHandler(selectedPageNumber);
  };

  const goToRequestDetail = (applicationId) => {
    console.log("RqId: " + JSON.stringify(applicationId));
    dispatch(getRequestDetailByApplicationId(applicationId, navigation));
  };

  const Item = ({ applicationId, email, fullName }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{fullName} is waitting your response</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Email: {email}</Text>
        <View style={{ marginLeft: "60%", flexDirection: "row" }}>
          <Text
            onPress={() => goToRequestDetail(applicationId)}
            style={styles.action}
          >
            Detail
          </Text>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item
      applicationId={item.applicationId}
      fullName={item.createdBy.userInfo.fullName}
      email={item.createdBy.userInfo.email}
    />
  );
  return (
    <View>
      <ProjectNavigator navigation={navigation} />

      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>List all request</Text>
        <SafeAreaView>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.applicationId}
          />
        </SafeAreaView>
        <PaginationBar
          currentSizes={5}
          numberOfElement={numberOfElement}
          callbackSelectedPage={changeSelectedPage}
        />
        <Buttons
          text={"Back"}
          style={styles.buttonBack}
          onPressTo={() => {
            navigation.goBack(null);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonFilter: {
    marginTop: 20,
    width: 130,
    marginLeft: 5,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 30,
    color: "white",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    width: 215,
  },
  action: {
    borderRadius: 5,
    color: "white",
    backgroundColor: "black",
    padding: 5,
    marginRight: 2,
  },
  container: {
    flexDirection: "column",
    marginTop: 30,
    marginLeft: 50,
  },
  item: {
    width: "70%",
    borderRadius: 5,
    margin: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  title: {
    fontSize: 23,
    fontWeight: 400,
  },
  heading: {
    fontSize: 26,
    fontWeight: 700,
  },
});
