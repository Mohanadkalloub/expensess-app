import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../context/app-context';

let ExpensesRow = (props) => {
    let appContext = useContext(AppContext);

    let onDeleteHandler = () => {
        deleteExpense();
    };

    let deleteExpense = () => {
        fetch (`https://expenses-f508d-default-rtdb.firebaseio.com/expenses/${props.expense.id}.json`,{
            method :"DELETE",
            headers : {
                "content-type" : "application/json",
                accept : "application/json",
            },
        }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            appContext.removeExpense(props.expense.id);
            console.log(data);
        })
    }

    return (
        <tr>
        <td> {props.expense.name} </td>
        <td> {props.expense.date} </td>
        <td> {props.expense.value} </td>
        <td colSpan="2"> {props.expense.description} </td>
        <td className="text-right">
            <a href="#" onClick={onDeleteHandler} className="delete" >
        <FontAwesomeIcon icon={faTrashCan} />
        {/* <i className="fa fa-trash-o" aria-hidden="true" /> */}
            </a></td>
    </tr>
    )
};
export default ExpensesRow;