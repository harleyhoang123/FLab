import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

function Lab(props) {
    const [value, setValue] = useState('Highest score (default)');
    const data=[
        {label: 'Highest score (default)', value: 'Highest score (default)'},
        {label: 'Trending (recent votes count more)', value: 'Trending (recent votes count more)'},
        {label: 'Date modified (newest first)', value: 'Date modified (newest first)'},
        {label: 'Date created (oldest first)', value: 'Date created (oldest first)'},
    ]
    return (
        <View>
            <Dropdown
                style={styles.dropdown}
                value={value}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"

                onChange={item => {
                    setValue(item.value)
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    dropdown: {
        width:300,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});
export default Lab;