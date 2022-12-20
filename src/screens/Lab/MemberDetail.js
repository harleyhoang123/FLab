import React,{useState} from "react";
import {
    SafeAreaView,
    View,
    Image,
    FlatList,
    StyleSheet,
    Text,
    Icon,
    StatusBar,
    Modal,
    Pressable,
    TextField,
} from "react-native";
import {SelectList} from "react-native-dropdown-select-list";
import LabNavigator from "../../navigations/LabNavigator";
import {
    updateMemberRoleById,
    removeMemberFromLaboratory,
} from "../../actions/LaboratoryAction";
import Buttons from "../../components/Buttons";
import AsyncStorage from "@react-native-community/async-storage";
import {useDispatch} from "react-redux";

const getLabId = async () => {
    try {
        const labId = await AsyncStorage.getItem("@currentLabId");
        console.log("LabId in reate Project: " + labId);
        return labId;
    } catch (e) {
        console.log("Can't get LabId id: " + e);
    }
};

export default function MemberDetail({route, navigation}) {
    const data = route.params.data;
    const memberId = route.params.memberId;
    const labId = route.params.labId;
    const dispatch = useDispatch();
    console.log("data memberId: " + JSON.stringify(memberId));
    const [showConfirm, setShowConfirm] = useState(false);
    const removeMemberhandler = () => {
        dispatch(removeMemberFromLaboratory(labId, memberId, navigation));
    };
    return (
        <View>
            <LabNavigator navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.left}>
                    <View style={styles.ava}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
                            }}
                        />
                    </View>
                    <View style={styles.infoLeft}>
                        <Text style={styles.txtLeft}>FPT University</Text>
                        <Text style={styles.txtLeft}>Major: {data.major}</Text>
                        <Text style={styles.txtLeft}>Age: 28</Text>
                        <Text style={styles.txtLeft}>Sex: {data.gender}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <View style={styles.content}>
                        <View style={styles.contact}>
                            <Text style={styles.memberName}>
                                {data.lastModifiedBy.userInfo.username}
                            </Text>
                            <Text style={styles.address}>
                                {data.address} - {data.lastModifiedBy.userInfo.email}
                            </Text>
                            <Text style={[styles.description]}>{data.description}</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.subTitle}>Interests</Text>
                            <Text style={styles.description}>{data.interest}</Text>
                            <Text style={styles.subTitle}>Certification & Awards</Text>
                            <Text style={styles.description}>{data.award}</Text>
                        </View>
                        <View style={{flexDirection: "row", marginLeft: 60}}>
                            <Buttons
                                text={"Back"}
                                style={styles.button}
                                onPressTo={() => {
                                    navigation.goBack(null);
                                }}
                            />
                            <Buttons
                                text={"Remove"}
                                style={styles.button}
                                onPressTo={() => setShowConfirm(true)}
                            />
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={showConfirm}
                                onRequestClose={() => {
                                    setShowConfirm(false);
                                }}>
                                <View style={styles.modalDelete}>
                                    <View style={styles.modalDeleteView}>
                                        <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 20}}>Do you want
                                            to remove this member?</Text>
                                        <View style={{alignItems: "flex-end", flexDirection: "row"}}>
                                            <Buttons text={"Remove"} style={{marginRight: 40}} onPressTo={() => {
                                                removeMemberhandler()
                                                setShowConfirm(false)
                                            }}/>
                                            <Buttons text={"Cancel"} style={{backgroundColor: '#F4F5F7'}}
                                                     styleText={{color: 'black'}}
                                                     onPressTo={() => setShowConfirm(false)}/>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Buttons
                                text={"Update Role"}
                                style={styles.button}
                                onPressTo={() => {
                                    navigation.navigate("UpdateMemberRole", {memberid: memberId});
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        width: 130,
        marginLeft: 10,
    },
    subTitle: {
        fontSize: 40,
        fontWeight: 400,
    },
    detail: {
        marginTop: 10,
        marginLeft: 60,
    },
    strenght: {
        fontSize: 24,
    },
    container: {
        flexDirection: "row",
    },
    left: {
        width: "20%",
        height: "100vh",
        backgroundColor: "#bd5d38",
        justifyContent: "center",
        alignItems: "center",
    },
    memberName: {
        fontSize: 96,
        fontWeight: 700,
        color: "#bd5d38",
    },
    address: {
        fontWeight: 24,
        fontSize: 24,
        marginBottom: 48,
    },
    txtLeft: {
        fontSize: 25,
        color: "white",
        marginBottom: 10,
        fontWeight: 600,
    },
    ava: {
        marginBottom: 20,
    },
    content: {
        width: "90%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    contact: {
        margin: 60,
    },
    right: {
        width: "80%",
        height: "100vh",
    },
    tinyLogo: {
        width: 160,
        height: 160,
        borderRadius: "50%",
        borderWidth: "0.5rem",
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    description: {
        color: "#343a40",
        fontWeight: 24,
        fontSize: 18.4,
        marginBottom: 48,
        fontWeight: 400,
        marginBottom: 30,
    },
    modalDelete: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    modalDeleteView: {
        width: "30%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        padding: 50,
    },
});

const data = {
    lastModifiedBy: {
        accountId: "6388f5e3c3f22c64f52af24f",
        userInfo: {
            username: "non_delete",
            email: "non-delete6@gmail.com",
            fullName: "Not Delete This Account",
            avatar:
                "https://flab-account-bucket.s3.eu-central-1.amazonaws.com/e527315f-f766-47cb-8bbf-cc5352143ebe",
            roles: ["USER"],
        },
    },
    experience: "5 year of coding",
    strenght: "Confidence",
    weekness: "ngu",
    certificate: "Learning how to learn",
    description: "Giang hồ hiểm ác anh không sợ chỉ sợ đường về thiếu bóng em",
    lastModifiedDate: "2022-12-03T22:32:57.358",
    profileId: "6388f5e3c3f22c64f52af24f",
    gender: "Male",
    dateOfBirth: "2000-04-15",
    address: "Ha Tinh",
    phoneNumber: "0943291358",
    studentId: "HE140108",
    studentCode: "DucVAHE140108",
    major: "SE",
    currentTermNo: 9,
    specialized: "abc",
    avatar: null,
};
