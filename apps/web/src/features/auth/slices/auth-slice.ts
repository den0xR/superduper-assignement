import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'

interface AuthState {
    isConnected: boolean;
    walletAddress: string | null;
}

const initialState: AuthState = {
    isConnected: false,
    walletAddress: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setWallet: (state, action: PayloadAction<string | null>) => {
            state.walletAddress = action.payload
        },
        setIsConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload
        }
    }
})

export const { setWallet, setIsConnected } = authSlice.actions

export const selectWallet = (state: RootState) => state.auth.walletAddress
export const selectIsConnected = (state: RootState) => state.auth.isConnected

export default authSlice.reducer
