import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function Simple() {
  const [blogs, setBlogs] = useState([])
  const [lastDirection, setLastDirection] = useState('')
  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_API_URL

  const numberOfCardsToDisplay = 5 // Set the number of cards you want to display

  useEffect(() => {
    // Fetch blogs from the backend
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://sanctity-be-4yqw.onrender.com/getblogs`,
        )
        console.log(response.data)
        setBlogs(response.data.slice(0, numberOfCardsToDisplay)) // Limit the number of blogs
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  const swiped = (direction, blogId) => {
    console.log('swiped: ' + direction)
    setLastDirection(direction)

    // Handle right swipe
    if (direction === 'right') {
      handleCardClick(blogId)
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const handleCardClick = (id) => {
    console.log('clicked')
    navigate(`/saveblog/${id}`)
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

      <div className="cardContainer">
        {blogs.map((blog) => (
          <TinderCard
            className="swipe"
            key={blog._id} // Use _id for a unique key
            onSwipe={(dir) => swiped(dir, blog.blogId)} // Pass blogId on swipe
            onCardLeftScreen={() => outOfFrame(blog.heading || blog.blogId)}
          >
            <div>
              <div
                style={{
                  backgroundImage: blog.image ? `url(${blog.image})` : 'none',
                }} // Use default image if URL is not available
                className="card"
              >
                <h3 style={{ color: 'black' }}>
                  {blog.heading || 'No Heading'}
                </h3>{' '}
                {/* Display heading or fallback text */}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default Simple
