import React, {useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const getRoles = async () => {
    try {
        return await AsyncStorage.getItem("@roles");
    } catch (e) {
        console.log("Can't get roles: " + e);
    }
};
function ForumNavigation({ navigation }) {
    const [roles, setRoles] = useState([]);
    getRoles().then((v) => {setRoles(v)});
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push("Forum")}
      >
        <Text style={styles.textLogo}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push("MyQuestion")}
      >
        <Text style={styles.textLogo}>My question</Text>
      </TouchableOpacity>
        {roles.includes("MANAGER")|| roles.includes("ADMIN")&&
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.push("ListTag")}
            >
                <Text style={styles.textLogo}>Setting</Text>
            </TouchableOpacity>
        }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  button: {
    justifyContent: "center",
    margin: 15,
  },
  textLogo: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
export default ForumNavigation;
