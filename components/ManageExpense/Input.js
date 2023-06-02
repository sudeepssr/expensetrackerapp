import {View, Text, TextInput, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({label, invalid, textInputConfig, style}){
    return(
        <View style= {[styles.inputContainer, style]}>
            <Text style= {[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style= {[styles.input, invalid && styles.invalidInput]} {...textInputConfig}/>
        </View>
    );
}
export default Input;

const styles= StyleSheet.create({
    inputContainer:{
        marginHorizontal: 14,
        marginVerticle: 7,
    },
    label:{
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 3,
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 7,
        borderRadius: 7,
        color: GlobalStyles.colors.primary700,
        fontSize: 17,
    },
    invalidLabel:{
        color: GlobalStyles.colors.error50,
    },
    invalidInput:{
        backgroundColor: GlobalStyles.colors.error500,
    }
    
})