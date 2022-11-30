import {View, Text, StyleSheet, Image} from "react-native";
import Buttons from "../../components/Buttons";
import React,{useState} from "react";
import TextField from "../../components/TextField";
import { DateTimePicker } from '@hashiprobr/react-native-paper-datetimepicker';
import LabNavigator from "../../navigations/LabNavigator";

function RequestMaterial({navigation}) {
    const [amount, setAmount] = useState("");

    const [reason, setReason] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    return (
        <View style={styles.container}>
            <LabNavigator navigation={navigation}/>
            <View style={styles.containerContent}>
                <View style={styles.containerImage}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
                        }}/>
                </View>
                <View style={styles.containerInfo}>
                    <Text style={styles.name}>PC1</Text>
                    <Text style={styles.text}>Amount</Text>
                    <TextField text={amount} onChangeText={amount => setAmount(amount)} ></TextField>
                    <Text style={styles.text}>From</Text>
                    <View style={styles.time}>
                        <DateTimePicker
                            style={{width:200, marginRight:30}}
                            type="date"
                            value={startDate}
                            onChangeDate={startDate => setStartDate(startDate)}
                        />
                        <DateTimePicker
                            style={{width:200}}
                            type="time"
                            value={startTime}
                            onChangeDate={ startTime => setStartTime(startTime)}
                        />
                    </View>
                    <Text style={styles.text}>To</Text>
                    <View style={styles.time}>
                        <DateTimePicker
                            style={{width:200, marginRight:30}}
                            type="date"
                            value={endDate}
                            onChangeDate={endDate => setEndDate(endDate)}
                        />
                        <DateTimePicker
                            style={{width:200}}
                            type="time"
                            value={endTime}
                            onChangeDate={endTime => setEndTime(endTime)}
                        />
                    </View>
                    <Text style={styles.text}>Reason:</Text>
                    <TextField text={reason} onChangeText={reason => setReason(reason)} multiline={true} style={{height: 200}}></TextField>
                    <Buttons text={"Request"} style={styles.button} onPressTo={()=> {navigation.push("Ticket")}}/>

                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerContent:{
        backgroundColor:'white',
        width:"60%",
        alignSelf:"center",
        marginTop:20,
        flexDirection:"row",
    },
    name:{
        marginTop:30,
        fontSize:25,
        fontWeight:"bold",
    },
    text:{
        fontSize:20,
        marginTop:50,
    },
    containerImage:{
        flex:0.5,
        justifyContent:"center",
        alignItems:"center",
    },
    containerInfo:{
        flex:0.5,
    },
    button:{
        marginTop:50,
        width:130,
    },
    image:{
        width:500,
        height:500,
    },
    time:{
        marginTop:10,
        flexDirection:"row",
    }
});
export default RequestMaterial;