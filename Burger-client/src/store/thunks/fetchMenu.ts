import { createAsyncThunk } from '@reduxjs/toolkit'
import { FullMenu } from '../../interfaces/MenuInterface'
import axios from 'axios'

export const FetchMenu = createAsyncThunk<FullMenu, void, { rejectValue: string }>('nemu/fetchMenu', async () => {
  try {
    const response = await axios.get('http://localhost:3500/api/menu')
    return response.data as FullMenu
  } catch (error: any) {
    throw new Error(error.response?.data.massage)
  }
})
