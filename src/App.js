import { useState, useReducer, useEffect } from "react";
import "./App.css";

// components imports
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import { db } from "./firebaseinit";

// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import firebase methods here
import { collection, addDoc, doc, setDoc, getDocs, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    // add cases to set retrived expenses to state here
    case "SET_EXPENSES":{
      return{
        expenses: payload.expenses
      }
    }
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses]
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id)
      };
    }
    case "UPDATE_EXPENSE": {
      const expensesDuplicate = state.expenses;
      expensesDuplicate[payload.expensePos] = payload.expense;
      return {
        expenses: expensesDuplicate
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  // create function to get expenses from firestore here
  const getExpenseFromFirestore = async() => {
    
      // const snapShot = await getDocs(collection(db, "expense-tracker"));
      // const expenseData = snapShot.docs.map((doc) => {
      //   return{
      //     id: doc.id,
      //     ...doc.data()
      //   }
      // });

      const unsub = await onSnapshot(collection(db, "expense-tracker"), (snapshot)=> {
        const expenseData = snapshot.docs.map((doc) => {
          return{
            id: doc.id,
            ...doc.data()
          }
        });

        dispatch({
          type: "SET_EXPENSES",
          payload: {expenses: expenseData}
        });
      })

      
    
  };


  // use appropriate hook to get the expenses when app mounts
  useEffect(() => {
    getExpenseFromFirestore();
  },[]);

  const addExpense = async (expense) => {
    const expenseRef = collection(db, "expenses");
    const docRef = await addDoc(expenseRef, expense);
    dispatch({
      type: "ADD_EXPENSE",
      payload: { expense: { id: docRef.id, ...expense } }
    });
    toast.success("Expense added successfully.");
  };

  const deleteExpense = async (id) => {
    //delete expense from firestore
    await deleteDoc(doc(db, "expense-tracker", id));
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };

  const resetExpenseToUpdate = () => {
    setExpenseToUpdate(null);
  };

  const updateExpense = async (expense) => {
    const expensePos = state.expenses
      .map(function (exp) {
        return exp.id;
      })
      .indexOf(expense.id);

    if (expensePos === -1) {
      return false;
    }

    // update expense in firestore here
    await setDoc(doc(db, "expense-tracker", expense.id), {
      text: expense.text,
      amount: expense.amount
    });

    //update expense using "updateDoc"
    await updateDoc(doc(db, "expense-tracker", expense.id),{
      text: expense.text,
      amount: expense.amount
    })


    dispatch({ type: "UPDATE_EXPENSE", payload: { expensePos, expense } });
    toast.success("Expense updated successfully.");
  };

  return (
    <>
      <ToastContainer />
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          expenseToUpdate={expenseToUpdate}
          updateExpense={updateExpense}
          resetExpenseToUpdate={resetExpenseToUpdate}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={setExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
