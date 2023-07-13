import { useContext, useRef } from "react";
import { AppContext } from "../context/app-context";

let ExpenseForm = () => {
  // useRef for inputs
  let nameRef = useRef();
  let dateRef = useRef();
  let valueRef = useRef();
  let descriptionRef = useRef();
  let appContext = useContext(AppContext);

  // create function // لا يوجد شروط على الاسم لكن يوجد شروط على الداله نفسها وويوجد شروط على متغيرها
  let onSubmitHandler = (event) => {
    event.preventDefault();
    if (checkData()) {
      let newExpenses = getNewExpenses();
      // child to parent coummuncation ;
      // props.onNewExpenses(newExpenses);
      save();
    }
  };
  let checkData = () => {
    if (
      nameRef.current.value != "" &&
      dateRef.current.value != "" &&
      valueRef.current.value != "" &&
      descriptionRef.current.value != ""
    ) {
      return true;
    }
    alert("Enter Required Data !");
    return false;
  };

  let getNewExpenses = () => {
    return {
      name: nameRef.current.value,
      date: dateRef.current.value,
      value: valueRef.current.value,
      description: descriptionRef.current.value,
    };
  };
  let clearForm = () => {
    nameRef.current.value = "";
    dateRef.current.value = "";
    valueRef.current.value = "";
    descriptionRef.current.value = "";
  };
  /// save data in firebase

  let save = () => {
    let newExpense = getNewExpenses();
    fetch("https://expenses-f508d-default-rtdb.firebaseio.com/expenes.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newExpense),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // id & name
        newExpense.id = data.name;
        appContext.addNewExpense(newExpense);
        clearForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form className="row" onSubmit={onSubmitHandler}>
      <div className="mb-3 col-md-6">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control addTitle"
          aria-describedby=""
          ref={nameRef}
        />
      </div>
      <div className="mb-3 col-md-6">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control addDate"
          aria-describedby=""
          ref={dateRef}
        />
      </div>
      <div className="mb-3 col-md-6">
        <label className="form-label">Value</label>
        <input
          type="number"
          className="form-control addValue"
          aria-describedby=""
          ref={valueRef}
        />
      </div>
      <div className="mb-3 col-md-6">
        <label htmlFor="title" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control addDescrption"
          aria-describedby=""
          ref={descriptionRef}
        />
      </div>
      <div className="mb-3 col-md-12 text-right">
        <button type="submit" className="btn btn-primary addBtn">
          Add
        </button>
      </div>
    </form>
  );
};
export default ExpenseForm;
