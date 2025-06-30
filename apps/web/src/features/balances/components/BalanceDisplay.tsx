import { ethers } from "ethers";
import { useAppSelector } from '../../../app/hooks'
import { selectBalance, selectBalanceStatus, selectBalanceError } from '../slices/balance-slice'
import '../styles/balance-display.scss';


function BalanceDisplay() {
    const balance = useAppSelector(selectBalance);
    const status = useAppSelector(selectBalanceStatus);
    const error = useAppSelector(selectBalanceError);


    const symbol = balance?.symbol;
    const decimals = balance?.decimals;
    const value = balance?.value;
    const name = balance?.name;

    return (
        <div className="balance-display">
            <h2>Holdings</h2>
            <div className="fields-container">
                <div>
                    <strong>Name:</strong> <span className={status === 'loading' ? 'loading' : ''}>{name ? name : 'Token not selected'}</span>
                </div>
                <div>
                    <strong>Symbol:</strong> <span className={status === 'loading' ? 'loading' : ''}>{symbol ? symbol : 'Token not selected'}</span>
                </div>
                <div>
                    <strong>Balance:</strong> <span className={status === 'loading' ? 'loading' : ''}>{value && decimals ? ethers.formatUnits(value, parseInt(decimals)) : 'Token not selected'}</span>
                </div>
            </div>
            {error && (
                <div style={{ marginTop: "1rem", color: "red" }}>
                    Error: {error}
                </div>
            )}
        </div>
    )
}

export default BalanceDisplay
