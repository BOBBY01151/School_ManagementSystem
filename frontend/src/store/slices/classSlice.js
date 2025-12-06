import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/classes'
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params,
        ...getAuthHeaders()
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch classes')
    }
  }
)

const initialState = {
  classes: [],
  loading: false,
  error: null,
}

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false
        state.classes = action.payload.data
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default classSlice.reducer

