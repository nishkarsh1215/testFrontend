import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './custom-quill.css'
import { useParams } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './LoginFirebase'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ImageResize from 'quill-image-resize-module-react'

// Register the image resize module correctly
Quill.register('modules/imageResize', ImageResize)

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
  imageResize: {
    // Change this to lowercase
    // Optional: Customize the toolbar styles
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'align',
  'link',
  'image',
]

export function QuilBot() {
  const { id } = useParams()
  const [value, setValue] = useState('')
  const [firstHeading, setFirstHeading] = useState('')
  const [firstImage, setFirstImage] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserName(currentUser.displayName || 'User')
        setUserEmail(currentUser.email || 'No email provided')
        if (
          currentUser.email !== 'nishkarsh1512@gmail.com' &&
          currentUser.email !== 'sanctity.ai.fs@gmail.com'
        ) {
          navigate('/')
        }
      } else {
        setUserName('')
        setUserEmail('')
      }
    })

    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `https://sanctity-be-4yqw.onrender.com/getblog/${id}`,
        )
        const { content } = response.data
        setValue(content)
      } catch (error) {
        console.error('Error fetching blog content:', error)
      }
    }

    fetchBlogData()
    return () => unsubscribe()
  }, [id, navigate])

  const handleSave = async () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(value, 'text/html')

    const heading = doc.querySelector('h1, h2, h3, h4, h5, h6')
    if (heading) {
      setFirstHeading(heading.textContent)
    } else {
      setFirstHeading('')
    }

    const image = doc.querySelector('img')
    if (image) {
      setFirstImage(image.src)
    } else {
      setFirstImage('')
    }

    const data = {
      userName,
      userEmail,
      blogId: id,
      heading: heading ? heading.textContent : '',
      image: image ? image.src : '',
      content: value,
    }

    try {
      const response = await axios.post(
        `https://sanctity-be-4yqw.onrender.com/saveblog/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      setSuccessMessage('Blog content saved successfully!')
    } catch (error) {
      console.error('Error saving blog content:', error)
      setSuccessMessage('Failed to save blog content')
    }
  }

  return (
    <div className="quilbot-container">
      <h1
        style={{
          fontFamily: 'Black Ops One, cursive',
          fontSize: '16px',
          color: 'black',
          margin: '0',
        }}
      >
        Welcome, {userName}
      </h1>
      <p
        style={{
          fontFamily: 'Black Ops One, cursive',
          fontSize: '14px',
          color: 'black',
          margin: '0',
        }}
      >
        Email: {userEmail}
      </p>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
      {successMessage && (
        <div
          style={{
            marginTop: '5px',
            padding: '10px',
            borderRadius: '4px',
            color: '#00796b',
            textAlign: 'left',
          }}
        >
          {successMessage}
        </div>
      )}
      <button
        onClick={handleSave}
        style={{
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          fontSize: '14px',
          cursor: 'pointer',
          marginTop: '20px',
          display: 'block',
          width: '100%',
          maxWidth: '150px',
          textAlign: 'center',
          boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#333')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'black')}
      >
        Save
      </button>
    </div>
  )
}

export default QuilBot
