import { useContext, useEffect } from "react";
import ExpensesRow from "./ExpensesRow";
import { AppContext } from "../context/app-context";


let ExpensesTable = () => {
    // Reading 
    let fetchData = () => {
        fetch("https://expenses-f508d-default-rtdb.firebaseio.com/expenses.json", {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            }, 
        })
        .then((response) => {
            return response.json();
        }).then((data) => {
            let fetchedExpenses = [];
            console.log(data);
            for (let key in data) {
                console.log(key);
                console.log(data[key]);
                let expense = data[key];
                expense.id = key;
                fetchedExpenses.push(data[key]);
            }
            appContext.addExpenses(fetchedExpenses);
        });
    };

    useEffect(fetchData , []);
    let appContext = useContext(AppContext);
    return (
        <div className="row mt-5 mb-5">
            <div className="custom-card ">
            <table className="table ">
                <thead>
                <tr>
                    <th> Title</th>
                    <th> Date</th>
                    <th>value</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr id="addRow">
                </tr>
                {/* <tr>
                    <td> House rent </td>
                    <td> 2022-05-09</td>
                    <td>300$ </td>
                    <td colSpan="2">any descrption can be here </td>
                    <td className="text-right"><a href="#" className="delete" ><i className="fa fa-trash-o"
                        aria-hidden="true"/></a></td>
                </tr> */}
                {/* <ExpensesRow /> */}
                {appContext.expenses.map((element) => (
                    <ExpensesRow key={element.id} expense={element}/>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}
export default ExpensesTable;