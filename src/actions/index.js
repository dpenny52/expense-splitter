export const addExpense = (expense) => {
  return {
    type: 'ADD_EXPENSE',
    description: expense.description,
    cost: expense.cost,
    date: expense.date,
    email: expense.email
  }
}