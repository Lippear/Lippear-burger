import useInView from '../../hooks/useInViewCustom'
import PageMenuItem from './PageMenuItem'
import { useRef } from 'react'
import { MenuItem } from '../../interfaces/MenuInterface'

const CategorySection = ({
  category,
  items,
  index,
  setActiveCategoryIndex,
}: {
  category: string
  items: MenuItem[]
  index: number
  setActiveCategoryIndex: (index: number) => void
}) => {
  const categorySectionRef = useRef<HTMLElement>(null as unknown as HTMLElement)

  useInView(categorySectionRef, () => setActiveCategoryIndex(index))

  return (
    <section id={category} ref={categorySectionRef}>
      <h2 className="my-[40px] ml-40 text-[25px] capitalize font-bold">{category}</h2>
      <div className="flex flex-col gap-[20px] p-[10px]">
        {items.map(item => (
          <PageMenuItem key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}

export default CategorySection
