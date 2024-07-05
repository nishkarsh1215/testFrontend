import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from './LoginFirebase'
import { toast } from 'react-toastify'
import { setDoc, doc } from 'firebase/firestore'

export function SignInwithGoogle() {
  async function googleLogin() {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: '',
        })
        toast.success('User logged in Successfully', {
          position: 'top-center',
        })
        window.location.href = '/profile'
      }
    } catch (error) {
      toast.error('Failed to log in with Google', {
        position: 'top-center',
      })
      console.error(error)
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={googleLogin}
      >
        <img
          src="https://raw.githubusercontent.com/nishkarsh1215/testFrontend/main/public/android_dark.png"
          alt="Google sign-in"
          width="50%"
        />
      </div>
    </div>
  )
}

export default SignInwithGoogle
