import { Pressable, StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import {getFormattedDate} from "../../util/Date";
import { useNavigation } from "@react-navigation/native";


function ExpenseItem( {id, description, date, amount} ){
    
    const navigation= useNavigation();

    function expensePressHandler(){
         navigation.navigate('ManageExpense',{expenseId: id});

    }
    
    return(
        <Pressable onPress= {expensePressHandler} style= {({pressed})=>pressed && styles.pressed} >
            <View style= {styles.expenseItem}>
                <View>
                    <Text style= {[styles.textBase, styles.description]}> {description} </Text>
                    <Text style= {styles.textBase}> {getFormattedDate(date)} </Text>
                </View>
                <View style= {styles.amountContainer}>
                    <Text style= {styles.amounts}> {amount} </Text>
                </View>
            </View>
        </Pressable>
    )
}
export default ExpenseItem;

const styles= StyleSheet.create({
    pressed:{
        opacity: 0.75,
    },
    expenseItem:{
        padding: 12,
        marginVertical: 7,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: "space-between",
        borderRadius: 7,
        elevation: 3,
    },
    textBase:{
        color: GlobalStyles.colors.primary50,
    },
    description:{
        fontSize: 17,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    amountContainer:{
        paddingHorizontal: 11,
        paddingVertical: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        minWidth: 80,
    },
    amounts:{
        fontWeight: 'bold',
        backgroundColor: GlobalStyles.primary500,
    }
})