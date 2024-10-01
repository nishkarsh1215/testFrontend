import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import './Hexagon.css'
import ReactGA from 'react-ga4'

const Hexagon = () => {
  const svgRef = useRef(null)
  const diamondRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const hexagons = svgRef.current.querySelectorAll('.hexagon')

    hexagons.forEach((hexagon, index) => {
      const length = hexagon.getTotalLength()
      const halfLength = length / 2

      gsap.set(hexagon, {
        strokeDasharray: `${halfLength} ${length}`,
        strokeDashoffset: length,
      })

      if (index % 2 === 0) {
        // Clockwise animation for even indices
        gsap.to(hexagon, {
          strokeDashoffset: -halfLength,
          duration: 3, // Increased duration for slower animation
          delay: index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        })
      } else {
        // Counterclockwise animation for odd indices
        gsap.to(hexagon, {
          strokeDashoffset: halfLength,
          duration: 3, // Increased duration for slower animation
          delay: index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        })
      }
    })
  }, [])

  const ImageChangeOnHover = () => {
    gsap.to(diamondRef.current, {
      duration: 0.3,
      opacity: 0.5,
    })
  }

  const ImageChangeOutHover = () => {
    gsap.to(diamondRef.current, {
      duration: 0.3,
      opacity: 1,
    })
  }

  const ImageToHome = () => {
    ReactGA.event({
      category: 'I AM HUMAN BUTTON',
      action: 'Clicked on I AM HUMAN',
      label: 'MAIN PAGE',
    })
    navigate('/home')
  }

  const radii = [80, 100, 120, 150, 200, 260] // radii of concentric hexagons
  const strokeWidths = [3, 6, 9, 12, 15, 18] // different stroke widths for each hexagon

  return (
    <div className="hexagon-container">
      <svg ref={svgRef} viewBox="-300 -300 600 600" className="hexagon-svg">
        {radii.map((r, index) => (
          <path
            key={index}
            d={createHexagonPath(0, 0, r)}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={strokeWidths[index]}
            className="hexagon"
          />
        ))}
        {/* Centered logo in the SVG */}
        <image
          xlinkHref="https://raw.githubusercontent.com/nishkarsh1215/testFrontend/main/public/SANCTITY-LOGO.png"
          x="-75" // Center horizontally: (width / 2) = 150 / 2
          y="-150" // Center vertically: (height / 2) = 300 / 2
          width="150"
          height="300"
          className="invert-color"
        />
        {/* Diamond image positioned below the logo */}
        <image
          xlinkHref="https://raw.githubusercontent.com/nishkarsh1215/testFrontend/main/public/DIAMOND.svg"
          ref={diamondRef}
          className="DIAMOND"
          x="-75" // Center horizontally
          y="80" // Positioned below the logo. Adjust if needed.
          width="150"
          height="300"
          onMouseOver={ImageChangeOnHover}
          onMouseLeave={ImageChangeOutHover}
          onClick={ImageToHome}
        />
        {/* Centered text below the images */}
        <text
          x="0"
          y="210" // Adjusted to center the text below the images
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="16"
          fontFamily="Black Ops One"
          onClick={ImageToHome}
        >
          I
        </text>
        <text
          x="0"
          y="230" // Adjusted to center the text below the previous line
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="16"
          fontFamily="Black Ops One"
          onClick={ImageToHome}
        >
          AM
        </text>
        <text
          x="0"
          y="250" // Adjusted to center the text below the previous line
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="16"
          fontFamily="Black Ops One"
          onClick={ImageToHome}
        >
          HUMAN
        </text>
      </svg>
    </div>
  )
}

// Function to create hexagon path
function createHexagonPath(x, y, radius) {
  const sides = 6
  let pathData = `M ${x + radius} ${y}`

  for (let i = 1; i <= sides; i++) {
    const angle = (i / sides) * Math.PI * 2
    const nextX = x + radius * Math.cos(angle)
    const nextY = y + radius * Math.sin(angle)
    pathData += ` L ${nextX} ${nextY}`
  }

  pathData += ' Z'
  return pathData
}

export default Hexagon
