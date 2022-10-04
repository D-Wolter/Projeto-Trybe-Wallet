import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { removeAction } from '../redux/actions';

class Table extends Component {
  state = {
    redirect: false,
  };

  render() {
    const { redirect } = this.state;
    const { expenses, removeExpense } = this.props;
    return (
      <div>
        {expenses.length === 0
          ? (
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Tag</th>
                  <th>Método de pagamento</th>
                  <th>Valor</th>
                  <th>Moeda</th>
                  <th>Câmbio utilizado</th>
                  <th>Valor convertido</th>
                  <th>Moeda de conversão</th>
                  <th>Editar/Excluir</th>
                </tr>
              </thead>
            </table>
          )
          : (
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Tag</th>
                  <th>Método de pagamento</th>
                  <th>Valor</th>
                  <th>Moeda</th>
                  <th>Câmbio utilizado</th>
                  <th>Valor convertido</th>
                  <th>Moeda de conversão</th>
                  <th>Editar/Excluir</th>
                </tr>
              </thead>
              <tbody>
                { expenses.length > 0 && (expenses.map((elem) => (
                  <tr key={ `${elem.id}${elem.description}` }>
                    <td>{elem.description}</td>
                    <td>{elem.tag}</td>
                    <td>{elem.method}</td>
                    <td>{Number(elem.value).toFixed(2)}</td>
                    <td>
                      {
                        `${elem.exchangeRates[elem
                          .currency].name.split('/')[0]}${'/Real Brasileiro'}`
                      }
                    </td>
                    <td>
                      {
                        (Number(elem.exchangeRates[elem.currency].ask).toFixed(2))
                      }

                    </td>
                    <td>
                      {
                        (Number(elem.value)
                          * Number(elem.exchangeRates[elem.currency].ask))
                          .toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => {
                          receiveEdit(elem.id);
                        } }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => removeExpense(elem.id) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          )}
        { redirect && <Redirect to="/carteira" /> }
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
