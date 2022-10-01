// Coloque aqui suas actions
const USER_LOGIN = 'USER_LOGIN';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const UPDATE_CURRENT_EXPENSE = 'UPDATE_CURRENT_EXPENSE';

const userLogin = ({ email }) => ({
  type: USER_LOGIN,
  email,
});

const updateTotal = () => ({
  type: UPDATE_TOTAL,
});

const updateCurrentExpense = (name, value) => ({
  type: UPDATE_CURRENT_EXPENSE,
  payload: {
    [name]: value,
  },
});

export {
  USER_LOGIN,
  userLogin,
  updateTotal,
  UPDATE_TOTAL,
  updateCurrentExpense,
  UPDATE_CURRENT_EXPENSE,
};
