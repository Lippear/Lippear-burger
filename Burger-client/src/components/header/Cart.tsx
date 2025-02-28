import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartAddedItems } from '../../store/selectors/cartSelector'
import useClickOutside from '../../hooks/useClickOutside'
import { MenuItem } from '../../interfaces/MenuInterface'
import { removeItemFromCart } from '../../store/slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Cart = () => {
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false)
  const cartRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(cartRef, () => setIsCartMenuOpen(false))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addedItems: MenuItem[] = useSelector(selectCartAddedItems).map(cartItem => cartItem.item)

  const CartMenu = () => {
    return (
      <motion.div
        initial={{ scale: 0, x: 120, y: -130 }}
        animate={{ scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-[300px] absolute h-[320px] top-[45px] right-[0] rounded-[10px] border-black border-2 bg-white"
      >
        <div className="flex flex-col items-center gap-[5px] h-[250px] overflow-y-auto mt-[10px] scrollbar-custom">
          {addedItems.reverse().map(item => {
            return (
              <div className="h-[70px] w-[270px] relative border-b-[1px] border-black flex-shrink-0" key={item.name}>
                <div className="absolute top-[5px] left-0 h-[60px] w-[60px] flex justify-center items-center">
                  <img className="h-full w-auto object-contain" src={item.image} alt="image" />
                </div>
                <span className="absolute top-[8px] left-[70px]">{item.name}</span>
                <span className="absolute top-[30px] left-[70px]">{item.price}$</span>
                <button
                  onClick={() => dispatch(removeItemFromCart(item))}
                  className="h-[40px] w-[40px] absolute top-[15px] right-[5px] rounded-[50%] flex items-center justify-center cursor-pointer hover:bg-gray-300"
                >
                  <FaTrashAlt className="h-[40%] w-[40%]" />
                </button>
              </div>
            )
          })}
        </div>
        <div className="flex justify-center items-center h-[60px]">
          <button
            onClick={() => navigate('/cart')}
            className="h-[40px] w-[100px] bg-amber-500 text-white rounded-[10px] cursor-pointer hover:opacity-[0.8]"
          >
            To cart
          </button>
        </div>{' '}
      </motion.div>
    )
  }

  return (
    <div className="absolute w-[40px] h-[40px] top-[35%] right-[40px] z-[100]" ref={cartRef}>
      <button className="w-[100%] h-[100%] cursor-pointer" onClick={() => setIsCartMenuOpen(prev => !prev)}>
        <FaShoppingCart className="w-[100%] h-[100%]" />
        {!isCartMenuOpen && addedItems.length > 0 && (
          <div className="absolute top-[27px] right-[17px] w-[30px] h-[30px] rounded-[50%] border-black border-2 text-center bg-white">
            {addedItems.length}
          </div>
        )}
      </button>

      {isCartMenuOpen &&
        (addedItems.length > 0 ? (
          <CartMenu />
        ) : (
          <div className="w-[130px] absolute h-[50px] top-[45px] right-[0] rounded-[10px] border-black border-2 bg-white text-center p-[10px]">
            Cart is empty
          </div>
        ))}
    </div>
  )
}

export default Cart
