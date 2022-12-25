import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import {ProgressBar} from 'react-native-paper';
import Buttons from "../../components/Buttons";
import ProjectNavigator from "../../navigations/ProjectNavigator";
import AsyncStorage from "@react-native-community/async-storage";
import {getIssueStatistics} from "../../networking/CustomNetworkService";
import UserInfoComponent from "../../components/UserInfoComponent";

const getProjectId = async () => {
    try {
        const projectId = await AsyncStorage.getItem("@projectId");
        console.log("projectId: " + projectId);
        return projectId;
    } catch (e) {
        console.log("Can't get projectId: " + e);
    }
};

function IssueStatistics({navigation}) {
    const [totalIssue, setTotalIssue] = useState();
    const [totalUnassigned, setTotalUnassigned] = useState();
    const [issueStatic, setIssueStatic] = useState();
    useEffect(() => {
        getProjectId().then(v => {
            getIssueStatistics(v).then((r) => {
                setTotalIssue(r.data.totalIssue);
                setTotalUnassigned(r.data.totalUnassigned);
                setIssueStatic(r.data.issueStatic);
            })
        })
    }, []);
    const calculatePercent = (count, totalIssue) => {
        const percent = count / totalIssue
        return percent.toFixed(2)
    }
    const Item = ({info, count, totalIssue}) => (
        <View style={{flexDirection: "row"}}>
            <View style={{width: "20%", margin: 10}}>
                <UserInfoComponent info={info}/>
            </View>
            <View style={{width: "5%", margin: 10, alignSelf: "center"}}>
                <Text>{count}</Text>
            </View>
            <View style={{width: "75%", margin: 10, alignSelf: "center"}}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: "85%", alignSelf: "center"}}>
                        <ProgressBar progress={calculatePercent(count, totalIssue)} color={'blue'}/>
                    </View>
                    <Text style={{alignSelf: "center"}}> {calculatePercent(count, totalIssue) * 100}%</Text>
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <ProjectNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 25, fontWeight: "bold", margin: 30}}> Project Dashboards</Text>
                    <View style={{flexDirection: "row", marginRight: 30}}>
                        <Buttons text={"Issue Statistics"} style={{width: "25%", height: 40, margin: 30}}
                                 onPressTo={() => navigation.push("IssueStatistics")}/>
                        <Buttons text={"Assigned to Me"} style={{width: "25%", height: 40, margin: 30}}
                                 onPressTo={() => navigation.push("AssignedToMe")}/>
                        <Buttons text={"Activity Streams"} style={{width: "25%", height: 40, margin: 30}}
                                 onPressTo={() => navigation.push("ActivityStreams")}/>
                    </View>

                </View>

                <View style={styles.content}>
                    <View style={{margin: 20}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", margin: 10}}>Issue Statistics: Project
                                (Assignee)</Text>
                            <Buttons text={"Refresh"} style={{height: 40, margin: 10}}/>
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
                        <View style={{flexDirection: "row"}}>
                            <View style={{width: "20%", margin: 10}}>
                                <Text>Unassigned</Text>
                            </View>
                            <View style={{width: "5%", margin: 10, alignSelf: "center"}}>
                                <Text>{totalUnassigned}</Text>
                            </View>
                            <View style={{width: "75%", margin: 10}}>
                                <View style={{flexDirection: "row"}}>
                                    <View style={{width: "85%", alignSelf: "center"}}>
                                        <ProgressBar progress={totalUnassigned / totalIssue} color={'blue'}/>
                                    </View>
                                    <Text
                                        style={{alignSelf: "center"}}> {calculatePercent(totalUnassigned, totalIssue) * 100}%</Text>
                                </View>
                            </View>
                        </View>
                        <FlatList
                            data={issueStatic}
                            renderItem={({item}) => (
                                <Item info={item.userInfo} count={item.numOfTask} totalIssue={totalIssue}/>)}
                        />
                        <View style={{flexDirection: "row", borderTopWidth: 2}}>
                            <View style={{width: "20%", margin: 10}}>
                                <Text>Total</Text>
                            </View>
                            <View style={{width: "5%", margin: 10}}>
                                <Text>{totalIssue}</Text>
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
        marginLeft: 30, marginRight: 30
    }
});
export default IssueStatistics;