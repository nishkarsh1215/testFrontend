import React, { useState } from 'react'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler'

export const ScrollOne = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotationCount, setRotationCount] = useState(0)
  const colors = ['red', 'black', 'grey', 'blue', 'green']

  const nextIndex = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === colors.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const prevIndex = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? colors.length - 1 : prevIndex - 1,
    )
  }

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      nextIndex()
      setRotationCount((prevCount) => prevCount + 1)
    } else if (event.deltaY < 0) {
      prevIndex()
      setRotationCount((prevCount) => prevCount - 1)
    }
  }

  return (
    <div
      onWheel={handleWheel}
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: colors[currentIndex],
        transition: 'background-color .4s ease-out',
      }}
    >
      <h1>SCROLL FOR CHANGE BACKGROUND COLOR</h1>
      <h2>Rotation Count: {rotationCount}</h2>
    </div>
  )
}

export default ScrollOne
