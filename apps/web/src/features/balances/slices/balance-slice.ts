import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'
import axios from 'axios';

interface BalancesState {
    value: string | null;
    decimals: string | null;
    symbol: string | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: BalancesState = {
    value: null,
    decimals: null,
    symbol: null,
    status: 'idle',
    error: null
}

export interface GetBalanceParams {
    chainId: string;
    contractAddress: string;
}

export interface BalanceResponseBody {
    balance: string;
    decimals: string;
    symbol: string;
}

export const getBalance = createAsyncThunk<BalanceResponseBody, GetBalanceParams>(
    'balances/getBalance',
    async (params: GetBalanceParams, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const walletAddress = state.auth.walletAddress;

        const response = await axios.post('http://localhost:3000/api/balance', {
            chainId: params.chainId,
            contractAddress: params.contractAddress,
            walletAddress: walletAddress
        });

        return response.data;
    }
);

export const balancesSlice = createSlice({
    name: 'balances',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        resetBalance: (state: BalancesState) => {
            state.value = null;
            state.decimals = null;
            state.symbol = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBalance.fulfilled, (state: BalancesState, action: PayloadAction<BalanceResponseBody>) => {
            state.value = action.payload.balance;
            state.decimals = action.payload.decimals;
            state.symbol = action.payload.symbol;
            state.status = 'idle';
            state.error = null;
        })
        builder.addCase(getBalance.rejected, (state: BalancesState) => {
            


            state.value = null;
            state.status = 'failed';
            state.error = 'Failed to get balance';
        })
        builder.addCase(getBalance.pending, (state: BalancesState) => {
            state.value = null;
            state.status = 'loading';
        });
    }
})


export const selectBalance = (state: RootState) => state.balance;
export const selectBalanceStatus = (state: RootState) => state.balance.status;
export const selectBalanceError = (state: RootState) => state.balance.error;

export const { resetBalance } = balancesSlice.actions

export default balancesSlice.reducer
