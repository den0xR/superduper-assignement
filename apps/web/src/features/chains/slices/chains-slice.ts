import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'
import axios from 'axios';

interface Chain {
    id: string;
    name: string;
    chainId: number;
}

interface ChainsState {
    chains: Chain[]
}

const initialState: ChainsState = {
    chains: []
}

export const getChains = createAsyncThunk(
    'chains/getChains',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/chains`);

        return response.data;
    }
);


export const chainsSlice = createSlice({
    name: 'chains',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getChains.fulfilled, (state: ChainsState, action: PayloadAction<Chain[]>) => {
            state.chains = action.payload;
        })
        builder.addCase(getChains.rejected, (state: ChainsState) => {
            state.chains = [];
        })
        builder.addCase(getChains.pending, (state: ChainsState) => {
            state.chains = [];
        });
    }
})


export const selectChains = (state: RootState) => state.chains.chains;
export default chainsSlice.reducer
