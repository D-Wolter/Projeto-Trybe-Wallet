import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Header />
          <WalletForm />
        </main>
      </div>
    );
  }
}
export default Wallet;
