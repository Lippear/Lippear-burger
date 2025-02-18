import Header from '../../components/header/Header'
import { useState, useEffect, use } from 'react'
import { User } from '../../interfaces/FormInterface'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartAddedItems } from '../../store/selectors/cartSelector'
import { clearCart } from '../../store/slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CheckOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addedItems = useSelector(selectCartAddedItems)
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    street: '',
    callToUser: true,
    comments: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(clearCart())
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    try {
      const response = await axios.post('http://localhost:3500/api/order', { user, addedItems })
      console.log(response.data)
    } catch (error: any) {
      throw new Error(error.response?.data.message || 'Something went wrong')
    }

    navigate('/')
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const setIsCallToUser = (value: boolean) => {
    setUser({ ...user, callToUser: value })
  }

  const resetUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setUser({
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      street: '',
      callToUser: true,
      comments: '',
    })
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <>
      <Header />
      <form className="flex flex-col w-[500px] mx-auto my-[30px] relative" onSubmit={event => handleSubmit(event)}>
        <button
          onClick={event => resetUser(event)}
          className="absolute top-[23px] right-[-150px] w-[100px] font-bold text-[17px] h-[55px] text-black cursor-pointer bg-white rounded-[10px] hover:bg-black hover:text-white border-2 border-black"
        >
          Clear form
        </button>

        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          value={user.firstName}
          onChange={event => setUser({ ...user, firstName: event.target.value })}
          id="first-name"
          name="first-name"
          className="border p-2 mb-4"
          autoComplete="off"
          required
        />

        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          onChange={event => setUser({ ...user, lastName: event.target.value })}
          value={user.lastName}
          id="last-name"
          name="last-name"
          className="border p-2 mb-4"
          autoComplete="off"
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          value={user.phone}
          onChange={event => setUser({ ...user, phone: event.target.value })}
          id="phone"
          name="phone"
          className="border p-2 mb-4"
          autoComplete="off"
          required
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          value={user.city}
          onChange={event => setUser({ ...user, city: event.target.value })}
          id="city"
          name="city"
          className="border p-2 mb-4"
          autoComplete="off"
          required
        />

        <label htmlFor="street">Street:</label>
        <input
          type="text"
          value={user.street}
          onChange={event => setUser({ ...user, street: event.target.value })}
          id="street"
          name="street"
          className="border p-2 mb-4"
          autoComplete="off"
          required
        />

        <div className="flex justify-around w-[80%] mb-4 mx-auto bg-white rounded-lg shadow p-4">
          <label
            htmlFor="call-me"
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="radio"
              checked={user.callToUser}
              onChange={() => setIsCallToUser(true)}
              id="call-me"
              name="call-preference"
              className="mr-2 w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-orange-500 checked:border-orange-500 focus:ring-0 cursor-pointer"
            />
            Call me
          </label>
          <label
            htmlFor="no-call"
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="radio"
              checked={!user.callToUser}
              onChange={() => setIsCallToUser(false)}
              id="no-call"
              name="call-preference"
              className="mr-2 w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-orange-500 checked:border-orange-500 focus:ring-0 cursor-pointer"
            />
            Don't call me
          </label>
        </div>

        <label htmlFor="comments">Comments:</label>
        <textarea
          id="comments"
          value={user.comments}
          onChange={event => setUser({ ...user, comments: event.target.value })}
          name="comments"
          rows={4}
          autoComplete="off"
          className="border p-2 mb-4"
        ></textarea>

        <button
          type="submit"
          className="bg-orange-300 text-white font-bold rounded-[10px] p-2 cursor-pointer hover:opacity-[0.8]"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default CheckOut
