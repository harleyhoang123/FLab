import React, {useState} from 'react';
import {Text, TextInput, SafeAreaView, StyleSheet, Button} from 'react-native'
import { useDispatch } from "react-redux";
import { createLaboratory } from "../../actions/LaboratoryAction";

function CreateLaboratory({navigation}) {
    const dispatch = useDispatch();
    const [labName, setLabName] = useState("");
    const [description, setDescription] = useState("");
    const [major, setMajor] = useState("");

    const createLaboratoryHandle = () => {
        const requestData = {
            labName: labName,
            description: description,
            major: major
        }
        dispatch(createLaboratory(requestData, navigation));
    }

    return (
        <SafeAreaView>
            <Text>Lab Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLabName((text)) }
            />
            <Text>Description</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setDescription((text))}
            />
            <Text>Major</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setMajor((text))}
            />
            <Button title={"Call API"} onPress={createLaboratoryHandle}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default CreateLaboratory;
