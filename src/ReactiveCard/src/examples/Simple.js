import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import SignInwithGoogle from '../../../SignInwithGoogle'
import { toast, ToastContainer } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../LoginFirebase'
import { dbms } from '../../../LoginFirebase'
import { useNavigate } from 'react-router-dom'

// Array of questions with corresponding images
const dbs = [
  {
    name: 'Question1',
    url: './img/richard.jpg',
    question:
      'Do you believe AI can ever achieve true moral and ethical reasoning?',
  },
  {
    name: 'Question2',
    url: './img/erlich.jpg',
    question: 'Is it ethical to use AI in military applications?',
  },
  {
    name: 'Question3',
    url: './img/monica.jpg',
    question: 'Can AI be trusted to act in the best interest of humanity?',
  },
  {
    name: 'Question4',
    url: './img/jared.jpg',
    question:
      'Should AI be allowed to influence human decisions in healthcare?',
  },
  {
    name: 'Question5',
    url: './img/dinesh.jpg',
    question:
      'Should AI be allowed to influence human decisions in healthcare?',
  },
  {
    name: 'Question6',
    url: './img/dinesh.jpg',
    question:
      'Is it fair to use AI in law enforcement and criminal justice systems?',
  },
  {
    name: 'Question7',
    url: './img/dinesh.jpg',
    question:
      'Should AI have the ability to autonomously learn and evolve without human oversight?',
  },
  {
    name: 'Question8',
    url: './img/dinesh.jpg',
    question:
      'Can AI ever truly understand human emotions and ethical nuances?',
  },
]

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(dbs.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)
  const [user, setUser] = useState(null)
  const [signShow, setSignShow] = useState(false)
  const [questionsData, setQuestionsData] = useState([])
  const [start, setStart] = useState(false)
  const [responses, setResponses] = useState([])
  const navigate = useNavigate() // Initialize the navigate function

  ///////////////////////////////////////////////////////
  const fetchQuestionsData = async () => {
    try {
      const snapshot = await dbms.ref('questions').once('value')
      return snapshot.val()
    } catch (error) {
      console.error('Error fetching data:', error.message)
      throw error
    }
  }

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
    fetchQuestionsData()
      .then((questionsData) => {
        setQuestionsData(questionsData)
        setStart(true)
      })
      .catch((error) => {
        console.error('Error fetching questions data:', error)
      })
  }, [])

  // Handle user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        toast.success(`Welcome back, ${currentUser.displayName}`, {
          position: 'top-center',
        })
        /////////////////////////////////
        fetchQuestionsData()
          .then((questionsData) => {
            setQuestionsData(questionsData)
            let copyObj = [...questionsData]
            let i = 0
            for (let element of copyObj) {
              element.responses.push({
                [currentUser.displayName]: responses[i],
              }) // Example of adding {"nish": 0} to responses array
              ++i
            }
            console.log('here is updated ones')
            updateQuestionsData(copyObj)
            setQuestionsData(copyObj)
            console.log(copyObj)
          })
          .catch((error) => {
            console.error('Error fetching questions data:', error)
          })
        ////////////////////////////////

        //////////////////////#imp
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [navigate, responses])

  // Handle user authentication state

  const childRefs = useMemo(
    () =>
      Array(dbs.length)
        .fill(0)
        .map(() => React.createRef()),
    [],
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < dbs.length - 1
  const canSwipe = currentIndex >= 0

  const swiped = (direction, nameToDelete, index) => {
    let copyObj = [...questionsData]
    let newNumber = 0
    if (direction == 'left') {
      let extraLeft = copyObj[index].swipes.left
      ++extraLeft
      copyObj[index].swipes.left = extraLeft
      setQuestionsData(copyObj)
      newNumber = 0
    } else if (direction == 'right') {
      let extraRight = copyObj[index].swipes.right
      ++extraRight
      copyObj[index].swipes.right = extraRight
      setQuestionsData(copyObj)
      newNumber = 1
    } else if (direction == 'up') {
      let extraUp = copyObj[index].swipes.up
      ++extraUp
      copyObj[index].swipes.up = extraUp
      setQuestionsData(copyObj)
      newNumber = 2
    }
    console.log(copyObj)
    updateQuestionsData()
    ////////////////////////////////////////////
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses, newNumber]
      console.log('Updated responses:', updatedResponses)
      return updatedResponses
    })
    /////////////////////////////////
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    if (index - 1 < 0) {
      setSignShow(true)
      console.log('All cards are swiped')
    }
  }

  useEffect(() => {
    console.log('Responses updated:', responses)
  }, [responses])

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    if (currentIndexRef.current >= idx) {
      childRefs[idx].current.restoreCard()
    }
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < dbs.length) {
      await childRefs[currentIndex].current.swipe(dir)
    }
  }

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />

      {start && !signShow && (
        <div className="cardContainer">
          {dbs.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(to right, #888888, #eeeeee), url(${character.url})`,
                }}
                className="card"
              >
                <div className="question">
                  <p>{character.question}</p>
                </div>
                <div className="newText">
                  <p>←Swipe→</p>
                </div>
                <div className="answerOptions">
                  <div className="noOption">No</div>
                  <div className="yesOption">Yes</div>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
      )}

      {signShow && (
        <div>
          {user ? (
            <div>
              <div className="final-text">
                Do you want to see the views of others?
              </div>
              <button
                className="centered-button"
                onClick={() => navigate('/card')}
              >
                Let's Go
              </button>
            </div>
          ) : (
            <div>
              <div className="final-text">
                Subscribe to Sanctity's Newsletter & see Results
              </div>
              <SignInwithGoogle />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Advanced
