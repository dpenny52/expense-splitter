const expense = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return {
        description: action.description,
        cost: action.cost,
        email: action.email,
        date: action.date
      }
    default: return state
  }
}

const expenses = (state = [], action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        expense(undefined, action)
      ]
    default: return state
  }
}

export default expenses;