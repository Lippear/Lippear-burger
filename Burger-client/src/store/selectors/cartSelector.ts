import { RootState } from '../store'

export const selectCartAddedItems = (state: RootState) => state.cart.addedItems
