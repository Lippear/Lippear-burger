import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectCartAddedItems } from '../../store/selectors/cartSelector'
import { addItemToCart, removeItemFromCart } from '../../store/slices/cartSlice'
import { MenuItem } from '../../interfaces/MenuInterface'

const PageMenuItem = ({ item }: { item: MenuItem }) => {
  const isInCart: boolean = useSelector(selectCartAddedItems).some(cartItem => cartItem.item.name === item.name)
  const dispatch = useDispatch()

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.5, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 100 }}
      transition={{ duration: 0.7 }}
      className="w-full h-[150px] rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-white relative"
    >
      <div className="absolute top-[15px] left-[10px] h-[120px] w-[120px] flex justify-center items-center">
        <img className="h-full w-auto object-contain" src={item.image} alt="image" />
      </div>
      <span className="text-[25px] capitalize font-bold absolute top-[15px] left-[140px]">{item.name}</span>
      <span className="absolute top-[50px] left-[140px] w-[300px] break-words">{item.contents}</span>
      <div
        className={`${
          item.oldPrice ? 'bg-red-500' : 'bg-green-500'
        } absolute top-[60px] right-[140px] w-[80px] h-[40px] flex items-center justify-center gap-[5px] text-white font-bold rounded-[10px]`}
      >
        <span>{item.price}$</span>
        {!!item.oldPrice && <span className="line-through text-[13px]">{item.oldPrice}$</span>}
      </div>
      <button
        onClick={!isInCart ? () => dispatch(addItemToCart(item)) : () => dispatch(removeItemFromCart(item))}
        className={`${
          isInCart ? 'bg-blue-500' : 'bg-orange-500'
        } absolute top-[53px] right-[30px] w-[80px] h-[50px] rounded-[10px] text-[30px] font-extrabold text-center text-white hover:opacity-80 cursor-pointer`}
      >
        {isInCart ? '-' : '+'}
      </button>
    </motion.div>
  )
}

export default PageMenuItem
