import type { Express } from "express";
import chainsRouter from "../../features/chains/routers/chains-router";

export function setupRouting(app: Express) {
    app.use('/api/chains', chainsRouter);
}
