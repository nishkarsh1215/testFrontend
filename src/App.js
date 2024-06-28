import React, { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import gsap from 'gsap'
import './App.css' // Make sure to import the CSS file

export const Homes = () => {
  const cube = useRef()
  const text1 = useRef()
  const text2 = useRef()
  const additionalText1 = useRef()
  const additionalText2 = useRef()
  const [scrollCount, setScrollCount] = useState(0)

  const onLoad = (spline) => {
    const obj = spline.findObjectByName('Bot')
    // save it in a ref for later use
    cube.current = obj
  }

  const moveObj = (event) => {
    if (cube.current) {
      const newScrollCount = scrollCount + event.deltaY
      setScrollCount(newScrollCount)

      if (newScrollCount <= 250) {
        // Move the object in 3D space
        cube.current.position.x += event.deltaY * 0.1 // Adjust the multiplier as needed
      } else {
        // Rotate the object after 5 scrolls
        cube.current.rotation.y += event.deltaY * 0.01 // Adjust the multiplier as needed
      }

      // Update text opacity and scale based on scroll count
      const fadeOutProgress = Math.min(Math.max(newScrollCount / 250, 0), 1)
      const fadeInProgress = Math.min(
        Math.max((newScrollCount - 250) / 250, 0),
        1,
      )
      gsap.to(text1.current, {
        opacity: 1 - fadeOutProgress,
        scale: 1 - fadeOutProgress * 0.2,
        duration: 0.5,
      })
      gsap.to(text2.current, {
        opacity: fadeInProgress,
        scale: 0.8 + fadeInProgress * 0.2,
        duration: 0.5,
      })
    }
  }

  useEffect(() => {
    const handleWheel = (event) => {
      moveObj(event)
    }

    window.addEventListener('wheel', handleWheel)
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [scrollCount])

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const timeline = gsap.timeline()
    timeline
      .fromTo(
        text1.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 2.5, duration: 1 },
      )
      .to(text1.current, { scale: 1, duration: 0.5, delay: 1 })

    return () => {
      // Re-enable scrolling when the component is unmounted
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="spline-container">
      <div className="overlay-text" ref={text1}>
        <h1>Your Text Here</h1>
        <p ref={additionalText1}>Additional text can go here.</p>
      </div>
      <div className="overlay-text" ref={text2} style={{ opacity: 0 }}>
        <h1>Next Text Here</h1>
        <p ref={additionalText2}>Additional text can go here.</p>
      </div>
      <Spline
        scene="https://prod.spline.design/ICfxvVH76iR2fZrJ/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  )
}

export default Homes
