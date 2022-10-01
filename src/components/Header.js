import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;

    return (
      <header>
        <section>
          <div>
            <h3 data-testid="email-field">{ email }</h3>
          </div>
          <div>
            <h3 data-testid="total-field">{Number(totalExpenses).toFixed(2)}</h3>
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
  totalExpenses: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string,
};

Header.defaultProps = {
  totalExpenses: '0',
};

export default connect(mapStateToProps, null)(Header);
