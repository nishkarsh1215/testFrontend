import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from './LoginFirebase' // Adjust the import path as necessary
import { useLocation } from 'react-router-dom' // Import useLocation

const pages = ['Home', 'Products']
const settings = ['Logout']

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [user, setUser] = React.useState(null) // Track user state
  const navigate = useNavigate() // Initialize useNavigate
  const location = useLocation() // Get the current location

  React.useEffect(() => {
    // Set up the listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    // Clean up the subscription
    return () => unsubscribe()
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleNavigation = (page) => {
    if (page === 'Home') {
      navigate('/home')
    } else if (page === 'Products') {
      navigate('/product')
    }
    handleCloseNavMenu() // Close the menu after navigation
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/home') // Redirect to /hexagon after logout
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleLogoClick = () => {
    if (location.pathname === '/home') {
      // If already on the /home page, refresh the page
      window.location.reload()
    } else {
      // Navigate to /home
      navigate('/home')
    }
  }

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: 'transparent', color: 'black' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="a"
              onClick={handleLogoClick}
              sx={{
                display: 'flex',
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img
                src="https://raw.githubusercontent.com/nishkarsh1215/testFrontend/main/public/hd_background_updated.png"
                alt="Logo"
                style={{ height: '30px' }}
              />
            </Box>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                  <Typography textAlign="center" color="inherit">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

            {user && ( // Render profile icon and menu only if user is logged in
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu()
                        if (setting === 'Logout') {
                          handleLogout()
                        }
                      }}
                    >
                      <Typography textAlign="center" color="inherit">
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default ResponsiveAppBar
