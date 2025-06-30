import { NextFunction, Request, Response } from "express-serve-static-core";
import { BalanceRequestBody, BalanceResponseBody } from "../types/balance.types";
import BalanceService from "../services/balance-service";
import ChainService from "../../chains/services/chains-service";
import { findWorkingRpc } from "../services/rpc-service";

export default {
    getBalance: async (req: Request<{}, {}, BalanceRequestBody>, res: Response<BalanceResponseBody>, next: NextFunction) => {
        try {
            const { walletAddress, chainId, contractAddress } = req.body;

            const chain = await ChainService.getChainById(chainId);
            const workingRpcUrl = await findWorkingRpc(chain.rpc);
            if (!workingRpcUrl) {
                throw new Error("No working RPC found");
            }
            const balanceResponse = await BalanceService.getBalance(walletAddress, chainId, contractAddress, workingRpcUrl);

            return res.json(balanceResponse);
        } catch (e) {
            next(e);
        }
    }
}
