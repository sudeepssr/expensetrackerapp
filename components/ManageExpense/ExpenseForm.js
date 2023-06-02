import {View, StyleSheet, Text, Alert} from 'react-native';
import Input from "./Input";
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/Date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm( {onCancel,onSubmit,submitButtonLabel,defaultValues} ){

    const[inputValues, setInputValues]= useState({
        amount:{
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date:{
            value: defaultValues ? defaultValues.date.toISOString().slice(0,10): '',
            isValid: true,
        },
        description:{
            value: defaultValues ? defaultValues.description :'',
            isValid: true,
        },
    });

    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputValues((currentInputValues)=>{
            return{
                ...currentInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true},
            };
        });
    }

    
    function submitHandler(){
        const expenseData={
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            description: inputValues.description.value,
        };

        const amountIsValid= !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid= expenseData.date.toString()!== 'Invalid Date';
        const descriptionIsValid= expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid ){
            
            setInputValues((currentInputValues)=>{
                return{
                    amount: {value: currentInputValues.amount.value, isValid: amountIsValid},
                    date: {value: currentInputValues.date.value, isValid: dateIsValid},
                    description: {value: currentInputValues.description.value, isValid: descriptionIsValid}
                };
            });
            return;
        }
        
        onSubmit(expenseData);
    }

    //to check if form is not valid by checking if any of the three are invalid
    const formIsInvalid= !inputValues.amount.isValid || !inputValues.date.isValid ||  !inputValues.description.isValid;

    return(
        <View style= {styles.form}>
            <Text style= {styles.title}>Register New Expenses!!!</Text>

            <View style= {styles.inputRow}>
                <Input style={styles.styleGoing} invalid={!inputValues.amount.isValid} label= "Amount" 
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText:inputChangeHandler.bind(this, 'amount'),
                        value: inputValues.amount.value,
                    }}
                />
                <Input style={styles.styleGoing} invalid={!inputValues.date.isValid} label= "Date" 
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText:inputChangeHandler.bind(this, 'date'),
                        value: inputValues.date.value,
                    }}
                />
            </View>

            <Input label= "Description" invalid={!inputValues.description.isValid} 
                textInputConfig={{
                    multiline: true,
                    //autoCorrect: false,
                    onChangeText:inputChangeHandler.bind(this,'description'),
                    value: inputValues.description.value,
                }}
            />
            {formIsInvalid && (<Text style= {styles.errorText}>Invalid parameters passed !!!</Text>)}
            <View style= {styles.buttonContainer} >
                <Button style={styles.button} mode= 'flat' onPress= {onCancel}> Cancel </Button>
                <Button style={styles.button} onPress= {submitHandler}> {submitButtonLabel} </Button>
            </View>

        </View>
    )
}
export default ExpenseForm;

const styles= StyleSheet.create({
    form:{
        marginTop: 81,
    },
    errorText:{
        textAlign: 'center',
        color:GlobalStyles.colors.error500,
        margin: 6,
        fontWeight: 'bold',
        fontSize: 17,
    },
    title:{
        fontSize: 27,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 21,
        textAlign: 'center',
    },
    inputRow:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    styleGoing:{
        flex: 1,
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 7

    },
})