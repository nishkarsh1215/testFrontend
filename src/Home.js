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
  const [upperTextFontSize, setUpperTextFontSize] = useState('23px')
  const [extraUpperTextFontSize, setExtraUpperTextFontSize] = useState('23px')
  const [middleTextFontSize, setMiddleTextFontSize] = useState('23px')
  const [lowerTextFontSize, setLowerTextFontSize] = useState('23px')
  const [user, setUser] = useState(null)
  const [allCardsSwiped, setAllCardsSwiped] = useState(false)
  const [responses, setResponses] = useState([])
  const [questionsData, setQuestionsData] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])
  const upperTextArray = [
    'We, at Sanctity AI',
    'in which',
    'OF',
    'BY',
    'FOR',
    'We put ETHICS',
    'We foster a world',
    'We foster a world',
    'We foster a world',
    'We foster a world',
    'Now, we want to hear',
    '',
    'Our beta versions',
    'Signup for early',
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
    '',
    'are being rolled out',
    'access',
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
      console.log('Data updated successfully!')
    } catch (error) {
      console.error('Error updating data:', error.message)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
        console.log('Here are the updated ones')
        updateQuestionsData(copyObj)
        // updateQuestionsData(copyObj)
        setUser(currentUser)
        navigate('/card')
        //////////////////////checkpoint
        toast.success(`Welcome back, ${currentUser.displayName}`, {
          position: 'top-center',
        })
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [location.pathname, navigate, responses, questionsData, allCardsSwiped])

  const handleSwipe = (eventData) => {
    // swipeCount > 10 && !allCardsSwiped
    let newUpperText = ''
    let swipeVarCount = swipeCount
    if (!(swipeCount > 10 && !allCardsSwiped)) {
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
  }

  const handlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  useEffect(() => {
    Animate(swipeCount)
    console.log(swipeCount)
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
          setExtraUpperText(extraUpperTextArray[swipeCount])

          if (index === 2 || index === 3 || index === 4 || index === 5) {
            setTextUpperColor('white')
            setUpperTextFontSize('35px')
            gsap.fromTo(
              '.container-upper',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextUpperColor('black')
            setUpperTextFontSize('23px')
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
            index == 12 ||
            index == 13
          ) {
            setTextMiddleColor('white')
            setMiddleTextFontSize('35px')
            gsap.fromTo(
              '.container-middle',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextMiddleColor('black')
            setMiddleTextFontSize('23px')
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
            setLowerTextFontSize('35px')
            gsap.fromTo(
              '.container-lower',
              { scale: 5 },
              { scale: 1, duration: 0.5 },
            )
          } else {
            setTextLowerColor('black')
            setLowerTextFontSize('23px')
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
            setUpperTextFontSize('35px')
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
        setUpperTextFontSize('23px')
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
            setMiddleTextFontSize('35px')
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
        setMiddleTextFontSize('23px')
      }
    }
  }

  useEffect(() => {
    if (allCardsSwiped) {
      handleAllCardsSwiped()
    }
  }, [allCardsSwiped])

  const handleAllCardsSwiped = () => {
    console.log('All cards have been swiped! Running the function...')
    setUpperText('We are building products')
    setMiddleText('that empower')
    setLowerText('Humans')
    setTextLowerColor('white')
    // Add your logic here. This function will run when all cards are swiped.
  }

  const handleArrayFromAdvanced = (array) => {
    console.log('Array received from Advanced:', array)
    setResponses(array)
    // You can now use the array in the Home component
  }

  const handleArrayFromFinal = (array) => {
    console.log(array)
    setQuestionsData(array)
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

      {swipeCount > 10 && !allCardsSwiped ? (
        <Advanced
          onAllCardsSwiped={() => setAllCardsSwiped(true)}
          sendArray={handleArrayFromAdvanced}
          sendFinalArray={handleArrayFromFinal}
        />
      ) : (
        <MyThree swipeCount={swipeCount} />
      )}
      {swipeCount == 13 && allCardsSwiped && (
        <div className="fullscreen-container">
          <SignInwithGoogle />
        </div>
      )}
    </div>
  )
}

export default Home
