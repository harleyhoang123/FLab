import { View, Text, StyleSheet, Image } from "react-native";
import Buttons from "../../components/Buttons";
import React, { useState } from "react";
import TextField from "../../components/TextField";
import { DateTimePicker } from "@hashiprobr/react-native-paper-datetimepicker";
import LabNavigator from "../../navigations/LabNavigator";
import { orderMaterial } from "../../actions/LaboratoryAction";
import { useDispatch } from "react-redux";
import { faL } from "@fortawesome/free-solid-svg-icons";

function RequestMaterial({ route, navigation }) {
  const data = route.params.data;
  const labId = route.params.labId;
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const isNumber = new RegExp("^\\d+$");
  let isValid = true;
  const [isAmount, setIsAmount] = useState(false);
  const [isReason, setIsReason] = useState(false);
  const [isDate, setisDate] = useState(false);
  const dispatch = useDispatch();

  function validateData() {
    if (!amount.match(isNumber)) {
      setIsAmount(true);
      isValid = false;
    } else {
      setIsAmount(false);
    }
    if (
      new Date(dateTimeFormatter(startDate, startTime)) >
      new Date(dateTimeFormatter(endDate, endTime))
    ) {
      setisDate(true);
      isValid = false;
    } else {
      setisDate(false);
    }
    if (!reason) {
      setIsReason(true);
      isValid = false;
    } else {
      setIsReason(false);
    }
    if (isValid) {
      orderAMaterial(
        labId,
        data.materialId,
        amount,
        reason,
        dateTimeFormatter(startDate, startTime),
        dateTimeFormatter(endDate, endTime),
        navigation
      );
    }
  }

  const orderAMaterial = (
    labId,
    materialId,
    amount,
    reason,
    orderFrom,
    orderTo,
    navigation
  ) => {
    dispatch(
      orderMaterial(
        labId,
        materialId,
        amount,
        reason,
        orderFrom,
        orderTo,
        navigation
      )
    );
  };
  const dateTimeFormatter = (date, time) => {
    const formattedDate = new Date(date);
    let day = formattedDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = formattedDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    const formattedTime = new Date(time);
    let hour = formattedTime.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    let minute = formattedTime.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    let second = formattedTime.getSeconds();
    if (second < 10) {
      second = "0" + second;
    }
    return (
      formattedDate.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hour +
      ":" +
      minute +
      ":" +
      second
    );
  };

  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View style={styles.containerContent}>
        <Text style={styles.name}>{data.materialName}</Text>
        <Text style={styles.text}>Amount</Text>
        <TextField
          text={amount}
          onChangeText={(amount) => setAmount(amount)}
          style={{ with: "40%" }}
        ></TextField>
        {isAmount && <Text style={styles.inputInvalid}>Invalid amount</Text>}
        <Text style={styles.text}>From</Text>
        <View style={styles.time}>
          <DateTimePicker
            style={{ width: 200, marginRight: 30, height: 50 }}
            type="date"
            value={startDate}
            onChangeDate={(startDate) => setStartDate(startDate)}
          />
          <DateTimePicker
            style={{ width: 200, height: 50 }}
            type="time"
            value={startTime}
            onChangeDate={(startTime) => setStartTime(startTime)}
          />
        </View>
        {isDate && <Text style={styles.inputInvalid}>Invalid start date</Text>}
        <Text style={styles.text}>To</Text>
        <View style={styles.time}>
          <DateTimePicker
            style={{ width: 200, marginRight: 30, height: 50 }}
            type="date"
            value={endDate}
            onChangeDate={(endDate) => setEndDate(endDate)}
          />
          <DateTimePicker
            style={{ width: 200, height: 50 }}
            type="time"
            value={endTime}
            onChangeDate={(endTime) => setEndTime(endTime)}
          />
        </View>
        {isDate && <Text style={styles.inputInvalid}>Invalid end date</Text>}
        <Text style={styles.text}>Reason:</Text>
        <TextField
          text={reason}
          onChangeText={(reason) => setReason(reason)}
          multiline={true}
          style={{ with: "40%", height: 200 }}
        ></TextField>
        {isReason && <Text style={styles.inputInvalid}>Invalid reason</Text>}
        <View style={styles.time}>
          <Buttons
            text={"Request"}
            style={styles.button}
            onPressTo={validateData}
          />
          <Buttons
            text={"Cancel"}
            style={styles.button}
            onPressTo={() => {
              navigation.goBack(navigation);
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    backgroundColor: "white",
    width: "70%",
    alignSelf: "center",
    padding: 50,
  },
  name: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
  },
  inputInvalid: {
    marginLeft: 55,
    color: "red",
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: 130,
    marginRight: 40,
  },
  time: {
    marginTop: 10,
    flexDirection: "row",
  },
});
export default RequestMaterial;
