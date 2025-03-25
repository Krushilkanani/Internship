import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : "",
            isvalid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : "",
            isvalid: true, //!!defaultValues
        },
        description: {
            value: defaultValues ? defaultValues.description : "",
            isvalid: true, //!!defaultValues
        },
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currInputs) => {
            return {
                ...currInputs,
                [inputIdentifier]: { value: enteredValue, isvalid: true },
            };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            //show feedback
            // Alert.alert("Invalid input", "Please check the errors in the form");
            setInputs((currInputs) => {
                return {
                    amount: {
                        value: currInputs.amount.value,
                        isvalid: amountIsValid,
                    },
                    date: {
                        value: currInputs.date.value,
                        isvalid: dateIsValid,
                    },
                    description: {
                        value: currInputs.description.value,
                        isvalid: descriptionIsValid,
                    },
                };
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid =
        !inputs.amount.isvalid ||
        !inputs.date.isvalid ||
        !inputs.description.isvalid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isvalid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputs.amount.value,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isvalid}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputs.date.value,
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isvalid}
                textInputConfig={{
                    multiline: true,
                    // autoCorrect: false,
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputs.description.value,
                }}
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>
                    Invalid input values - please check you data
                </Text>
            )}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
});
