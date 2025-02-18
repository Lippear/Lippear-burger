import Header from '../../components/header/Header'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartAddedItems } from '../../store/selectors/cartSelector'
import ItemInCart from './ItemInCart'
import { useNavigate } from 'react-router-dom'
import useFullCartPrice from '../../hooks/useFullCartPrice'
import { clearCart } from '../../store/slices/cartSlice'

const Cart = () => {
  const addedItems = useSelector(selectCartAddedItems)
  const navigate = useNavigate()
  const fullPrice = useFullCartPrice()
  const dispatch = useDispatch()

  addedItems.length === 0 && navigate('/')

  return (
    <>
      <Header />
      <div className="h-[450px] w-[700px] mx-auto mt-[50px] flex flex-col items-center overflow-y-auto  scrollbar-custom py-[10px]">
        {addedItems
          .slice()
          .reverse()
          .map(addedItem => (
            <ItemInCart item={addedItem} key={addedItem.item.name} />
          ))}
      </div>
      <div className="flex justify-center items-center p-[20px]">
        <div className="flex justify-between items-center w-[700px]">
          <span className="w-[240px] text-[20px] font-bold">Total cart price : {fullPrice}$</span>
          <button onClick={()=>navigate('/checkout')} className="w-[170px] h-[50px] text-[20px] font-bold rounded-[10px] text-white bg-orange-300 cursor-pointer hover:opacity-[0.85]">
            Go to checkOut
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="w-[150px] h-[50px] cursor-pointer hover:border-2 border-black"
          >
            Clear cart
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
