import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Logo from "../assets/Logo";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import {getListQuestion} from "../actions/ForumAction";
import {getListNews} from "../actions/NewsAction";
import RightNavigation from "./RightNavigation";

const getAccountId = async () => {
  try {
    const accountId = await AsyncStorage.getItem("@accountId");
    console.log("AccountId: " + accountId);
    return accountId;
  } catch (e) {
    console.log("Can't get account id: " + e);
  }
};
export default function HomeTopNavigator({ navigation }) {
  const [accountId, setAccountId] = useState("");
  getAccountId().then((v) => setAccountId(v));
  const dispatch = useDispatch();
  const goToForum = () => {
    dispatch(getListQuestion(navigation));
  };
  const gotoNews = () => {
    console.log("Click go to news");
    dispatch(getListNews(navigation));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigationContent}>
        <View style={styles.topNavigationContentLeft}>
          <TouchableOpacity
            style={styles.btnLogo}
            onPress={() => navigation.push("Home")}
          >
            <Logo />
            <Text style={styles.textLogo}>FLAB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("Home")}
          >
            <Text style={styles.textLogo}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("Lab", { data: accountId })}
          >
            <Text style={styles.textLogo}>Lab</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToForum}>
            <Text style={styles.textLogo}>Forum</Text>
          </TouchableOpacity>
          {/*TODO: Check role of button*/}
          {/* {roles.includes("ADMIN") && ( */}
          <TouchableOpacity style={styles.button} onPress={gotoNews}>
            <Text style={styles.textLogo}>News</Text>
          </TouchableOpacity>
          {/* )} */}

        </View>
        <RightNavigation navigation={navigation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  topNavigationContent: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  topNavigationContentLeft: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  btnLogo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  textLogo: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
