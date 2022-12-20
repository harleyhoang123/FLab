import React from 'react';
import {Text} from "react-native";

function ErrorText({message}) {
    return (
        <Text style={{color:'red', marginLeft:20}}>{message}</Text>
    );
}

export default ErrorText;