import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {ProgressBar} from "react-native-paper";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import Buttons from "../../components/Buttons";
import ProjectNavigator from "../../navigations/ProjectNavigator";


const listData = [
    {
        summary: "Summary of features in existing laboratory management system",
        estimate: "8",
        assignedTime: "1-1-2022",
        reporter:"Hoang Van Lam"
    },
    {
        summary: "Identify and refine essential features",
        estimate: "8",
        assignedTime: "1-1-2022",
        reporter:"Vo Anh Duc"
    },
    {
        summary: "Talk directly with the teachers who manage the Lab",
        estimate: "8",
        assignedTime: "1-1-2022",
        reporter:"Bui Thanh Phong "
    },
    {
        summary: "Summary of features that will develop",
        estimate: "8",
        assignedTime: "1-1-2022",
        reporter:"Hoang Hai Son"
    },
    {
        summary: "Business Requirement Document",
        estimate: "8",
        assignedTime: "1-1-2022",
        reporter:"Nguyen Cong Son "
    },
]
function AssignedToMe({navigation}) {
    const Item = ({summary, estimate,assignedTime, reporter}) => (
        <View style={{flexDirection: "row"}}>
            <View style={{width: "50%", margin: 10}}>
                <Text>{summary}</Text>
            </View>
            <View style={{width: "5%", margin: 10}}>
                <Text>{estimate}</Text>
            </View>
            <View style={{width: "10%", margin: 10}}>
                <Text>{assignedTime}</Text>
            </View>
            <View style={{width: "35%", margin: 10}}>
                <Text>{reporter}</Text>
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
                        <Buttons text={"Issue Statistics"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("IssueStatistics")}/>
                        <Buttons text={"Assigned to Me"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("AssignedToMe")}/>
                        <Buttons text={"Activity Streams"} style={{width: "25%", height:40, margin:30}} onPressTo={()=> navigation.push("ActivityStreams")}/>
                    </View>

                </View>

                <View style={styles.content}>
                    <View style={{margin:20}}>
                        <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", margin: 10}}>Assigned to Me</Text>
                            <Buttons text={"Refresh"} style={{width: "5%", height:40, margin:10}}/>
                        </View>
                        <View style={{flexDirection: "row", borderBottomWidth: 2}}>
                            <View style={{width: "50%", margin: 10}}>
                                <Text>Task</Text>
                            </View>
                            <View style={{width: "5%", margin: 10}}>
                                <Text>Estimate</Text>
                            </View>
                            <View style={{width: "10%", margin: 10}}>
                                <Text>Assigned Time</Text>
                            </View>
                            <View style={{width: "35%", margin: 10}}>
                                <Text>Reporter</Text>
                            </View>
                        </View>
                        <FlatList
                            data={listData}
                            renderItem={({item}) => (
                                <Item summary={item.summary} estimate={item.estimate} assignedTime={item.assignedTime} reporter={item.reporter}/>)}
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
export default AssignedToMe;