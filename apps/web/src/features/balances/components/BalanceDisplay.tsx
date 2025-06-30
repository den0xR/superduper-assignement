import { ethers } from "ethers";
import { useAppSelector } from '../../../app/hooks'
import { selectBalance, selectBalanceStatus, selectBalanceError } from '../slices/balance-slice'
import '../styles/balance-display.scss';


function BalanceDisplay() {
    const balance = useAppSelector(selectBalance);
    const status = useAppSelector(selectBalanceStatus);
    const error = useAppSelector(selectBalanceError);

    return (
        <>
            {balance !== null && balance.value !== null && balance.decimals !== null && (
                <div className="balance-display">
                    <div>
                        <strong>Symbol:</strong> {balance.symbol}
                    </div>
                    <div>
                        <strong>Balance:</strong> {ethers.formatUnits(balance.value, parseInt(balance.decimals))}
                    </div>
                </div>
            )}
            {error && (
                <div style={{ marginTop: "1rem", color: "red" }}>
                    Error: {error}
                </div>
            )}
        </>
    )
}

export default BalanceDisplay
