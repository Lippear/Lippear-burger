import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { selectMenu } from '../../store/selectors/menuSelector'
import { useState } from 'react'
import CategorySection from './CategorySection'

const Main = () => {
  const menu = useSelector(selectMenu)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0)

  if (!menu) return <div>Loading...</div>

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -30
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      <nav className="sticky top-[20px] flex items-center justify-center gap-[50px] mx-auto my-[40px] w-[800px] h-[80px] border-2 border-black rounded-[10px] z-10 bg-white">
        {Object.keys(menu).map((key, index) => (
          <button
            onClick={() => {
              scrollToCategory(key)
            }}
            key={key}
            className={`${
              activeCategoryIndex === index && 'border-b-2 border-black'
            } w-[110px] h-[40px] cursor-pointer text-[25px] capitalize font-bold`}
          >
            {key}
          </button>
        ))}
      </nav>
      <div className="mt-[20px] mb-12 mx-auto w-[800px] overflow-hidden">
        {Object.entries(menu).map(([category, items], index) => (
          <CategorySection
            key={category}
            category={category}
            items={items}
            index={index}
            setActiveCategoryIndex={setActiveCategoryIndex}
          />
        ))}
      </div>
    </>
  )
}

export default Main
