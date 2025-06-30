import config from "../../../core/config";

function isInfuraRpc(url: string): boolean {
    return url.includes('infura.io');
}

function isTenderlyRpc(url: string): boolean {
    return url.includes('tenderly.co');
}

function findInfuraRpc(rpcs: string[], apiKey?: string): string | null {
    if (!rpcs || rpcs.length === 0 || !apiKey) {
        return null;
    }

    const infuraUrls = rpcs.filter(url => isInfuraRpc(url));
    if (infuraUrls.length === 0) {
        return null;
    }

    for (const url of infuraUrls) {
        if (url.includes('${INFURA_API_KEY}')) {
            return url.replace('${INFURA_API_KEY}', apiKey);
        }
    }

    return null;
}

function findTenderlyRpc(rpcs: string[]): string | null {
    if (!rpcs || rpcs.length === 0) {
        return null;
    }

    const tenderlyRpc = rpcs.find(url => isTenderlyRpc(url));
    return tenderlyRpc || null;
}

export function findWorkingRpc(rpcUrls: string[]): string | null {
   const infuraRpc = findInfuraRpc(rpcUrls, config.infuraApiKey);
   if (infuraRpc) {
      return infuraRpc;
   }

   const tenderlyRpc = findTenderlyRpc(rpcUrls);
   return tenderlyRpc || null;
}