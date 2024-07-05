import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MyComponent.css' // Make sure to create this CSS file with the styles provided

gsap.registerPlugin(ScrollTrigger)

const MyComponent = () => {
  const racesRef = useRef(null)
  const racesWrapperRef = useRef(null)

  useEffect(() => {
    const races = racesRef.current

    function getScrollAmount() {
      let racesWidth = races.scrollWidth
      return -(racesWidth - window.innerWidth)
    }

    const tween = gsap.to(races, {
      x: getScrollAmount,
      duration: 3,
      ease: 'none',
    })

    ScrollTrigger.create({
      trigger: racesWrapperRef.current,
      start: 'top 20%',
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      markers: true,
    })

    // Clean up on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.killTweensOf(races)
    }
  }, [])

  return (
    <div>
      <div className="space-50vh lightBG"></div>

      <div className="racesWrapper" ref={racesWrapperRef}>
        <div className="races" ref={racesRef}>
          <h2>Monaco</h2>
          <h2>Austria</h2>
          <h2>Hungary</h2>
          <h2>Netherlands</h2>
          <h2>Japan</h2>
        </div>
      </div>

      <div className="space-100vh lightBG"></div>
    </div>
  )
}

export default MyComponent
