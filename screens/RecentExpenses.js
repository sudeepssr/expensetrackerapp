import {Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect} from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/Date';
import { fetchExpenses } from '../util/http';

function RecentExpenses(){
    
    const expensesCtx= useContext(ExpensesContext);
    
    useEffect(()=>{
        async function getExpenses(){
            const expenses= await fetchExpenses();
            expensesCtx.setExpenses(expenses);
            }
        getExpenses();
    },[]);


    const recentExpenses= expensesCtx.expenses.filter( (expense)=> {
        const today= new Date();
        const date7DaysAgo= getDateMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today) ;        //fetched younger date entries as expense.date is recent as compared to week date

    } );
 
    return(
        <ExpensesOutput expenses= {recentExpenses} expensesPeriod= 'Last week' fallbackText="No expenses registered for the last 7 days" />
    )
}
export default RecentExpenses;