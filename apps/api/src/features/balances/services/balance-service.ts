import { ethers } from "ethers";
import BalanceModel from "../models/balances-model";
import { createProvider } from "./provider-service";

const ERC_20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
];

const BalanceService = {
    getContractData: async (walletAddress: string, chainId: number, erc20ContractAddress: string, rpcUrl: string) => {
        try {
            const provider = createProvider(rpcUrl);
            const contract = new ethers.Contract(erc20ContractAddress, ERC_20_ABI, provider);
            const balance = await contract.balanceOf(walletAddress);
            const decimals = await contract.decimals();
            const symbol = await contract.symbol();

            return {
                balance,
                decimals,
                symbol,
            }
        } catch (e) {
            throw new Error("Contract not found");
        }
    },

    getBalance: async (walletAddress: string, chainId: string, contractAddress: string, rpcUrl: string) => {
        try {
            const chainIdNumber = parseInt(chainId);

            const {
                balance,
                decimals,
                symbol,
            } = await BalanceService.getContractData(walletAddress, chainIdNumber, contractAddress, rpcUrl);


            await BalanceModel.create({
                walletAddress,
                tokenContractAddress: contractAddress,
                tokenSymbol: symbol
            });

            return {
                balance: balance.toString(),
                decimals: decimals.toString(),
                symbol,
            }
        } catch (error) {
            throw error;
        }

    }
};

export default BalanceService;
