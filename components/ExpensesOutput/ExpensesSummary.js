import {View, Text,StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary( {expenses, periodName} ){
    
    const expensesSum= expenses.reduce((sum, expense)=> {return sum + expense.amount}, 0 );

    return(
        <View style= {styles.container} >
            <Text style= {styles.period} > {periodName}</Text>
            <Text style= {styles.sum} > Rs. {expensesSum.toFixed(2) }</Text>
        </View>
    )
}
export default ExpensesSummary;

const styles= StyleSheet.create({
    container: {
        padding: 7,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 11,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 17,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    }
})