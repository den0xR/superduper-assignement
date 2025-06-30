import type { Express } from "express";
import chainsRouter from "../../features/chains/routers/chains-router";
import balancesRouter from "../../features/balances/routers/balance-router";

export function setupRouting(app: Express) {
    app.use('/api/chains', chainsRouter);
    app.use('/api/balance', balancesRouter);
}
