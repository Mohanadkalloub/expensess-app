// كيفيه تعريف ال context : 

import { createContext, useState } from "react";

export const AppContext = createContext({
// ايش بدك تعمم : 
expenses: [], // array 
addNewExpense: (expense) => {}, // function 
removeExpense : (id) => {},
addExpenses : (expenses) => {},
});


export const AppContextProvider = (props) => {
    let [expenses , setExpenses] = useState([]);

    let addNewExpense = (item) => {
        setExpenses((prevState) => {
            return [item , ...prevState];
        })
    }

    let removeExpense = (id) => {
        let data = expenses.filter((element) => element.id !=id );
        setExpenses(data);
    }

    let addExpenses = (array) => {
        setExpenses(array);
    }
    return <AppContext.Provider value={{
        expenses : expenses,
        addNewExpense : addNewExpense,
        removeExpense: removeExpense,
        addExpenses : addExpenses,
    }}>
        {props.children}
    </AppContext.Provider>
}