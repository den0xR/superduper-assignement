export interface BalanceRequestBody {
    walletAddress: string;
    chainId: string;
    contractAddress: string;
};  

export interface BalanceResponseBody {
    balance: string;
    decimals: string;
    symbol: string;
    name: string;
};