import { NextFunction, Request, Response } from "express-serve-static-core";
import ChainService from "../services/chains-service";

export default {
    getChains: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chains = await ChainService.getChains();

            return res.json(chains);
        } catch (e) {
            next(e);
        }
    }
}