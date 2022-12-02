import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from "react-native";
import AvatarComponent from "../../components/AvatarComponent";

function MemberProfile(route, navigation) {

    const [projectId, setProjectId] = useState();
    const [labId, setLabId] = useState();

    const downloadCV = () => {

    }

    const changeRoleMemberInProject = () => {

    }

    const changeRoleMemberInLaboratory = () => {

    }

    const fakeAvatarURL = 'data:image/jpeg;base64,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'

    const avatarStyle = StyleSheet.create({
        avatar: {
            borderRadius: 15,
            marginRight: 10,
            width: 100,
            height: 100
        },
    })
    const memberInfoFake = {
        profileId: "profileId",
        fullName: "Hoang Van Lam",
        role: "ADMIN",
        gender: "gender",
        dateOfBirth: "dateOfBirth",
        address: "address",
        phoneNumber: "phoneNumber",
        studentId: "studentId",
        studentCode: "studentCode",
        major: "major",
        currentTermNo: "currentTermNo",
        specialized: "specialized",
        avatar: fakeAvatarURL,
        cv: [
            {
                cvId: "CV ID 1",
                cvName: "CV Name 1",
                cvTitle: "CV Title 1"
            },
            {
                cvId: "CV ID 2",
                cvName: "CV Name 2",
                cvTitle: "CV Title 2"
            },
            {
                cvId: "CV ID 3",
                cvName: "CV Name 3",
                cvTitle: "CV Title 3"
            }
        ],

    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.avatarContainer}>
                    <AvatarComponent styles={avatarStyle} avatarURL={memberInfoFake.avatar}/>
                    <Text>{memberInfoFake.fullName}</Text>
                </View>
                <View style={styles.inLine}>
                    <View style={styles.inLine}>
                        <Text>Role:</Text>
                        <Text>{memberInfoFake.role}</Text>
                    </View>
                </View>
                <View style={styles.inLine}>
                    <View style={styles.inLine}>
                        <Text>Role:</Text>
                        <Text>{memberInfoFake.dateOfBirth}</Text>
                    </View>
                    <View style={styles.inLine}>
                        <Text>Gender</Text>
                        <Text>{memberInfoFake.gender}</Text>
                    </View>
                </View>
                <View style={styles.inLine}>
                    <View style={styles.inLine}>
                        <Text>Role:</Text>
                        <Text>{memberInfoFake.phoneNumber}</Text>
                    </View>
                    <View style={styles.inLine}>
                        <Text>Gender</Text>
                        <Text>{memberInfoFake.address}</Text>
                    </View>
                </View>
                <View style={styles.inLine}>
                    <View style={styles.inLine}>
                        <Text>Role:</Text>
                        <Text>{memberInfoFake.studentId}</Text>
                    </View>
                    <View style={styles.inLine}>
                        <Text>Gender</Text>
                        <Text>{memberInfoFake.studentCode}</Text>
                    </View>
                </View>
                <View style={styles.inLine}>
                    <View style={styles.inLine}>
                        <Text>Role:</Text>
                        <Text>{memberInfoFake.major}</Text>
                    </View>
                    <View style={styles.inLine}>
                        <Text>Gender</Text>
                        <Text>{memberInfoFake.currentTermNo}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%"
    },
    form:{
        height: "100%",
        width: "80%",
        alignItems: 'center'
    },
    inLine:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    toRight: {
        flexDirection: "row-reverse"
    },
    avatarContainer: {
        flexDirection: "row",
        height: "20%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MemberProfile;
