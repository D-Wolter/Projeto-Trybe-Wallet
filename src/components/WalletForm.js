import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

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

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { currencies } = this.props;
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
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchApi()),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
