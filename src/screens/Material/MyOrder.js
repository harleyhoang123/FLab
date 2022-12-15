import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import TextField from "../../components/TextField";
import Buttons from "../../components/Buttons";
import MaterialItem from "../../components/MaterialItem";
import PaginationBar from "../../components/PaginationBar";
import Separator from "../../components/Separator";
import AsyncStorage from "@react-native-community/async-storage";
import {getListOrderByAccountId, getListOrderByLabId, returnOrder} from "../../networking/CustomNetworkService";

const getLabId = async () => {
    try {
        const labId = await AsyncStorage.getItem("@labId");
        console.log("labId: " + labId);
        return labId;
    } catch (e) {
        console.log("Can't get labId: " + e);
    }
};
const getAccountId = async () => {
    try {
        const accountId = await AsyncStorage.getItem("@accountId");
        console.log("AccountId: " + accountId);
        return accountId;
    } catch (e) {
        console.log("Can't get account id: " + e);
    }
};
function MyOrder({navigation}) {
    const [text, setText] = useState("");
    const [list, setList] = useState();
    const [labId, setLabId] = useState("");
    const [accountId, setAccountId] = useState("");
    const formatterDate=(date)=>{
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const d= new Date(date);
        return d.toLocaleDateString("en-US", options) +", "+ d.toTimeString().split("G")[0];
    }
    useEffect(() => {
        getLabId().then(v=>{{setLabId(v);getAccountId().then(r=> {setAccountId(r); getListOrderByAccountId(v,r).then(a=>setList(a.data.items))})}});
    },[]);

    const returnOrderItem=(orderId)=>{
        returnOrder(orderId).then(v=>getListOrderByAccountId(labId,accountId).then(a=>setList(a.data.items)))
    }
    const ItemOrder=({orderId,materialId,materialName,status,images,orderFromDate,orderToDate})=>(
        <View style={[styles.container1]}>
                <View style={styles.containerContent}>
                    <View style={styles.containerLogo}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri:images,
                            }}
                        />
                    </View>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{materialName}</Text>
                        <Text style={styles.textInfo}>Status: {status}</Text>
                        <Text style={styles.textInfo}>From: {formatterDate(orderFromDate)} To: {formatterDate(orderToDate)}</Text>
                    </View>
                    <Buttons text={"Return"} onPressTo={()=> returnOrderItem(orderId)}/>
                </View>
            <Separator />
        </View>
    )
    return (
        <View>
            <LabNavigator navigation={navigation} />
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>List Ordered</Text>
                </View>
                <View style={styles.containerSearch}>
                    <TextField
                        text={text}
                        onChangeText={(newText) => setText(newText)}
                        placeholder={" Search"}
                        secureTextEntry={false}
                        multiline={false}
                    />
                    <Buttons text={"Search"} />
                </View>
            </View>
            {list?.map((item)=>(
                <ItemOrder
                    key={item.orderId}
                    orderId={item.orderId}
                    materialId={item.materialId}
                    materialName={item.materialName}
                    images={item.images.url}
                    status={item.status}
                    orderFromDate={item.orderFromDate}
                    orderToDate={item.orderToDate}
                />
            ))}
            <PaginationBar />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerSearch: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 100,
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 150,
        marginTop: 10,
        marginBottom: 20,
    },
    containerButton: {
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 180,
    },
    container1: {
        marginLeft: 100,
        marginRight: 100,
        flex: 1,
    },
    containerContent: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        flex: 1,
    },
    containerLogo: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTitle: {
        flex: 0.9,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    textInfo: {
        fontSize: 16,
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
});
export default MyOrder;