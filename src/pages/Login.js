import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      redirect: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value }, this.disableButton);
  }

  handleSubmit() {
    const { submitLogin } = this.props;
    const { email, password } = this.state;
    submitLogin({ email, password });
    this.setState({ redirect: true });
  }

  disableButton() {
    const { email, password } = this.state;
    const regExpEmail = /^([a-z0-9]{1,}[._]{0,1}[a-z0-9]{1,})*(@[a-z0-9]{1,}.com)$/i;
    const minPassLen = 6;
    if (!email.match(regExpEmail) || password.length < minPassLen) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  }

  render() {
    const { email, password, isDisabled, redirect } = this.state;
    return (
      <div>
        { redirect && <Redirect to="/carteira" /> }
        { !redirect && (
          <form>
            <header />
            <div>
              <input
                data-testid="email-input"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleInputChange }
                placeholder="Usuário"
              />
            </div>
            <div>
              <input
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleInputChange }
                placeholder="Senha"
              />
            </div>
            <button type="button" disabled={ isDisabled } onClick={ this.handleSubmit }>
              ENTRAR
            </button>
          </form>
        ) }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (state) => dispatch(userLogin(state)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
