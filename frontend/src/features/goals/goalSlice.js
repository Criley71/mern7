import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authSlice from '../auth/authSlice'
import goalService from './goalService'
//redux resources should have the isError, success, loading and message
const initialState = {
  meals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//create new goal
export const createGoal = createAsyncThunk('meals/create', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token //thunkapi allows us to get local storage from anywhere
    return await goalService.createGoal(goalData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get user meals
export const getMeals = createAsyncThunk('meals/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token //thunkapi allows us to get local storage from anywhere
    return await goalService.getMeals(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//delete goal
export const deleteMeal = createAsyncThunk('meals/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token //thunkapi allows us to get local storage from anywhere
    return await goalService.deleteMeal(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    reset: (state) => initialState //can reset to intial states as we want to reset meals
    //we didnt do it in authslice as the user persists
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.meals.push(action.payload) //push payload into meals array
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMeals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.meals = action.payload //get meals via payload
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteMeal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        let index = state.meals.indexOf(action.payload)
        state.meals.splice(index, 0)
        console.log(index)
        //state.meals = state.meals.filter(
          //(goal) => goal._id !== action.payload.id
          //) //filter removes it form ui without nededing to reload page
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer