import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hexagon = () => {
  const svgRef = useRef(null)
  const dimamondRef = useRef(null)

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
    gsap.to(dimamondRef.current, {
      duration: 0.3,
      opacity: 0.5,
    })
    console.log('image hovered')
  }

  const ImageChangeOutHover = () => {
    gsap.to(dimamondRef.current, {
      duration: 0.3,
      opacity: 1,
    })
  }

  const radii = [40, 80, 120, 150, 200, 300, 350] // radii of concentric hexagons
  const strokeWidths = [3, 6, 9, 12, 15, 18, 21] // different stroke widths for each hexagon

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <svg ref={svgRef} viewBox="0 -150 400 700" className="hexagon-svg">
        {radii.map((r, index) => (
          <path
            key={index}
            d={createHexagonPath(200, 200, r)}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={strokeWidths[index]}
            className="hexagon"
          />
        ))}
        {/* Image centered in the SVG */}
        <image
          xlinkHref="/SANCTITY-LOGO.png"
          x="180"
          y="165"
          width="37.5"
          height="75"
          style={{ filter: 'invert(100%)' }}
        />
        <image
          xlinkHref="/DIAMOND.svg"
          ref={dimamondRef}
          className="DIAMOND"
          x="120"
          y="250"
          width="150"
          height="300"
          onMouseOver={ImageChangeOnHover}
          onMouseLeave={ImageChangeOutHover}
        />
        <text
          x="197.5"
          y="380"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="16"
          fontFamily="Black Ops One"
        >
          I
        </text>
        <text
          x="197.5"
          y="400"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="16"
          fontFamily="Black Ops One"
        >
          AM
        </text>
        <text
          x="197.5"
          y="420"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="16"
          fontFamily="Black Ops One"
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
