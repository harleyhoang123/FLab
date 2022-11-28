
import {View, StyleSheet} from 'react-native';

function Separator(props) {
    return (
        <View style={styles.container}>

        </View>
    );
}

const styles= StyleSheet.create(
    {
        container:{
            borderBottomWidth:1,
            marginBottom:20,
            marginTop:20,
        },
    }
);
export default Separator;