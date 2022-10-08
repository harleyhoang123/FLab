import React from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {TextField} from "../../components/TextField";
import { useDispatch } from 'react-redux'

function Login(props) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () =>{
        dispatch(login(username, password))
    }
    return (
        <View>
            <Text>This is login page</Text>

            <View>
                <Text>Username</Text>
                <TextField placeholder={"Enter user name"} onChangeText={setUsername}/>
                <Text>Password</Text>
                <TextField placeholder={"Enter password"} onChangeText={setPassword}/>
                <Button title={"Login"} onPress={handleSubmit}/>
            </View>
        </View>
    );
}

export default Login;