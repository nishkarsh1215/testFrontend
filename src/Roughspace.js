import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import './App.css'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import MyThree from './MyThree'
import Advanced from './ReactiveCard/src/examples/Advanced'

const Home = () => {
  const [upperText, setUpperText] = useState('')
  const [middleText, setMiddleText] = useState('')
  const [lowerText, setLowerText] = useState('')
  const [extraUpperText, setExtraUpperText] = useState('')

  const [swipeCount, setSwipeCount] = useState(0)
  const [textUpperColor, setTextUpperColor] = useState('black') // State variable for text color
  const [textMiddleColor, setTextMiddleColor] = useState('black') // State variable for text color
  const [textLowerColor, setTextLowerColor] = useState('black') // State variable for text color
  const [upperTextWhiteSpace, setUpperTextWhiteSpace] = useState('nowrap') // State variable for white-space
  const [upperTextFontSize, setUpperTextFontSize] = useState('25px')
  const [extraUpperTextFontSize, setExtraUpperTextFontSize] = useState('25px')
  const [middleTextFontSize, setMiddleTextFontSize] = useState('25px')
  const [lowerTextFontSize, setLowerTextFontSize] = useState('25px')
  const upperTextArray = [
    'We, at Sanctity AI',
    'in which',
    'OF',
    'BY',
    'FOR',
    'We put ETHICS',
    'We foster a world in which use of AI is',
    'We foster a world in which use of AI is',
    'We foster a world in which use of AI is',
    'We foster a world in which use of AI is',
    'Now, we want to hear',
  ]
  const extraUpperTextArray = [
    '',
    '',
    '',
    '',
    '',
    '',
    'in which use of AI is',
    'in which use of AI is',
    'in which use of AI is',
    'in which use of AI is',
    '',
  ]
  const middleTextArray = [
    'are enabling an',
    'AI',
    'the',
    'the',
    'the',
    'first in everything',
    'SAFE',
    'RELIABLE',
    'INVIOLABLE',
    'RESPONSIBLE',
    'from',
  ]
  const lowerTextArray = [
    'ECOSYSTEM',
    'is',
    'HUMANS',
    'HUMANS',
    'HUMANS',
    'we build',
    'for HUMANS',
    'for HUMANS',
    'for HUMANS',
    'for HUMANS',
    'YOU',
  ]

  const handleSwipe = (eventData) => {
    let newUpperText = ''
    let swipeVarCount = swipeCount
    if (eventData.dir === 'Left') {
      newUpperText = 'Swiped Left!'
    } else if (eventData.dir === 'Right') {
      newUpperText = 'Swiped Right!'
    } else if (eventData.dir === 'Up') {
      ++swipeVarCount
      setSwipeCount(swipeVarCount)
      newUpperText = 'Swiped Up!'
    } else if (eventData.dir === 'Down') {
      --swipeVarCount
      if (swipeVarCount <= 0) {
        setSwipeCount(0)
      } else {
        setSwipeCount(swipeVarCount)
      }
      newUpperText = 'Swiped Down!'
    }
  }

  const handlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  useEffect(() => {
    if (
      swipeCount == 6 ||
      swipeCount == 7 ||
      swipeCount == 8 ||
      swipeCount == 9
    ) {
      setUpperTextWhiteSpace('normal')
    }
    Animate(swipeCount)
  }, [swipeCount])

  const Animate = (index) => {
    const skipAnimation =
      index === 3 || index === 4 || index === 7 || index === 8 || index === 9

    if (!skipAnimation) {
      gsap.to('.container-upper', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setUpperText(upperTextArray[index])
          if (index == 2 || index == 3 || index == 4 || index == 5) {
            setTextUpperColor('white')
            gsap.fromTo(
              '.container-upper',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextUpperColor('black')
          }
          gsap.to('.container-upper', { opacity: 1, duration: 0.5 })
        },
      })

      gsap.to('.container-middle', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setMiddleText(middleTextArray[index])
          if (
            index == 1 ||
            index == 6 ||
            index == 7 ||
            index == 8 ||
            index == 9
          ) {
            setTextMiddleColor('white')
            gsap.fromTo(
              '.container-middle',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextMiddleColor('black')
          }
          gsap.to('.container-middle', { opacity: 1, duration: 0.5 })
        },
      })

      gsap.to('.container-lower', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setLowerText(lowerTextArray[index])
          if (index == 0 || index == 10) {
            setTextLowerColor('white')
            gsap.fromTo(
              '.container-lower',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextLowerColor('black')
          }
          gsap.to('.container-lower', { opacity: 1, duration: 0.5 })
        },
      })
    } else {
      // Set the texts without animations

      setLowerText(lowerTextArray[index])

      if (index == 3 || index == 4) {
        ///////////////////////////////////////////
        gsap.to('.container-upper', {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setUpperText(upperTextArray[index])
            setTextUpperColor('white')
            gsap.fromTo(
              '.container-upper',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
            gsap.to('.container-upper', { opacity: 1, duration: 0.5 })
          },
        })
        /////////////////////////////////////
      } else {
        setTextUpperColor('black')
      }
      //////////////
      if (index == 7 || index == 8 || index == 9) {
        //////////////////////////////////////////////////
        gsap.to('.container-middle', {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setMiddleText(middleTextArray[index])
            setTextMiddleColor('white')
            gsap.fromTo(
              '.container-middle',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
            gsap.to('.container-middle', { opacity: 1, duration: 0.5 })
          },
        })
        ////////////////////////////////////////////////////
      } else {
        setTextMiddleColor('black')
      }
    }
  }

  return (
    <div className="spline-container" {...handlers}>
      <div className="overlay-text">
        <div
          className="container-upper"
          style={{
            color: textUpperColor,
            whiteSpace: upperTextWhiteSpace,
            fontSize: upperTextFontSize,
          }}
        >
          {upperText}
        </div>
        <div
          className="container-upper"
          style={{ fontSize: extraUpperTextFontSize }}
        >
          {extraUpperText}
        </div>

        <div
          className="container-middle"
          style={{ color: textMiddleColor, fontSize: middleTextFontSize }}
        >
          {middleText}
        </div>
        <div
          className="container-lower"
          style={{ color: textLowerColor, fontSize: lowerTextFontSize }}
        >
          {lowerText}
        </div>
      </div>
      {swipeCount > 10 && <Advanced />}
      <MyThree />
    </div>
  )
}

export default Home

/////////////////////////
///////////////////////////////////////////////////
