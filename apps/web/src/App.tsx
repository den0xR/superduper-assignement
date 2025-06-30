import BalanceCheckerForm from './features/balances/components/BalanceCheckerForm';
import Auth from './features/auth/components/Auth';
import BalanceDisplay from './features/balances/components/BalanceDisplay';
import './styles.scss';


function App() {
  return (
    <>
      <Auth />
      <div className="card">
        <h2>Token Balance Checker</h2>
        <BalanceCheckerForm />
        <BalanceDisplay />
      </div>
    </>
  )
}

export default App
