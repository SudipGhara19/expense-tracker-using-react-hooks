import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  // Create function to add an expense
  const addExpense = (newExpense) => {
    setExpenses((prevExpense) => [newExpense, ...prevExpense]);
  };

  // Create function to delete an expense
  const deleteExpence = (index) => {
    setExpenses((prevExpense) => 
      prevExpense.filter((expense) => index !== expense.id)
    );
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm onAddExpense={addExpense}/>
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpence}/>
        </div>
      </div>
    </>
  );
}

export default App;
