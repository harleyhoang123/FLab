import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import Buttons from "../../components/Buttons";
import ProfileComponent from "../../components/ProfileComponent";
import TextField from "../../components/TextField";
import { useDispatch } from "react-redux";
import {
  changePassword,
  getAccountInfoByAccountId,
  getAccountInfoByAccountIdToEdit,
} from "../../actions/UserAction";
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
function Profile({ route, navigation }) {
  const response = route.params.data;
  const fullName = response.fullName;
  const avatar = response.avatar;
  const profileId = response.profileId;
  const gender = response.gender;
  const dateOfBirth = response.dateOfBirth;
  const address = response.address;
  const emailInfo = response.email;
  const phoneNumberInfo = response.phoneNumber;
  const studentId = response.studentId;
  const studentCode = response.studentCode;
  const major = response.major;
  const currentTermNo = response.currentTermNo;
  const specialized = response.specialized;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState("");
  const [accountId, setAccountId] = useState("");
  const [notify, setNotify] = useState("");
  getAccountId().then((accountId) => setAccountId(accountId));
  const dispatch = useDispatch();
  const handleChangePassword = () => {
    console.log("Oll Password: " + oldPassword);
    console.log("New Password: " + newPassword);
    dispatch(changePassword(oldPassword, newPassword, accountId));
  };
  const goToEditProfile = () => {
    console.log("EditProfile: ");
    dispatch(
      getAccountInfoByAccountIdToEdit(
        response.lastModifiedBy.accountId,
        navigation
      )
    );
  };
  return (
    <View style={styles.container}>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.containerProfile}>
        <View style={styles.containerName}>
          <Image
            style={styles.userImage}
            source={{
              uri: avatar,
            }}
          />
          <Text style={styles.textName}>{fullName}</Text>
        </View>
        <View style={styles.containerInfo}>
          <View style={styles.info}>
            <ProfileComponent
              title={"Date of birth"}
              information={dateOfBirth}
            />
            <ProfileComponent title={"Gender"} information={gender} />
          </View>
          <ProfileComponent title={"Address"} information={address} />
          <ProfileComponent
            title={"Phone number"}
            information={phoneNumberInfo}
          />
          <ProfileComponent title={"Email"} information={emailInfo} />
          <View style={styles.info}>
            <ProfileComponent title={"Roll number"} information={studentId} />
            <ProfileComponent title={"Member Code"} information={studentCode} />
          </View>
          <View style={styles.info}>
            <ProfileComponent title={"Major"} information={major} />
            <ProfileComponent
              title={"Current Term No"}
              information={currentTermNo}
            />
            <ProfileComponent title={"Specialized"} information={specialized} />
          </View>
        </View>
        <View style={styles.containerInfo}>
          <Buttons
            style={styles.button}
            text={"Edit Profile"}
            onPressTo={goToEditProfile}
          />
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.text}>Change PassWord</Text>
          <TextField
            text={oldPassword}
            onChangeText={(oldPassword) => setOldPassword(oldPassword)}
            placeholder={" Old Password"}
            secureTextEntry={true}
            style={styles.textField}
          />
          <TextField
            text={newPassword}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
            placeholder={" New Password"}
            secureTextEntry={true}
            style={styles.textField}
          />
          <TextField
            text={reNewPassword}
            onChangeText={(reNewPassword) => setReNewPassword(reNewPassword)}
            placeholder={" Re-New Password"}
            secureTextEntry={true}
            style={styles.textField}
          />
          <Text>{notify}</Text>
          <Buttons
            style={styles.button}
            onPressTo={handleChangePassword}
            text={"Change Password"}
          />
        </View>
        <View>
          <View style={styles.containerInfo}>
            <Text style={styles.text}>Change Email</Text>
            <TextField
              text={email}
              onChangeText={(email) => setEmail(email)}
              placeholder={" Email"}
              secureTextEntry={false}
              style={styles.textField}
            />
            <Text>{notify}</Text>
            <Buttons style={styles.button} text={"Change Email"} />
          </View>
        </View>
        <View>
          <View style={styles.containerInfo}>
            <Text style={styles.text}>Change Phone Number</Text>
            <TextField
              text={phoneNumber}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              placeholder={" Phone Number"}
              secureTextEntry={false}
              style={styles.textField}
            />
            <Text>{notify}</Text>
            <Buttons style={styles.button} text={"Change Phone Number"} />
          </View>
        </View>
        <View>
          <View style={styles.containerInfo}>
            <Text style={styles.text}>Verify Phone Number</Text>
            <TextField
              text={verifyPhoneNumber}
              onChangeText={(verifyPhoneNumber) =>
                setVerifyPhoneNumber(verifyPhoneNumber)
              }
              placeholder={" Phone Number"}
              secureTextEntry={false}
              style={styles.textField}
            />
            <Text>{notify}</Text>
            <Buttons style={styles.button} text={"Verify Phone Number"} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flex: 1,
  },
  containerProfile: {
    flex: 1,
    alignSelf: "center",
    width: "70%",
    backgroundColor: "white",
  },
  containerName: {
    paddingLeft: 100,
    margin: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  containerInfo: {
    margin: 20,
    paddingLeft: 100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  info: {
    flexDirection: "row",
  },
  userImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginRight: 50,
  },
  textName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: 250,
    marginLeft: 15,
  },
  textField: {
    width: "80%",
  },
});
export default Profile;
