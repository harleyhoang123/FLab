import React from "react";
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
import { SelectList } from "react-native-dropdown-select-list";
import LabNavigator from "../../navigations/LabNavigator";

export default function MemberDetail({ route, navigation }) {
  const data = route.params.data;
  console.log("data: " + JSON.stringify(data));
  return (
    <View>
      <LabNavigator navigation={navigation} />
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
              <Text style={[styles.description]}>
                I am experienced in leveraging agile frameworks to provide a
                robust synopsis for high level overviews. Iterative approaches
                to corporate strategy foster collaborative thinking to further
                the overall value proposition
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.subTitle}>Experience</Text>
              <Text style={styles.description}>
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs from DevOps. Nanotechnology immersion
                along the information highway will close the loop on focusing
                solely on the bottom line..
              </Text>
              <Text style={styles.subTitle}>Interests</Text>
              <Text style={styles.description}>
                Apart from being a web developer, I enjoy most of my time being
                outdoors. In the winter, I am an avid skier and novice ice
                climber. During the warmer months here in Colorado, I enjoy
                mountain biking, free climbing, and kayaking. When forced
                indoors, I follow a number of sci-fi and fantasy genre movies
                and television shows, I am an aspiring chef, and I spend a large
                amount of my free time exploring the latest technology
                advancements in the front-end web development world..
              </Text>
              <Text style={styles.subTitle}>Certification & Awards</Text>
              <Text style={styles.description}>
                1st PGC Pubg 2020 - 1st Major CSO Kantowice 2017
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
