import { removeItemFromCart, setItemCountInCart } from '../../store/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { CartItem } from '../../interfaces/CartInterface'
import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import Decimal from 'decimal.js'

const ItemInCart = ({ item }: { item: CartItem }) => {
  const [inputValue, setInputValue] = useState<string>(String(item.count))
  const dispatch = useDispatch()
  const totalItemPrice = new Decimal(item.item.price).times(item.count)

  useEffect(() => {
    setInputValue(String(item.count))
  }, [item.count])

  const changeCount = (isPlusPressed: boolean) => {
    if (isPlusPressed) {
      item.count + 1 < 100 && dispatch(setItemCountInCart({ item: item.item, count: item.count + 1 }))
    } else {
      item.count - 1 > 0 && dispatch(setItemCountInCart({ item: item.item, count: item.count - 1 }))
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value
    inputValue = inputValue.replace(/\D/g, '')
    inputValue = inputValue.replace(/^0+/, '')
    inputValue = inputValue.slice(0, 2)
    if (Number(inputValue) >= 1 && Number(inputValue) < 100) {
      dispatch(setItemCountInCart({ item: item.item, count: Number(inputValue) }))
    }
    setInputValue(inputValue)
  }

  const onInputBlur = () => {
    if (inputValue === '') {
      dispatch(setItemCountInCart({ item: item.item, count: 1 }))
      setInputValue('1')
    }
  }

  return (
    <div className="w-[99%] h-[140px] relative border-b-1 border-black flex-shrink-0">
      <div className="absolute top-[10px] left-[10px] h-[120px] w-[120px] flex justify-center items-center">
        <img className="h-full w-auto object-contain" src={item.item.image} alt="image" />
      </div>
      <div className="absolute top-[15px] left-[140px] font-bold flex align-center gap-[15px]">
        <span>{item.item.name}</span>
        <span>{item.item.price}$/1</span>
      </div>

      <div className="absolute top-[50px] left-[140px] flex items-center gap-[5px]">
        <button
          onClick={() => changeCount(false)}
          className="bg-orange-300 text-white font-extrabold h-[35px] w-[35px] rounded-[50%] cursor-pointer hover:opacity-[0.8]"
        >
          -
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={event => handleInput(event)}
          onBlur={onInputBlur}
          className="h-[35px] w-[50px] text-center font-bold border-1 border-black rounded-[5px]"
        />
        <button
          onClick={() => changeCount(true)}
          className="bg-orange-300 text-white font-extrabold h-[35px] w-[35px] rounded-[50%] cursor-pointer hover:opacity-[0.8]"
        >
          +
        </button>
      </div>
      <span className="absolute top-[19px] left-[520px] font-bold text-[20px]">
        Total :{inputValue !== '' && `${String(totalItemPrice)}$`}
      </span>
      <button
        onClick={() => dispatch(removeItemFromCart(item.item))}
        className="h-[40px] w-[40px] absolute top-[15px] right-[10px] rounded-[50%] flex items-center justify-center cursor-pointer hover:bg-gray-300"
      >
        <FaTrashAlt className="h-[40%] w-[40%]" />
      </button>
    </div>
  )
}
export default ItemInCart
