import { MenuItem } from './MenuInterface'

export interface CartItem {
  item: MenuItem
  count: number
}

export interface CartState {
    addedItems: CartItem[]
  }
