import { useEffect } from 'react'

const useInView = (ref: React.RefObject<HTMLElement>, onInView: () => void) => {
  useEffect(() => {
    if (!ref.current) return

    let observer: IntersectionObserver

    const createObserver = () => {
      if (!ref.current) return
      if (observer) observer.disconnect()

      const elementHeight = ref.current.getBoundingClientRect().height
      const viewportHeight = window.innerHeight
      const threshold = Math.min(1, viewportHeight / 2 / elementHeight + 0.01)

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onInView()
          }
        },
        { threshold }
      )

      observer.observe(ref.current)
    }

    createObserver()
    const handleResize = () => {
      createObserver()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (observer) observer.disconnect()
    }
  }, [ref, onInView])
}

export default useInView
