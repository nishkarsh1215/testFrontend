import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './SaveBlog.css' // Import the CSS file

export function SaveBlog() {
  const { id } = useParams() // Retrieve the ID from the URL
  const navigate = useNavigate() // Use navigate for redirection
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userName, setUserName] = useState('') // Add state for userName
  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://sanctity-be-4yqw.onrender.com/getblog/${id}`,
        )
        console.log(response.data)
        if (response.data && response.data.content) {
          // Extract userName from response if available
          const { content, userName } = response.data
          setUserName(userName) // Set the userName state

          // Append message below the heading
          const updatedContent = `${content}<p><strong>This blog is written by ${userName}</strong></p>`
          setContent(updatedContent)
        } else {
          navigate('/home') // Redirect to home if the blog does not exist
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
        setError('Failed to fetch blog content')
        navigate('/home') // Redirect to home if there was an error
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id, navigate])

  if (loading) {
    return <div className="loading-container">Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="blog-content">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default SaveBlog
