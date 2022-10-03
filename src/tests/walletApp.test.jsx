import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Tests for Trybe Wallet application', () => {
  test('Login Component ', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailElement = screen.getByPlaceholderText('Usuário');
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByPlaceholderText('Senha');
    expect(passwordElement).toBeInTheDocument();

    const loginButton = screen.getByRole('button');
    expect(loginButton).toBeInTheDocument();

    userEvent.type(emailElement, 'daniel@wolter.com');
    userEvent.type(passwordElement, '12345678');
    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const userEmail = screen.getByRole('heading', {
      name: /daniel@wolter\.com/i,
    });
    expect(userEmail).toBeInTheDocument();

    const brlText = screen.getByText(/brl/i);
    expect(brlText).toBeInTheDocument();
  });
  it('Testando a página wallet', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const newValueInput = screen.getByRole('textbox');
    expect(newValueInput).toBeInTheDocument();

    const currencyseletor = screen.getAllByRole('combobox');
    const num = 3;
    expect(currencyseletor.length).toBe(num);

    const inputValue = screen.getByPlaceholderText(/value/i);
    expect(inputValue).toBeInTheDocument();

    const addBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addBtn).toBeInTheDocument();

    userEvent.type(inputValue, '1');
    userEvent.click(addBtn);

    const totalValue = await screen.findByTestId('total-field');
    expect(totalValue).toBeInTheDocument();
    expect(totalValue).toHaveTextContent('0.00');
  });
});
