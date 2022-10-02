import {
  UPDATE_CURRENT_EXPENSE,
  UPDATE_TOTAL,
  GET_COINS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  totalExpenses: '0',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_COINS:
    return { ...state, currencies: action.payload };
  case UPDATE_TOTAL:
    return {
      ...state,
      totalExpenses: returnTotal(state.expenses),
    };
  case UPDATE_CURRENT_EXPENSE:
    return handleUpdateCurrentExpense(state, action.payload);
  default:
    return state;
  }
};

export default wallet;
