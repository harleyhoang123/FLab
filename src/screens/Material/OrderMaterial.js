import {View, Text, StyleSheet, FlatList} from "react-native";
import AddComponent from "../../components/AddComponent";
import Buttons from "../../components/Buttons";
import React, {useEffect, useState} from "react";
import LabNavigator from "../../navigations/LabNavigator";
import PaginationBar from "../../components/PaginationBar";
import {Dropdown} from "react-native-element-dropdown";
import OrderItem from "../../components/OrderItem";
import AsyncStorage from "@react-native-community/async-storage";
import {getListOrderByLabId} from "../../networking/CustomNetworkService";
const getLabId = async () => {
    try {
        const labId = await AsyncStorage.getItem("@labId");
        console.log("labId: " + labId);
        return labId;
    } catch (e) {
        console.log("Can't get labId: " + e);
    }
};
function OrderMaterial({navigation}) {
    const [value, setValue] = useState('WAITING_FOR_APPROVAL');
    const [listOrder, setListOrder] = useState();
    const [listItem, setListItem] = useState();
    const [labId, setLabId] = useState();
    const callBackOrder=()=>{
        getListOrderByLabId(labId).then(r=>{setListItem(r.data.items); filterStatus(r.data.items,value)})
    }
    useEffect(() => {
        getLabId().then(v=>{{setLabId(v);getListOrderByLabId(v).then(r=>{setListItem(r.data.items); filterStatus(r.data.items,value)})}});
    },[]);
    function filterStatus(list,value) {
        if (list!=null){
            const filData = list.filter(function (item) {
                return item.status === value;
            })
            setListOrder(filData);
        }

    }
    const data = [
        {label: 'Waiting for approval', value: 'WAITING_FOR_APPROVAL'},
        {label: 'Approved', value: 'APPROVED'},
        {label: 'Rejected', value: 'REJECTED'},
    ]
    return (
        <View>
            <LabNavigator navigation={navigation}/>
            <View style={styles.container}>
                <Dropdown
                    style={styles.dropdown}
                    value={value}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    onChange={item => {
                        setValue(item.value)
                        filterStatus(listItem,item.value)
                    }}
                />
                <View style={styles.containerSearch}>
                    <Buttons
                        text={"Back"}
                        style={[styles.button, {marginLeft: 20}]}
                        onPressTo={() => navigation.goBack()}
                    />
                </View>
            </View>
            <FlatList
                data={listOrder}
                numColumns={5}
                renderItem={({item}) => (
                <OrderItem
                    orderId={item.orderId}
                    materialName={item.materialName}
                    borrowBy={item.borrowBy}
                    amount={item.amount}
                    reason={item.reason}
                    fromDate={item.fromDate}
                    callBackOrder={callBackOrder}
                />)}
            />
            <PaginationBar/>
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
    dropdown: {
        marginTop: 30,
        marginLeft: 100,
        width: "25%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});
export default OrderMaterial;