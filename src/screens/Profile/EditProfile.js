import React, {useState} from 'react';
import {Image, StyleSheet} from "react-native";
import {Text, TouchableOpacity, View} from "react-native-web";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import EditProfileComponent from "../../components/EditProfileComponent";
import Buttons from "../../components/Buttons";

function EditProfile({navigation}) {
    const name=" Nguyen Cong Son"
    const [fullName, setFullName] = useState(name);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [memberCode, setMemberCode] = useState('');
    const [major, setMajor] = useState('');
    const [currentTermNo, setCurrentTermNo] = useState('');
    const [specialized, setSpecialized] = useState('');
    return (
        <View style={styles.container}>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.containerProfile}>
                <View style={styles.containerImage}>
                    <Text style={styles.textName}>Edit Profile</Text>
                    <TouchableOpacity>
                        <Image
                            style={styles.userImage}
                            source={{
                                uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
                            }}/>
                    </TouchableOpacity>
                </View>
                <EditProfileComponent text={fullName} placeholder={" Full Name"} title={"Full Name"} onTextChange={ fullName => setFullName(fullName)}/>
                <View style={styles.containerSmall}>
                    <EditProfileComponent text={dateOfBirth} placeholder={" Date Of Birth"} title={"Date Of Birth"} onTextChange={ dateOfBirth => setDateOfBirth(dateOfBirth)} style={{width:200}}/>
                    <EditProfileComponent text={gender} placeholder={" Gender"} title={"Gender"} onTextChange={ gender => setGender(gender)} style={{width:200}}/>
                </View>

                <EditProfileComponent text={address} placeholder={" Address"} title={"Address"} onTextChange={ address => setAddress(address)} multiline={true} style={{height:200}}/>
                <EditProfileComponent text={phoneNumber} placeholder={" Phone Number"} title={"PhoneNumber"} onTextChange={ phoneNumber => setPhoneNumber(phoneNumber)}/>
                <EditProfileComponent text={email} placeholder={" Email"} title={"Email"} onTextChange={ email => setEmail(email)}/>
                <EditProfileComponent text={personalEmail} placeholder={" Personal Email"} title={"Personal Email"} onTextChange={ personalEmail => setPersonalEmail(personalEmail)}/>
                <View style={styles.containerSmall}>
                    <EditProfileComponent text={rollNumber} placeholder={" Roll Number"} title={"Roll Number"} onTextChange={ rollNumber => setRollNumber(rollNumber)} style={{width:200}}/>
                    <EditProfileComponent text={memberCode} placeholder={" Member Code"} title={"Member Code"} onTextChange={ memberCode => setMemberCode(memberCode)} style={{width:200}}/>
                </View>
                <View style={styles.containerSmall}>
                    <EditProfileComponent text={major} placeholder={" Major"} title={"Major"} onTextChange={ major => setMajor(major)} style={{width:150}}/>
                    <EditProfileComponent text={currentTermNo} placeholder={" Current Term No"} title={"Current Term No"} onTextChange={ currentTermNo => setCurrentTermNo(currentTermNo)} style={{width:150}}/>
                    <EditProfileComponent text={specialized} placeholder={" Specialized"} title={"Specialized"} onTextChange={ specialized => setSpecialized(specialized)} style={{width:150}}/>
                </View>
                <View style={styles.containerButton}>
                    <Buttons style={styles.button} text={"Save"} onPressTo={() => {navigation.push("Profile")}}/>
                    <Buttons style={styles.button} text={"Cancel"} onPressTo={() => {navigation.push("Profile")}}/>
                </View>
            </View>
        </View>
    );
}
const  styles = StyleSheet.create({
    container:{
        alignContent:"center",
        flex:1,
        marginBottom:50,
    },
    containerProfile:{
        flex:1,
        alignSelf:"center",
        width:"60%",
        backgroundColor:'white',
        paddingLeft:150,
        paddingRight:150,
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
    containerImage:{
        marginTop:30,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    containerSmall:{
        flexDirection:"row",
    },
    containerButton:{
        flexDirection:"row",
    },
    button:{
        width:150,
        marginRight:40,
    },
});
export default EditProfile;