// import react libraries
import React, { useState } from 'react'

// import modules
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

// import project files
import { dropAll } from '../../features/projects/projectSlice'

export default function UserMenu({ darkMode, toggleTheme }) {
  const dispatch = useDispatch()
  const menuId = 'desktop-account-menu'
  const [anchorElement, setAnchorElement] = useState(null)
  const isMenuOpen = Boolean(anchorElement)

  // general menu functionality
  const handleMenuOpen = (event) => {
    setAnchorElement(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorElement(null)
  }

  /****************************************************************************
                            Menu Item Functionality
  ****************************************************************************/
  // Clear All Projects Menu Item functionality
  const handleClearAll = () => {
    dispatch(dropAll())
    handleMenuClose()
  }
  // triggers the toggleTheme function from props when the toggle dark theme
  // button is pressed in the user account menu
  const handleThemeChange = () => {
    toggleTheme()
  }

  return (
    <>
      <IconButton
        edge='end'
        aria-label='acoount of current user'
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleMenuOpen}
        clor='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleClearAll}>Clear All Projects</MenuItem>
        <MenuItem onClick={handleThemeChange}>
          <Typography style={{ marginRight: '2rem' }} variant='body1'>
            Toggle Dark Mode
          </Typography>
          <IconButton aria-label='toggle dark mode' size='small'>
            {darkMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </MenuItem>
      </Menu>
    </>
  )
}
