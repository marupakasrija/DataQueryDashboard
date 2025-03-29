import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"

export type QueryHistoryItem = {
  query: string
  timestamp: number
}

export type ChartResult = {
  title: string
  chartType: string
  data: any[]
  analysis: string
}

interface QueryState {
  currentQuery: string
  queryHistory: QueryHistoryItem[]
  isLoading: boolean
  error: string | null
  results: ChartResult | null
}

const initialState: QueryState = {
  currentQuery: "",
  queryHistory: [],
  isLoading: false,
  error: null,
  results: null,
}

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    submitQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload
      state.queryHistory.unshift({
        query: action.payload,
        timestamp: Date.now(),
      })
      // Keep only the last 10 queries
      if (state.queryHistory.length > 10) {
        state.queryHistory = state.queryHistory.slice(0, 10)
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.results = null
    },
    setResults: (state, action: PayloadAction<ChartResult>) => {
      state.results = action.payload
      state.error = null
    },
    removeFromHistory: (state, action: PayloadAction<number>) => {
      state.queryHistory.splice(action.payload, 1)
    },
  },
})

export const { submitQuery, setLoading, setError, setResults, removeFromHistory } = querySlice.actions

// Selectors
export const selectCurrentQuery = (state: RootState) => state.query.currentQuery
export const selectQueryHistory = (state: RootState) => state.query.queryHistory
export const selectIsLoading = (state: RootState) => state.query.isLoading
export const selectError = (state: RootState) => state.query.error
export const selectResults = (state: RootState) => state.query.results

export default querySlice.reducer

