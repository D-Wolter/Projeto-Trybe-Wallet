import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumTotalExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const sum = expenses.reduce((acc, cur) => {
        const currencyName = cur.currency;
        const aksCurrency = cur.exchangeRates[currencyName].ask;
        const result = Number(aksCurrency) * Number(cur.value);
        return acc + Number(result);
      }, 0);
      return Number(sum).toFixed(2);
    }
    return 0;
  };

  render() {
    const { email } = this.props;
    const getResult = this.sumTotalExpenses();

    return (
      <header>
        <section>
          <div>
            <h3 data-testid="email-field">{ email }</h3>
          </div>
          <div>
            <h3 data-testid="total-field">{Number(getResult).toFixed(2)}</h3>
          </div>
          <div>
            <h3 data-testid="header-currency-field">BRL</h3>
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
