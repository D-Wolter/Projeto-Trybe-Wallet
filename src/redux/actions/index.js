// Coloque aqui suas actions
const USER_LOGIN = 'USER_LOGIN';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const UPDATE_CURRENT_EXPENSE = 'UPDATE_CURRENT_EXPENSE';
const GET_COINS = 'GET_COINS';

const userLogin = ({ email }) => ({
  type: USER_LOGIN,
  email,
});

const actionGetCoins = (coins) => ({
  type: GET_COINS,
  payload: Object.keys(coins).filter((e) => e !== 'USDT'),
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

export function fetchApi() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(actionGetCoins(data));
  };
}

export {
  USER_LOGIN,
  userLogin,
  updateTotal,
  UPDATE_TOTAL,
  updateCurrentExpense,
  UPDATE_CURRENT_EXPENSE,
  GET_COINS,
  actionGetCoins,
};
