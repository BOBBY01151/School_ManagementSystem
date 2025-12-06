import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/students'
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params,
        ...getAuthHeaders()
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students')
    }
  }
)

const initialState = {
  students: [],
  loading: false,
  error: null,
}

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false
        state.students = action.payload.data
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default studentSlice.reducer

