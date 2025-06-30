import BalanceCheckerForm from './features/balances/components/BalanceCheckerForm';
import Auth from './features/auth/components/Auth';
import './styles.scss';


function App() {
  return (
    <>
      <Auth />
      <div className="card">
        <h2>Token Balance Checker</h2>
        <BalanceCheckerForm />
      </div>
    </>
  )
}

export default App
