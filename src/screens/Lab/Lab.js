import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Linking } from "react-native";
import { styles } from "../Lab/Lab.style";
import { useDispatch } from "react-redux";
import { SafeAreaView, View, FlatList, Text } from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import { getLaboratoryById } from "../../actions/LaboratoryAction";
import Buttons from "../../components/Buttons";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import {
  getLaboratoryByAccountId,
  getLaboratorySuggestionByAccountId,
  getLaboratoryWaitingByAccountId,
} from "../../networking/CustomNetworkService";
import PaginationBar from "../../components/PaginationBar";
import AsyncStorage from "@react-native-community/async-storage";

const getAccountId = async () => {
  try {
    const accountId = await AsyncStorage.getItem("@accountId");
    console.log("AccountId: " + accountId);
    return accountId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};

const Lab = ({ route, navigation }) => {
  const [numberOfElement, setNumberOfElement] = useState(0);
  const [numberOfElementSuggestion, setNumberOfElementSuggestion] = useState(0);
  const [numberOfElementWaiting, setNumberOfElementWaiting] = useState(0);
  const [items, setItem] = useState([]);
  const [itemsSugges, setItemsSugges] = useState([]);
  const [itemWaiting, setItemWaiting] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [suggestionPage, setSuggestionPage] = useState(1);
  const isApply = true;

  const dispatch = useDispatch();
  const goToLabDetailPage = (labId, isJoined) => {
    dispatch(getLaboratoryById(labId, isJoined, navigation));
  };

  const goToLabDetailPageApproved = (labId, isJoined) => {
    dispatch(getLaboratoryById(labId, isJoined, navigation, isApply));
  };

  const [accountId, setAccountId] = useState("");

  const getLaboratory = (selectedPage) => {
    getAccountId().then((v) => {
      setAccountId(v);
      getLaboratoryByAccountId(v, selectedPage - 1, 5).then((v) => {
        setItem(v.data.data.items);
        setNumberOfElement(v.data.data.totalPage * 5);
      });
    });
  };

  const getLaboratorySuggestion = (selectedPage) => {
    getAccountId().then((v) => {
      setAccountId(v);
      getLaboratorySuggestionByAccountId(v, selectedPage - 1, 5).then((v) => {
        setItemsSugges(v.data.data.items),
          setNumberOfElementSuggestion(v.data.data.totalPage * 5);
      });
    });
  };
  const getLaboratoryWaiting = (selectedPage) => {
    getAccountId().then((v) => {
      setAccountId(v);
      getLaboratoryWaitingByAccountId(v, selectedPage - 1, 5).then((v) => {
        setItemWaiting(v.data.data.items),
          setNumberOfElementWaiting(v.data.data.totalPage * 5);
      });
    });
  };
  useEffect(() => {
    getLaboratory(1);
    getLaboratorySuggestion(1);
    getLaboratoryWaiting(1);
  }, []);

  // const callbackSelectedPage = (pageNumber, suggestionPageNumber) => {
  //   getLaboratory(pageNumber, suggestionPageNumber);
  // };

  const changeSuggestionPage = (suggestionPageNumber) => {
    getLaboratorySuggestion(suggestionPageNumber);
  };

  const changeSelectednPage = (selectedPageNumber) => {
    getLaboratory(selectedPageNumber);
  };
  const changeWaitingPage = (waitingPageNumber) => {
    getLaboratoryWaiting(waitingPageNumber);
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

  const Item3 = ({
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
            onPress={() => goToLabDetailPageApproved(id, isJoined)}
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
      host={item.ownerBy?.userInfo?.username}
      numberMem={item.members}
      description={item.description}
      major={item.major}
      numberOfProject={item.projects}
      isJoined={false}
    />
  );

  const renderItem2 = ({ item }) => (
    <Item2
      id={item.laboratoryId}
      title={item.laboratoryName}
      host={item.ownerBy?.userInfo?.username}
      numberMem={item.members}
      description={item.description}
      major={item.major}
      numberOfProject={item.projects}
      isJoined={true}
    />
  );

  const renderItem3 = ({ item }) => (
    <Item3
      id={item.laboratoryId}
      title={item.laboratoryName}
      host={item.ownerBy?.userInfo?.username}
      numberMem={item.members}
      description={item.description}
      major={item.major}
      numberOfProject={item.projects}
      isJoined={true}
    />
  );

  return (
    <View>
      <HomeTopNavigator navigation={navigation} />
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
          <PaginationBar
            currentSizes={5}
            numberOfElement={numberOfElementSuggestion}
            callbackSelectedPage={changeSuggestionPage}
          />
        </View>
        <View style={styles.top}>
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
          <PaginationBar
            currentSizes={5}
            numberOfElement={numberOfElement}
            callbackSelectedPage={changeSelectednPage}
          />
        </View>
        <View style={styles.top}>
          <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 120 }}>
            Lab Waiting for Approval
          </Text>

          <SafeAreaView style={styles.flatlist}>
            <FlatList
              numColumns={5}
              data={itemWaiting}
              renderItem={renderItem3}
            />
          </SafeAreaView>
          <PaginationBar
            currentSizes={5}
            numberOfElement={numberOfElementSuggestion}
            callbackSelectedPage={changeWaitingPage}
          />
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
