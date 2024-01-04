import React from "react";
import styles from "./ExpenseInfo.module.css";

const ExpenseInfo = (props) => {
  // Add logic here to calculate the grand total, profit and expense amount here
  let grandTotal = 0;
  let profitAmount = 0;
  let expenseAmount = 0;

  for (const expense of props.expenses) {
    // JSON.parse(expense.amount);
    grandTotal = grandTotal + expense.amount;
    



    if (expense.amount > 0) {
      profitAmount += expense.amount;
    } else {
      expenseAmount -= expense.amount;
    }
  }

  return (
    <div className={styles.expenseInfoContainer}>
      <div className={styles.balance}>
        <h4>YOUR BALANCE</h4>
        <h1>${grandTotal}</h1>
      </div>
      <div className={styles.incomeExpenseContainer}>
        <div>
          <h4>Income</h4>
          <p id="money-plus" className={`${styles.money} ${styles.plus}`}>
            +${profitAmount}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className={`${styles.money} ${styles.minus}`}>
            -${expenseAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInfo;
