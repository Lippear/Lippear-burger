import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FullMenu } from '../../interfaces/MenuInterface'
import { FetchMenu } from '../thunks/fetchMenu'

interface MenuState {
  menu: FullMenu | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: MenuState = {
  menu: null,
  status: 'idle',
  error: null,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(FetchMenu.pending, state => {
        state.status = 'loading'
      })
      .addCase(FetchMenu.fulfilled, (state, action: PayloadAction<FullMenu>) => {
        state.status = 'succeeded'
        state.menu = action.payload
      })
      .addCase(FetchMenu.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.payload)
      })
  },
})

export default menuSlice.reducer
