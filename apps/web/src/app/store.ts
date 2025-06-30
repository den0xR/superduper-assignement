import { configureStore } from '@reduxjs/toolkit'
import chainsReducer from '../features/chains/slices/chains-slice'

export const store = configureStore({
  reducer: {

    chains: chainsReducer
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
