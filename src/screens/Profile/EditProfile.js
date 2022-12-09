import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-web";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import EditProfileComponent from "../../components/EditProfileComponent";
import Buttons from "../../components/Buttons";
import { RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/UserAction";
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
function EditProfile({ route, navigation }) {
  const response = route.params.data;
  // const fullNameInfo=response.lastModifiedBy.userInfo.fullName;
  const avatar = response.avatar;
  // const profileId = response.profileId;
  // const accountId= response.lastModifiedBy.accountId
  const descriptionData = response.description;
  const interestData = response.interest;
  const genderInfo = response.gender;
  const dateOfBirthInfo = response.dateOfBirth;
  const awardData = response.award;
  const addressInfo = response.address;
  const phoneNumberInfo = response.phoneNumber;
  const studentIdInfo = response.studentId;
  const studentCode = response.studentCode;
  const majorInfo = response.major;
  const currentTermNoInfo = response.currentTermNo;
  const specializedInfo = response.specialized;
  const [profileId, setProfileId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(dateOfBirthInfo);
  const [gender, setGender] = useState(genderInfo);
  const [address, setAddress] = useState(addressInfo);
  const [description, setDescription] = useState(descriptionData);
  const [award, setAward] = useState(awardData);
  const [interest, setInterest] = useState(interestData);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberInfo);
  const [studentId, setRollNumber] = useState(studentIdInfo);
  const [memberCode, setMemberCode] = useState(studentCode);
  const [major, setMajor] = useState(majorInfo);
  const [currentTermNo, setCurrentTermNo] = useState(currentTermNoInfo);
  const [specialized, setSpecialized] = useState(specializedInfo);
  const dispatch = useDispatch();
  const updatedProfile = () => {
    dispatch(
      updateProfile(
        profileId,
        gender,
        dateOfBirth,
        address,
        phoneNumber,
        studentId,
        memberCode,
        major,
        currentTermNo,
        specialized,
        description,
        award,
        interest,
        navigation
      )
    );
  };
  getAccountId().then((v) => setProfileId(v));
  console.log("profileId" + profileId);
  return (
    <View style={styles.container}>
      <HomeTopNavigator navigation={navigation} />
      <View style={styles.containerProfile}>
        <View style={styles.containerImage}>
          <Text style={styles.textName}>Edit Profile</Text>
          <TouchableOpacity>
            <Image
              style={styles.userImage}
              source={{
                uri: avatar,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerSmall}>
          <EditProfileComponent
            text={dateOfBirth}
            placeholder={" Date Of Birth"}
            title={"Date Of Birth"}
            onTextChange={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
            style={{ width: "99%" }}
          />
          <EditProfileComponent
            text={description}
            placeholder={"Description"}
            title={"Description"}
            onTextChange={(description) => setDescription(description)}
            style={{ width: "99%" }}
          />
          <EditProfileComponent
            text={award}
            placeholder={"Award"}
            title={"Award"}
            onTextChange={(award) => setAward(award)}
            style={{ width: "99%" }}
          />
          <EditProfileComponent
            text={interest}
            placeholder={"Interest"}
            title={"Interest"}
            onTextChange={(interest) => setInterest(interest)}
            style={{ width: "99%" }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Gender</Text>
          <View style={styles.row}>
            <RadioButton
              value="Male"
              status={gender === "Male" ? "checked" : "unchecked"}
              onPress={() => setGender("Male")}
            />
            <Text style={styles.textGender}>Male</Text>
            <RadioButton
              value="Female"
              status={gender === "Female" ? "checked" : "unchecked"}
              onPress={() => setGender("Female")}
            />
            <Text style={styles.textGender}>Female</Text>
          </View>
        </View>
        <EditProfileComponent
          text={address}
          placeholder={" Address"}
          title={"Address"}
          onTextChange={(address) => setAddress(address)}
          multiline={true}
          style={{ height: 300, width: "99%" }}
        />
        <EditProfileComponent
          text={phoneNumber}
          placeholder={" Phone Number"}
          title={"Phone Number"}
          onTextChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
          style={{ width: "99%" }}
        />
        <View style={styles.containerSmall}>
          <EditProfileComponent
            text={studentId}
            placeholder={" Roll Number"}
            title={"Roll Number"}
            onTextChange={(rollNumber) => setRollNumber(rollNumber)}
            style={{ width: "99%" }}
          />
          <EditProfileComponent
            text={memberCode}
            placeholder={" Member Code"}
            title={"Member Code"}
            onTextChange={(memberCode) => setMemberCode(memberCode)}
            style={{ width: "99%" }}
          />
        </View>
        <View style={styles.containerSmall}>
          <EditProfileComponent
            text={major}
            placeholder={" Major"}
            title={"Major"}
            onTextChange={(major) => setMajor(major)}
            style={{ width: "99%" }}
          />
          <EditProfileComponent
            text={currentTermNo}
            placeholder={" Current Term No"}
            title={"Current Term No"}
            onTextChange={(currentTermNo) => setCurrentTermNo(currentTermNo)}
            style={{ width: "99%" }}
          />
          <EditProfileComponent
            text={specialized}
            placeholder={" Specialized"}
            title={"Specialized"}
            onTextChange={(specialized) => setSpecialized(specialized)}
            style={{ width: "99%" }}
          />
        </View>
        <View style={styles.containerButton}>
          <Buttons
            style={styles.button}
            text={"Save"}
            onPressTo={updatedProfile}
          />
          <Buttons
            style={styles.button}
            text={"Cancel"}
            onPressTo={() => {
              navigation.goBack(null);
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flex: 1,
    marginBottom: 50,
  },
  containerProfile: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "white",
    paddingLeft: "5%",
  },
  userImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginRight: 100,
  },
  textName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  containerImage: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerSmall: {
    flexDirection: "column",
  },
  containerButton: {
    flexDirection: "row",
  },
  button: {
    width: 150,
    marginRight: 40,
  },
  row: {
    marginTop: 20,

    flexDirection: "row",
    alignItems: "center",
  },
  textGender: {
    marginRight: 40,
  },
});
export default EditProfile;
