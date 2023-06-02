import {Text, View, StyleSheet} from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

function ManageExpenses( {route, navigation} ){
    
    const expenseCtx= useContext(ExpensesContext);

    const editedExpenseId= route.params?.expenseId;

    const isEditing= !!editedExpenseId;     // !! can be used to convert a value into corresponding boolean: true: editing, false:  if not editing

    const selectedExpense= expenseCtx.expenses.find(expense=> expense.id=== editedExpenseId);

    // navigation.setOptions({
    //     title: isEditing? 'Edit Expense' : 'Add New Expense'
    // }); instead useLayout effect hook for this

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing? 'Edit Expense' : 'Add New Expense'
        })
    },[isEditing, navigation]);

    async function deleteExpenseHandler(){
        await deleteExpense(editedExpenseId);
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        if(isEditing){
            expenseCtx.updateExpense(editedExpenseId, expenseData);
            await updateExpense(editedExpenseId ,expenseData);
        }
        else{
            const id= await storeExpense(expenseData);
            expenseCtx.addExpense({...expenseData, id: id});
        }
        navigation.goBack();
    }

    return(
        <View style= {styles.container}>
            <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler} submitButtonLabel={isEditing? 'Update':'Add'}
                defaultValues= {selectedExpense}
            />
            
            {isEditing && (
                <View style= {styles.delete}> 
                    <IconButton iconName= "trash" color= {GlobalStyles.colors.error500} size= {31} onPress= {deleteExpenseHandler} /> 
                    </View> 
                    ) }
            
        </View>
    )
}
export default ManageExpenses;

const styles= StyleSheet.create({
    container:{
        flex: 1,
        padding: 23,
        backgroundColor: GlobalStyles.colors.primary800
    },
    delete:{
        marginTop: 15,
        paddingTop: 7,
        borderTopWidth: 3,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})