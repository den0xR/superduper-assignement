import BalanceCheckerForm from './features/balances/components/BalanceCheckerForm';
import './styles.scss';


function App() {
  return (
    <>
      <div className="card">
        <h2>Token Balance Checker</h2>
        <BalanceCheckerForm />
      </div>
    </>
  )
}

export default App
