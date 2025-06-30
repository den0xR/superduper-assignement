import BalanceCheckerForm from './features/balances/components/BalanceCheckerForm';
import Auth from './features/auth/components/Auth';
import BalanceDisplay from './features/balances/components/BalanceDisplay';
import './styles.scss';


function App() {
  return (
    <div className="app">
      <Auth />
      <div className="main">
        <div className="card">
          <h2 className="card__heading">Token Balance Checker</h2>
          <p className="card__subheading">Enter your wallet or contract address below to quickly check the current balance of your tokens.</p>
          <BalanceCheckerForm />
        </div>
        <BalanceDisplay />
      </div>
    </div>

  )
}

export default App
