import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import Buttons from "../../components/Buttons";
import ProfileComponent from "../../components/ProfileComponent";
import TextField from "../../components/TextField";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import {
  changePassword,
  getAccountInfoByAccountId,
  getAccountInfoByAccountIdToEdit,
} from "../../actions/UserAction";
import AsyncStorage from "@react-native-community/async-storage";
import * as DocumentPicker from "expo-document-picker";
import {
  changeAvatar, changeEmail,
  getProfileDetail, sendOTPToPhoneNumber, verifyNewPhoneNumber,
} from "../../networking/CustomNetworkService";

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
  let isValidPassword = true;
  let isEmail = true;
  let isPhoneNumberVerify = true;
  let isOTP=true;
  const response = route.params.data;
  const fullName = response.fullName;
  const gender = response.gender;
  const dateOfBirth = response.dateOfBirth;
  const address = response.address;
  const emailInfo = response.email;
  const phoneNumberInfo = response.phoneNumber;
  const studentId = response.studentId;
  const studentCode = response.studentCode;
  const major = response.major;
  const currentTermNo = response.currentTermNo;
  const description = response.description;
  const award = response.award;
  const interest = response.interest;
  const specialized = response.specialized;
  const [avatar, setAvatar] = useState(response.avatar);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState("");
  const [accountId, setAccountId] = useState("");
  const [isNewPassword, setIsValidNewPassword] = useState(false);
  const [isOldPassword, setIsValidOldPassword] = useState(false);
  const [isReNewPassword, setIsReNewPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneNumberVerifyValid, setIsPhoneNumberVerify] = useState(false);
  const [isOTPValid, setIsOTPValid] = useState(false);
  const regexPassword =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&.,]{8,}$";
  const regexEmail =
    "^[a-z][a-z0-9_.]{3,100}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$";
  const regexPhoneNumber = "(84|0[3|5|7|8|9])+([0-9]{8})\\b";

  function validateEmail() {
    if (!email.match(regexEmail)) {
      setIsEmailValid(true);
      isEmail = false;
    } else {
      setIsEmailValid(false);
    }
    if (isEmail) {
      handleChangeEmail()
      setIsEmailValid(false);
    }
  }

  function verifyPhone() {
    if (!verifyPhoneNumber.match(regexPhoneNumber)) {
      setIsPhoneNumberVerify(true);
      isPhoneNumberVerify = false;
    } else {
      setIsPhoneNumberVerify(false);
    }
    if (isPhoneNumberVerify) {
      handleSendOTP();
      setIsPhoneNumberVerify(false);
    }
  }
  function validateOTP() {
    if (otp.length<6) {
      setIsOTPValid(true);
      isOTP = false;
    } else {
      setIsOTPValid(false);
    }
    if (isOTP) {
      handleVerify();
      setIsOTPValid(false);
    }
  }

  function validatePassword() {
    if (!oldPassword.match(regexPassword)) {
      setIsValidOldPassword(true);
      isValidPassword = false;
    } else {
      setIsValidOldPassword(false);
    }
    if (!newPassword.match(regexPassword)) {
      setIsValidNewPassword(true);
      isValidPassword = false;
    } else {
      setIsValidNewPassword(false);
    }
    if (!(newPassword === reNewPassword)) {
      setIsReNewPassword(true);
      isValidPassword = false;
    } else {
      setIsReNewPassword(false);
    }
    if (isValidPassword) {
      handleChangePassword();
    }
  }

  getAccountId().then((v) => setAccountId(v));
  const dispatch = useDispatch();
  const handleChangePassword = () => {
    console.log("Oll Password: " + oldPassword);
    console.log("New Password: " + newPassword);
    dispatch(changePassword(oldPassword, newPassword, accountId, navigation));
  };

  const handleChangeEmail=()=>{
    changeEmail(accountId,email, navigation).then(v=> {setEmail("")})
  }
  const handleSendOTP=()=>{
    sendOTPToPhoneNumber(accountId,verifyPhoneNumber,navigation).then(v=>{})
  }
  const handleVerify=()=>{
    verifyNewPhoneNumber(accountId,otp,navigation).then(v=> setVerifyPhoneNumber(""))
  }
  const goToEditProfile = () => {
    console.log("EditProfile: ");
    dispatch(getAccountInfoByAccountIdToEdit(accountId, navigation));
  };
  const dateTimeFormatter = (date) => {
    const formattedDate = new Date(date);
    let day = formattedDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = formattedDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    return day + "-" + month + "-" + formattedDate.getFullYear();
  };
  const updateAvatar = async (accountId) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });
    console.log(result);
    if (!result.cancelled) {
      const imagePicked = {
        name: result.name,
        base64: result.uri,
        size: result.size,
        mimeType: result.mimeType,
      };
      changeAvatar(accountId, imagePicked, navigation).then((v) =>
        getProfileDetail(accountId, navigation).then((r) =>
          setAvatar(r.data.avatar)
        )
      );
    }
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
          <TouchableOpacity
            style={{ right: 30 }}
            onPress={() => updateAvatar(accountId)}
          >
            <FontAwesomeIcon icon={faCamera} size={"2x"} />
          </TouchableOpacity>
          <Text style={styles.textName}>{fullName}</Text>
        </View>
        <View style={styles.containerInfo}>
          <ProfileComponent title={"Description"} information={description} />
          <ProfileComponent title={"Awards"} information={award} />
          <ProfileComponent title={"Interest"} information={interest} />
          <View style={styles.info}>
            <ProfileComponent
              title={"Date of birth"}
              information={dateTimeFormatter(dateOfBirth)}
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
          <View>
            {!!isOldPassword && (
              <Text style={styles.inputInvalid}>Invalid old password</Text>
            )}
          </View>
          <TextField
            text={newPassword}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
            placeholder={" New Password"}
            secureTextEntry={true}
            style={styles.textField}
          />
          <View>
            {!!isNewPassword && (
              <Text style={styles.inputInvalid}>Invalid old password</Text>
            )}
          </View>
          <TextField
            text={reNewPassword}
            onChangeText={(reNewPassword) => setReNewPassword(reNewPassword)}
            placeholder={" Re-New Password"}
            secureTextEntry={true}
            style={styles.textField}
          />
          <View>
            {!!isReNewPassword && (
              <Text style={styles.inputInvalid}>
                Not match with new password, re-enter your password
              </Text>
            )}
          </View>
          <Buttons
            style={styles.button}
            onPressTo={validatePassword}
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
            {!!isEmailValid && (
              <Text style={styles.inputInvalid}>Email invalid</Text>
            )}
            <Buttons
              onPressTo={validateEmail}
              style={styles.button}
              text={"Change Email"}
            />
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
            {!!isPhoneNumberVerifyValid && (
              <Text style={styles.inputInvalid}>Phone number invalid</Text>
            )}
            <Buttons
                onPressTo={verifyPhone}
                style={styles.button}
                text={"Send OTP"}
            />
          </View>
          <View>
            <View style={styles.containerInfo}>
              <Text style={styles.text}>Enter your code</Text>
              <TextField
                  text={otp}
                  onChangeText={(otp) => setOtp(otp)}
                  placeholder={" OTP"}
                  secureTextEntry={false}
                  style={styles.textField}
              />
              {!!isOTPValid && (
                  <Text style={styles.inputInvalid}>Invalid OTP</Text>
              )}
              <Buttons
                  onPressTo={validateOTP}
                  style={styles.button}
                  text={"Verify"}
              />
            </View>
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
  inputInvalid: {
    marginLeft: 15,
    color: "red",
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
  },
  textName: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 50,
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
