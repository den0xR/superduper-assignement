import { configureStore } from '@reduxjs/toolkit'
import chainsReducer from '../features/chains/slices/chains-slice'
import authReducer from '../features/auth/slices/auth-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chains: chainsReducer
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
