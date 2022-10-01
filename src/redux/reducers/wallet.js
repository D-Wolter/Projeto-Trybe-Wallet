import {
  UPDATE_CURRENT_EXPENSE,
  UPDATE_TOTAL,
} from '../actions';

const INITIAL_STATE = {
  totalExpenses: '0',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
