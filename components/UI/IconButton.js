import { Pressable, View, StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons'

function IconButton( {iconName, size, color, onPress}){

    return(
        <Pressable onPress= {onPress} style= {( {pressed} ) => pressed && styles.pressed } >
            <View style= {styles.buttonContainer} >
                <Ionicons name= {iconName} size= {size} color= {color} />
            </View>
        </Pressable>
    )
}
export default IconButton;

const styles= StyleSheet.create({
    buttonContainer:{
        borderRadius: 24,
        padding: 7,
        margin: 7,
        marginHorizontal: 11,
        marginVertical: 3,
    },
    pressed: {
        opacity: 0.75,
    }
})