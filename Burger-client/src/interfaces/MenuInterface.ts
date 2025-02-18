export interface MenuItem {
  name: string
  contents: string
  price: number
  oldPrice?: number
  image: string
}

export interface FullMenu {
  [category: string]: MenuItem[]
}
