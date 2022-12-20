import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import Buttons from "../../components/Buttons";
import ProjectNavigator from "../../navigations/ProjectNavigator";

const listData = [
    {
        user: "Choi",
        time: "1-1-2022",
        action:"dm lam "
    },
    {
        user: "Choi",
        time: "1-1-2022",
        action:"dm lam "
    },
    {
        user: "Choi",
        time: "1-1-2022",
        action:"dm lam "
    },
    {
        user: "Choi",
        time: "1-1-2022",
        action:"dm lam "
    },
    {
        user: "Choi",
        time: "1-1-2022",
        action:"dm lam "
    },
]
function ActivityStreams({navigation}) {
    return (
        <View style={styles.container}>
            <ProjectNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                    <Text style={{fontSize: 25, fontWeight: "bold", margin: 30}}> Project Dashboards</Text>
                    <View style={{flexDirection: "row", marginRight: 30}}>
                        <Buttons text={"Issue Statistics"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("IssueStatistics")}/>
                        <Buttons text={"Assigned to Me"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("AssignedToMe")}/>
                        <Buttons text={"Activity Streams"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("ActivityStreams")}/>
                    </View>

                </View>

                <View style={styles.content}>
                    <View style={{margin:20}}>
                        <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", margin: 10}}>Activity Stream</Text>
                            <Buttons text={"Refresh"} style={{width: "5%", height:40, margin:10}}/>
                        </View>
                        <FlatList
                            data={listData}
                            renderItem={({item}) => (
                                <Text><Text>{item.user}</Text> {item.action} at {item.time}</Text>
                                )}
                        />
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
    containerContent: {
        flex: 1,
        alignSelf: "center",
        width: "80%",
        backgroundColor: "white",
    },
    content: {
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 30,marginRight: 30
    }
});
export default ActivityStreams;