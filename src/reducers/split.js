const initialState = {
  splitWith: '',
  splitPercent: '50'
}

const split = (state = initialState, action) => {
  switch(action.type) {
    case 'SPLIT_WITH_CHANGE':
      return {
        ...state,
        splitWith: action.splitWith
      }
    case 'SPLIT_PERCENT_CHANGE':
      return {
        ...state,
        splitPercent: action.splitPercent
      }
    default: return state
  }
}

export default split;