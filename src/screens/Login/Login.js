import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import React ,{ useState } from 'react';
import {useDispatch} from "react-redux";
import {login} from "../../actions/UserAction";


export default function Login({navigation}) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        dispatch(login(username, password));
    };
  return (
    <View style={styles.container}>
        <View style={styles.left}>
        </View>

        <View style={styles.right}>

        <Text style={styles.login}>Login</Text>


        <TextInput style = {styles.textinput} placeholder='Email or Phone Number'
        onChangeText={newText => setUsername(newText)}
        defaultValue={username}/>
        <TextInput placeholder='Password'
        style={styles.textinput}
        onChangeText={newText => setPassword(newText)}
        defaultValue={password}
        secureTextEntry
      />

      <View style ={styles.forgotpw} >
      <View >
      <TouchableOpacity>
        <Text style= {styles.txt}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      </View>
      <TouchableOpacity style= {styles.button} onPress={handleSubmit} >
            <Text style= {styles.text} >Log in</Text>
      </TouchableOpacity>
      <View style={styles.register}>
      <Text >Don't have a account?</Text>
      <TouchableOpacity >
      <Text style={styles.txt}>Register Now</Text>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
flexDirection:'row',
    },
    left:{
        flex:0.5,
    },
    right:{
        flex:0.5,
    },
  login: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft:40,
  },
  textinput:{
    height: 50,
    width: 500,
    backgroundColor:'white',
    borderBottomWidth: 1,
    margin: 15
  },
  forgotpw: {
    flexDirection : 'row',
    paddingBottom:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  register: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  txt:{
    fontWeight: "bold",
    borderBottomWidth:1,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: 240,
    marginLeft: 150,
    marginBottom:40,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
