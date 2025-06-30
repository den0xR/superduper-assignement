import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { setWallet, setIsConnected } from '../slices/auth-slice';
import { selectWallet, selectIsConnected } from '../slices/auth-slice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import "../styles/auth.scss"


export default function Auth() {
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const walletAddress = useAppSelector(selectWallet);
    const isConnected = useAppSelector(selectIsConnected);

    const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
            dispatch(setIsConnected(false));
            dispatch(setWallet(null));
        } else {
            dispatch(setIsConnected(true));
            dispatch(setWallet(accounts[0]));
        }
    }

    const setupListeners = () => {
        window.ethereum?.on('accountsChanged', handleAccountsChanged);
    }

    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: 'eth_accounts',
                    });

                    if (accounts.length > 0) {
                        // User is already connected
                        dispatch(setWallet(accounts[0]));
                        dispatch(setIsConnected(true));

                    }
                } catch (error) {
                    setError("There was an error in getting your accounts. Please refresh the page and try again.");
                }
            } else {
                setError('MetaMask is not installed.');
            }
        }

        checkConnection();
    }, []);


    const handleConnect = async () => {
        if (window.ethereum == null) {
            setError("MetaMask is not installed.");

        } else {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();

            dispatch(setIsConnected(true));
            dispatch(setWallet(signer.address));
            setupListeners();
        }
    }

    return (
        <div className="wallet">
            {error && <p className="error">{error}</p>}
            {isConnected && walletAddress && <div className="wallet__info">
                <p>{walletAddress}</p>
            </div>}
            <div className="wallet__button">
                {!isConnected && <button onClick={handleConnect}>Connect Wallet</button>}
            </div>
        </div>
    );
}
