import Cart from './Cart'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const backButtonClick = () => {
    if (location.pathname === '/cart') {
      navigate('/')
    } else if (location.pathname === '/checkout') {
      navigate('/cart')
    }
  }

  return (
    <header className="border-b-1 flex items-center justify-center border-black w-full h-[110px] relative">
      {(location.pathname === '/cart' || location.pathname === '/checkout') && (
        <button
          className="absolute top-[40px] left-[50px] w-[100px] h-[40px] cursor-pointer border-black border-2 rounded-[10px] hover:bg-gray-50"
          onClick={backButtonClick}
        >
          {'<---BACK'}
        </button>
      )}
      <div className="h-full flex items-center justify-center gap-10">
        <img src="/src/assets/images/burger-logo.png" className="h-[70%] aspect-[1/0.9]" alt="burger-logo" />
        <span className="text-[70px] text-orange-500 font-[Lobster] font-extrabold inline-block transform skew-x-[-6deg] text-shadow-lg">
          Lippear burger
        </span>
      </div>
      {location.pathname === '/' && <Cart />}
    </header>
  )
}

export default Header
