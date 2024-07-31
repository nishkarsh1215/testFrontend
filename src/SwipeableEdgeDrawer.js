import * as React from 'react'
import PropTypes from 'prop-types'
import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

const drawerBleeding = 56

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(to right, #a6a6a6, #ffffff)', // Gradient background
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 1)', // Drop shadow
}))

const StyledBox = styled('div')(({ theme }) => ({
  background: 'linear-gradient(to right, #a6a6a6, #ffffff)', // Gradient background
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Drop shadow
  position: 'relative', // Ensure position is relative
  minHeight: '56px', // Set minimum height to avoid collapsing
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Space between items
  textAlign: 'center', // Center the text content
  px: 2, // Add padding for better spacing
}))

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[700], // Changed to grey
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  cursor: 'pointer', // Add cursor pointer for clickability
}))

function SwipeableEdgeDrawer(props) {
  const { window } = props
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined

  const handlePullerClick = (ev) => {
    console.log('Puller clicked') // Print something on click
    // Ensure className is treated as a string
    if (ev.target.className && typeof ev.target.className === 'string') {
      toggleDrawer() // Toggle the drawer state
    }
  }

  const OpenTheFooter = () => {
    console.log('Puller clicked') // Print something on click
    toggleDrawer() // Toggle the drawer state
  }

  return (
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        // open={open}
        // onClose={() => setOpen(false)}
        // onOpen={() => setOpen(true)}
        // swipeAreaWidth={drawerBleeding} // Adjust this value for touch-enabled devices
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            px: 2,
          }}
        >
          <Puller onClick={handlePullerClick} /> {/* Attach onClick handler */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ ml: 2, textAlign: 'left' }}
          >
            © {new Date().getFullYear()} Sanctity. All rights reserved.
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <img
            src="https://raw.githubusercontent.com/nishkarsh1215/testFrontend/main/public/SANCTITY-LOGO.png"
            alt="Sanctity Logo"
            width="150"
            height="150"
            style={{
              filter: 'invert(100%)',
              display: 'block',
              margin: '0 auto',
            }} // Center the image horizontally
          />
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default SwipeableEdgeDrawer
