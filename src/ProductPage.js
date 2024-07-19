import React from 'react'
import MyThree from './MyThree'

export const ProductPage = () => {
  const pageStyle = {
    background: 'linear-gradient(to right, #a6a6a6, #ffffff)',
    minHeight: '100vh',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }

  const textStyle = {
    fontFamily: 'Black Ops One, sans-serif',
    fontSize: '24px',
    color: '#333', // Dark color for better contrast
    padding: '20px',
  }

  return (
    <div style={pageStyle}>
      <div style={textStyle}>
        We are on stealth mode and building amazing products
      </div>
    </div>
  )
}

export default ProductPage
