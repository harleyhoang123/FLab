import React from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import { ProgressBar } from 'react-native-paper';
import Buttons from "../../components/Buttons";
import ProjectNavigator from "../../navigations/ProjectNavigator";

const listData = [
    {
        name: "Unassigned",
        count: "23",
        percentage: "79"
    },
    {
        name: "Hoang Lam",
        count: "2",
        percentage: "7"
    },
    {
        name: "Nguyen Cong Dung",
        count: "2",
        percentage: "7"
    },
    {
        name: "Son Hoang Hai",
        count: "1",
        percentage: "3"
    },
    {
        name: "Nguyen Cong Son",
        count: "1",
        percentage: "3"
    },
]

function IssueStatistics({navigation}) {
    const Item = ({name, count, percentage}) => (
        <View style={{flexDirection: "row"}}>
            <View style={{width: "20%", margin: 10}}>
                <Text>{name}</Text>
            </View>
            <View style={{width: "5%", margin: 10}}>
                <Text>{count}</Text>
            </View>
            <View style={{width: "75%", margin: 10}}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: "85%",alignSelf:"center"}}>
                        <ProgressBar progress={percentage/100} color={'blue'}/>
                    </View>
                    <Text> {percentage}%</Text>
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <ProjectNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                    <Text style={{fontSize: 25, fontWeight: "bold", margin: 30}}> Project Dashboards</Text>
                    <View style={{flexDirection: "row", marginRight: 30}}>
                        <Buttons text={"Issue Statistics"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("IssueStatistics")} />
                        <Buttons text={"Assigned to Me"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("AssignedToMe")}/>
                        <Buttons text={"Activity Streams"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("ActivityStreams")}/>
                    </View>

                </View>

                <View style={styles.content}>
                    <View style={{margin:20}}>
                        <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", margin: 10}}>Issue Statistics: Project
                                (Assignee)</Text>
                            <Buttons text={"Refresh"} style={{width: "5%", height:40, margin:10}}/>
                        </View>
                        <View style={{flexDirection: "row", borderBottomWidth: 2}}>
                            <View style={{width: "20%", margin: 10}}>
                                <Text>Assignee</Text>
                            </View>
                            <View style={{width: "5%", margin: 10}}>
                                <Text>Count</Text>
                            </View>
                            <View style={{width: "75%", margin: 10}}>
                                <Text>Percentage</Text>
                            </View>
                        </View>
                        <FlatList
                            data={listData}
                            renderItem={({item}) => (
                                <Item count={item.count} name={item.name} percentage={item.percentage}/>)}
                        />
                        <View style={{flexDirection: "row"}}>
                            <View style={{width: "20%", margin: 10}}>
                                <Text>Total</Text>
                            </View>
                            <View style={{width: "5%", margin: 10}}>
                                <Text>29</Text>
                            </View>
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
export default IssueStatistics;