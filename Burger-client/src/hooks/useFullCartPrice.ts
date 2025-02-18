import { useSelector } from 'react-redux'
import { selectCartAddedItems } from '../store/selectors/cartSelector'
import Decimal from 'decimal.js'

const useFullCartPrice = () => {
  const addedItems = useSelector(selectCartAddedItems)
  let fullPrice: number = 0
  addedItems.forEach(item => {
    fullPrice += new Decimal(item.item.price).times(item.count).toNumber()
  })

  return fullPrice
}

export default useFullCartPrice
