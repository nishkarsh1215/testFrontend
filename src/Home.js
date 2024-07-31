import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import { auth } from './LoginFirebase'
import { dbms } from './LoginFirebase'
import { gsap } from 'gsap'
import { toast, ToastContainer } from 'react-toastify'
import MyThree from './MyThree'
import Advanced from './ReactiveCard/src/examples/Advanced'
import { onAuthStateChanged } from 'firebase/auth'
import AdvancedResults from './ReactiveCard/src/examples/AdvancedResults'
import SignInwithGoogle from './SignInwithGoogle'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler'

const Home = () => {
  const navigate = useNavigate() // Initialize useNavigate
  const location = useLocation()
  const [upperText, setUpperText] = useState('')
  const [middleText, setMiddleText] = useState('')
  const [lowerText, setLowerText] = useState('')
  const [extraUpperText, setExtraUpperText] = useState('')
  const [sideText, setSideText] = useState('')

  const [swipeCount, setSwipeCount] = useState(0)
  const [textUpperColor, setTextUpperColor] = useState('black') // State variable for text color
  const [textMiddleColor, setTextMiddleColor] = useState('black') // State variable for text color
  const [textLowerColor, setTextLowerColor] = useState('black') // State variable for text color
  const [upperTextWhiteSpace, setUpperTextWhiteSpace] = useState('nowrap') // State variable for white-space
  const [upperTextFontSize, setUpperTextFontSize] = useState('100%')
  const [extraUpperTextFontSize, setExtraUpperTextFontSize] = useState('100%')
  const [middleTextFontSize, setMiddleTextFontSize] = useState('100%')
  const [lowerTextFontSize, setLowerTextFontSize] = useState('100%')
  const [user, setUser] = useState(null)
  const [allCardsSwiped, setAllCardsSwiped] = useState(false)
  const [responses, setResponses] = useState([])
  const [questionsData, setQuestionsData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotationCount, setRotationCount] = useState(0)
  const colors = ['red', 'black', 'grey', 'blue', 'green']

  const isMobile = window.matchMedia('(max-width: 768px)').matches

  const upperTextArray = [
    'We, at Sanctity AI', //0
    'in which', //1
    'OF',
    'BY',
    'FOR',
    'ETHICS',
    'in which use of AI is',
    'in which use of AI is',
    'in which use of AI is',
    'in which use of AI is',
    'Now, we want to hear',
    '',
    'are being rolled out',
    'access',
  ]
  const extraUpperTextArray = [
    '',
    '',
    '',
    '',
    '',
    'We put ',
    'We foster a world',
    'We foster a world',
    'We foster a world',
    'We foster a world',
    '',
    '',
    'Our beta versions',
    'Signup for early',
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
    '',
    '',
    '',
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
    '',
    '',
    '',
  ]

  const updateQuestionsData = async (updatedData) => {
    try {
      await dbms.ref('questions').set(updatedData)
    } catch (error) {
      console.error('Error updating data:', error.message)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
      if (currentUser && location.pathname === '/home' && allCardsSwiped) {
        let dummyArr = [...responses]
        let copyObj = [...questionsData]
        let i = 0
        for (let element of copyObj) {
          element.responses.push({
            [currentUser.displayName]: responses[i],
          }) // Example of adding {"nish": 0} to responses array
          ++i
        }

        updateQuestionsData(copyObj)
        // updateQuestionsData(copyObj)
        setUser(currentUser)
        // navigate('/card')
        //////////////////////checkpoint
        toast.success(`Welcome back, ${currentUser.displayName}`, {
          position: 'top-center',
        })
      }
    })
    return () => unsubscribe()
  }, [
    location.pathname,
    navigate,
    responses,
    questionsData,
    allCardsSwiped,
    user,
  ])

  const handleSwipe = (eventData) => {
    // swipeCount > 10 && !allCardsSwiped
    let newUpperText = ''
    let swipeVarCount = swipeCount
    if (!(swipeCount > 10 && !allCardsSwiped && !user) && swipeCount <= 12) {
      if (eventData.dir === 'Left') {
      } else if (eventData.dir === 'Right') {
      } else if (eventData.dir === 'Up') {
        ++swipeVarCount
        setSwipeCount(swipeVarCount)
        newUpperText = 'Swiped Up!'
      } else if (eventData.dir === 'Down') {
      }
    }
  }

  const handlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  useEffect(() => {
    if (swipeCount == 11) {
      setRotationCount(11)
    }
    if (!(!allCardsSwiped && !user) && swipeCount == 11) {
      {
        setUpperText('We are building products')
        setMiddleText('that empower')
        setLowerText('Humans')
        setTextLowerColor('white')
      }
    } else {
      Animate(swipeCount)
    }
  }, [swipeCount])

  const Animate = (index) => {
    const skipAnimation =
      index === 3 || index === 4 || index === 7 || index === 8 || index === 9

    if (!skipAnimation) {
      //////////////extra

      ////////////////////
      gsap.to('.container-upper', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (user && index == 13) {
            setUpperText('signed in')
            setExtraUpperText('Congrats, you are')
            setUpperTextFontSize('180%')
          } else {
            setUpperText(upperTextArray[index])
            setExtraUpperText(extraUpperTextArray[swipeCount])
            setUpperTextFontSize('180%')
          }

          if (index === 2 || index === 3 || index === 4 || index === 5) {
            setTextUpperColor('white')
            setUpperTextFontSize('180%')
            setExtraUpperText(extraUpperTextArray[index])
            gsap.fromTo(
              '.container-upper',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextUpperColor('black')
            setUpperTextFontSize('100%')
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
            index == 9 ||
            index == 13
          ) {
            setTextMiddleColor('white')
            setMiddleTextFontSize('180%')
            gsap.fromTo(
              '.container-middle',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextMiddleColor('black')
            setMiddleTextFontSize('100%')
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
            setLowerTextFontSize('180%')
            gsap.fromTo(
              '.container-lower',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextLowerColor('black')
            setLowerTextFontSize('100%')
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
            setUpperTextFontSize('180%')
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
        setUpperTextFontSize('100%')
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
            setMiddleTextFontSize('180%')
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
        setMiddleTextFontSize('100%')
      }
    }
  }

  useEffect(() => {
    if (allCardsSwiped) {
      handleAllCardsSwiped()
    }
  }, [allCardsSwiped])

  const handleAllCardsSwiped = () => {
    setUpperTextFontSize('100%')
    setExtraUpperTextFontSize('100%')
    setMiddleTextFontSize('100%')
    setLowerTextFontSize('180%')

    setUpperText('We are building products')
    setMiddleText('that empower')
    setLowerText('Humans')
    setTextLowerColor('white')

    // Add your logic here. This function will run when all cards are swiped.
  }

  const handleArrayFromAdvanced = (array) => {
    setResponses(array)
    // You can now use the array in the Home component
  }

  const handleArrayFromFinal = (array) => {
    setQuestionsData(array)
  }

  const handleButtonClick = () => {
    navigate('/card')
  }

  useEffect(() => {
    if (rotationCount == 1) {
      setSwipeCount(1)
    } else if (rotationCount == 2) {
      setSwipeCount(2)
    } else if (rotationCount == 3) {
      setSwipeCount(3)
    } else if (rotationCount == 4) {
      setSwipeCount(4)
    } else if (rotationCount == 5) {
      setSwipeCount(5)
    } else if (rotationCount == 6) {
      setSwipeCount(6)
    } else if (rotationCount == 7) {
      setSwipeCount(7)
    } else if (rotationCount == 8) {
      setSwipeCount(8)
    } else if (rotationCount == 9) {
      setSwipeCount(9)
    } else if (rotationCount == 10) {
      setSwipeCount(10)
    } else if (rotationCount == 11) {
      setSwipeCount(11)
    } else if (rotationCount == 12) {
      setSwipeCount(12)
    } else if (rotationCount == 13) {
      setSwipeCount(13)
    }
  }, [rotationCount])

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
    if (!(swipeCount > 10 && !allCardsSwiped && !user)) {
      if (!(rotationCount - 1 > 10 && !allCardsSwiped && !user)) {
        setRotationCount((prevCount) => prevCount + 1)
      } else {
      }
    }
  }

  return (
    <ReactScrollWheelHandler
      // upHandler={(e) => console.log('scroll up')}
      downHandler={handleWheel}
    >
      <div className="spline-container" {...handlers}>
        <div className="overlay-text">
          <div
            className="container-upper-extra"
            style={{ fontSize: extraUpperTextFontSize }}
          >
            {extraUpperText}
          </div>
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

        {swipeCount > 10 && !allCardsSwiped && !user ? (
          <Advanced
            onAllCardsSwiped={() => setAllCardsSwiped(true)}
            sendArray={handleArrayFromAdvanced}
            sendFinalArray={handleArrayFromFinal}
          />
        ) : (
          <MyThree swipeCount={swipeCount} />
        )}

        {swipeCount === 13 &&
          (!user && allCardsSwiped ? (
            <div className="fullscreen-container">
              <SignInwithGoogle />
            </div>
          ) : (
            <div className="fullscreen-container">
              <button
                onClick={handleButtonClick}
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  fontFamily: 'Black Ops One',
                  fontSize: '16px', // Adjust the font size as needed
                }}
              >
                Let's view results
              </button>
            </div>
          ))}
      </div>
    </ReactScrollWheelHandler>
  )
}

export default Home
