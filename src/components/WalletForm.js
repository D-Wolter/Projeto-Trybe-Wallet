import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchAddExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  clearLayout = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleClick = () => {
    const { value, currency, description, method, tag } = this.state;
    const { expenses, addExpense } = this.props;
    if (!expenses[0]) {
      const obj = {
        id: 0, value, currency, method, description, tag,
      };
      addExpense(obj);
    } else {
      const index = expenses.length - 1;
      const id = Number(expenses[index].id) + 1;
      const obj = {
        id, value, currency, method, description, tag,
      };
      addExpense(obj);
    }
    this.clearLayout();
  };

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { currencies, isDisabled } = this.props;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          value={ value }
          name="value"
          onChange={ (event) => this.handleChange(event) }
          placeholder="Value"
        />

        <input
          type="text"
          data-testid="description-input"
          value={ description }
          name="description"
          onChange={ (event) => this.handleChange(event) }
        />

        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ (event) => this.handleChange(event) }
        >
          {
            currencies.map((item, index) => <option key={ index }>{item}</option>)
          }
        </select>

        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ (event) => this.handleChange(event) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ (event) => this.handleChange(event) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        {
          !isDisabled ? (
            <div>
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar Despesa
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={ this.editExpense }
              >
                Editar Despesa
              </button>
            </div>
          )
        }

      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  isDisabled: wallet.isDisabled,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchApi()),
  addExpense: (expense) => dispatch(fetchAddExpense(expense)),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
