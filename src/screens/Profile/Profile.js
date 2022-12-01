import React, {useState} from 'react';
import {StyleSheet, View, Image, Text} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import Buttons from "../../components/Buttons";
import ProfileComponent from "../../components/ProfileComponent";
import TextField from "../../components/TextField";
import {useDispatch} from "react-redux";
import {changePassword} from "../../actions/UserAction";
import AsyncStorage from "@react-native-community/async-storage";
const getAccountId = async () => {
    try {
        const accountId = await AsyncStorage.getItem('@accountId');
        console.log("AccountId: "+ accountId);
        return accountId;
    } catch(e) {
        console.log("Can't get account id: "+e);
    }
}
function Profile({navigation}) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [accountId, setAccountId] = useState("");
    getAccountId().then(accountId => setAccountId(accountId));
    const dispatch = useDispatch();
    const handleChangePassword = () => {
        console.log("Oll Password: "+ oldPassword)
        console.log("New Password: "+ newPassword)
        dispatch(changePassword(oldPassword, newPassword,accountId));
    }
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerProfile}>
                <View style={styles.containerName}>
                    <Image
                        style={styles.userImage}
                        source={{
                            uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
                        }}/>
                    <Text style={styles.textName}> Nguyen Cong Son</Text>
                </View>
                <View style={styles.containerInfo}>
                    <View style={styles.info}>
                        <ProfileComponent title={"Date of birth"} information={"08/09/2000"}/>
                        <ProfileComponent title={"Gender"} information={"Male"}/>
                    </View>
                    <ProfileComponent title={"Address"} information={"Phường Tiền Châu, Thành Phố Phúc Yên, Tỉnh Vĩnh Phúc"}/>
                    <ProfileComponent title={"Phone number"} information={"0387424978"}/>
                    <ProfileComponent title={"Email"} information={"SonNCHE140279@fpt.edu.vn"}/>
                    <ProfileComponent title={"Personal Email"} information={"ncson8920@gmail.com"}/>
                    <View style={styles.info}>
                        <ProfileComponent title={"Roll number"} information={"HE140279"}/>
                        <ProfileComponent title={"Member Code"} information={"SonNCHE140279"}/>
                    </View>
                    <View style={styles.info}>
                        <ProfileComponent title={"Major"} information={"BSE"}/>
                        <ProfileComponent title={"Current Term No"} information={"9"}/>
                        <ProfileComponent title={"Specialized"} information={"IS"}/>
                    </View>
                </View>
                <View style={styles.containerInfo}>
                    <Buttons style={styles.button} text={"Edit Profile"} onPressTo={() => {navigation.push("EditProfile")}}/>
                </View>
                <View style={styles.containerInfo}>
                    <Text style={styles.text}>Change PassWord</Text>
                    <TextField text={oldPassword} onChangeText={oldPassword=> setOldPassword(oldPassword)} placeholder={" Old Password"} secureTextEntry={true}/>
                    <TextField text={newPassword} onChangeText={newPassword=> setNewPassword(newPassword)} placeholder={" New Password"} secureTextEntry={true}/>
                    <TextField text={reNewPassword} onChangeText={reNewPassword=> setReNewPassword(reNewPassword)} placeholder={" Re-New Password"} secureTextEntry={true}/>
                    <Buttons style={styles.button} onPressTo={handleChangePassword} text={"Change Password"}/>
                </View>
                <View>
                    <View style={styles.containerInfo}>
                        <Text style={styles.text}>Verify Email</Text>
                        <TextField text={email} onChangeText={email=> setEmail(email)} placeholder={" Email"} secureTextEntry={false}/>
                        <Buttons style={styles.button} text={"Verify Email"}/>
                    </View>
                </View>
                <View>
                    <View style={styles.containerInfo}>
                        <Text style={styles.text}>Verify Phone Number</Text>
                        <TextField text={phoneNumber} onChangeText={phoneNumber=> setPhoneNumber(phoneNumber)} placeholder={" Phone Number"} secureTextEntry={false}/>
                        <Buttons style={styles.button} text={"Verify Phone Number"}/>
                    </View>
                </View>
            </View>
        </View>
    );
}
 const  styles = StyleSheet.create({
     container:{
         alignContent:"center",
         flex:1
     },
     containerProfile:{
         flex:1,
         alignSelf:"center",
         width:"60%",
         backgroundColor:'white',
     },
     containerName:{
         paddingLeft:150,
         margin:20,
         flexDirection:"row",
         justifyContent: "flex-start",
         alignItems: "flex-end",
     },
     containerInfo:{
         margin:20,
         paddingLeft:150,
         justifyContent: "flex-start",
         alignItems: "flex-start",
     },
     info:{
         flexDirection:"row",
     },
     userImage:{
         width: 180,
         height:180,
         borderRadius:90,
         marginRight:50,
     },
     textName:{
         fontSize:30,
         fontWeight:"bold",
     },
     text:{
         fontSize:20,
         fontWeight:"bold",
     },
     button:{
         width:250,
         marginLeft:15,
     },
 });
export default Profile;