import axios from "axios";
import { Chain } from "../types/chains.types";

const ChainService = {
    getChains: async () => {
        try {
            const response = await axios.get("https://chainid.network/chains.json");
            const chains = response.data;

            // Mainnet, Arbitrum, Polygon
            const targetChainIds = [1, 42161, 137];

            const selectedChains = chains.filter((chain: Chain) =>
                targetChainIds.includes(chain.chainId)
            );

            return selectedChains;
        } catch (error) {
            throw error;
        }
    },
    getChainById: async (chainId: string) => {
        try {
            const chains = await ChainService.getChains();
            const chainIdNumber = parseInt(chainId);
            const chain = chains.find((chain: Chain) => chain.chainId === chainIdNumber);

            if (!chain) {
                throw new Error("Chain not found");
            }

            return chain;
        } catch (error) {
            throw error;
        }
    }
};

export default ChainService;
