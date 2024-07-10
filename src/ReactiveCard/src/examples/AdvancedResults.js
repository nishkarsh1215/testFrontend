import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import SignInwithGoogle from '../../../SignInwithGoogle'
import { toast, ToastContainer } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../LoginFirebase'
import { dbms } from '../../../LoginFirebase'
import ArcDesign from './ArcDesign'
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

function AdvancedResults() {
  const [currentIndex, setCurrentIndex] = useState(dbs.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)
  const [user, setUser] = useState(null)
  const [signShow, setSignShow] = useState(false)
  const [questionsData, setQuestionsData] = useState([])
  const [formattedArray, setFormattedArray] = useState([])
  const [start, setStart] = useState(true)
  const [showProduct, setShowProduct] = useState(false)
  const navigate = useNavigate()

  const fetchQuestionsData = async () => {
    try {
      const snapshot = await dbms.ref('questions').once('value')
      return snapshot.val()
    } catch (error) {
      console.error('Error fetching data:', error.message)
      throw error
    }
  }

  useEffect(() => {
    fetchQuestionsData()
      .then((questionsData) => {
        setQuestionsData(questionsData)
        console.log(questionsData)
        const formattedData = questionsData.map((question) => {
          const { left, right, up } = question.swipes
          const total = left + right + up
          const l = (left / total) * 100
          const r = (right / total) * 100
          const u = (up / total) * 100

          return {
            pieData: [
              { id: 0, value: l, label: 'Feels Yes', color: '#808080' }, // Green
              { id: 1, value: r, label: 'Feels No', color: '#A9A9A9' }, // Red
              { id: 2, value: u, label: 'Skipped', color: '#D3D3D3' }, // Orange
            ],
          }
        })
        console.log(formattedData)
        setFormattedArray(formattedData)
        setStart(true)
      })
      .catch((error) => {
        console.error('Error fetching questions data:', error)
      })
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        toast.success(`Welcome back, ${currentUser.displayName}`, {
          position: 'top-center',
        })
      } else {
        setUser(null)
        navigate('/home')
      }
    })
    return () => unsubscribe()
  }, [])

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
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    if (index - 1 < 0) {
      setSignShow(true)
      setShowProduct(true)
      console.log('All cards are swiped')
    }
  }

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
                {index === currentIndex && (
                  <ArcDesign
                    data={formattedArray[index]?.pieData || []}
                    className="arc-container"
                  />
                )}
              </div>
            </TinderCard>
          ))}
          {showProduct && (
            <div>
              <div className="final-text">Our Products</div>
              <button className="centered-button">Show Products</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdvancedResults
