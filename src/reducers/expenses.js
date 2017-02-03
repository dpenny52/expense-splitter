const initialState = {
  expenseList: [],
  description: '',
  cost: '0'
}

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

const expenses = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return {
        expenseList: [
          ...state.expenseList,
          expense(undefined, action)
        ],
        description: '',
        cost: '0'
      }
    case 'DESCRIPTION_CHANGE':
      return {
        ...state,
        description: action.description
      }
    case 'COST_CHANGE':
      return {
        ...state,
        cost: action.cost
      }
    default: return state
  }
}

export default expenses;