import React from "react";
import styles from "./ExpenseList.module.css";
import Transaction from "../Transaction/Transaction";

const ExpenseList = (props) => {

  const handleDelete = (index) =>{
    props.onDeleteExpense(index);
  }

  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul className={styles.transactionList}>
        {/* Display transactions here */}
        {props.expenses.map((expense)=> (
          
            <Transaction key={expense.id} expense={expense} index={expense.id} 
                        onDelete={()=>handleDelete(expense.id)}/>
          
        ))}
        

      </ul>
    </div>
  );
};

export default ExpenseList;
