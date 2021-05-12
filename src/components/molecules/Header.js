// import react modules
import React, { useState } from 'react'

// import modules
import {
  AppBar,
  Badge,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

// import project files
import { Spacer } from '../atoms'
import { createProject } from '../../features/projects/projectSlice'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  newProject: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '1em',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function Header(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const [newProjectTitle, setNewProjectTitle] = useState('')

  const handleThemeChange = () => {
    console.log('calling toggle theme')
    props.toggleTheme()
  }

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }
  const handleCreateProject = (event) => {
    if (event.charCode === 13) dispatch(createProject(newProjectTitle))
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleThemeChange}>
        <Typography style={{ marginRight: '2rem' }} variant='body1'>
          Toggle Dark Mode
        </Typography>
        <IconButton aria-label='toggle dark mode' size='small'>
          {props.darkMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            Project Manager
          </Typography>
          <Spacer />
          <div className={classes.newProject}>
            <InputBase
              placeholder='New Project'
              onKeyPress={handleCreateProject}
              value={newProjectTitle}
              onChange={(event) => {
                setNewProjectTitle(event.target.value)
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'New Project' }}
            />
          </div>
          <Spacer />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='show 11 new notifications' color='inherit'>
              <Badge badgeContent={17} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='acoount of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              clor='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}

// export default function Header(props) {
//   const classes = useStyles()
//   const [projectTitle, setProjectTitle] = useState('New Project')
//   const [showHelpText, setShowHelpText] = useState(false)

//   const handleInputChange = (event) => {
//     const newTitle = event.target.value
//       .trim()
//       .replace(/\n/g, '')
//       .replace(/&nbsp;/g, ' ')
//       .replace(/&lt;/g, '<')
//       .replace(/&gt;/g, '>')
//     setProjectTitle(newTitle)
//   }
//   const handleSubmit = () => {
//     props.addNewProject(projectTitle)
//   }

//   return (
//     <div className={classes.header}>
//       <Typography variant='h5'>What are you working on?</Typography>
//       <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
//         <FormControl>
//           <Input
//             id='new-project'
//             value={projectTitle}
//             onChange={handleInputChange}
//             aria-describedby='new-project-helper-text'
//           />
//           {showHelpText ? (
//             <FormHelperText id='new-project-helper-text'>
//               Use this form to create a new project
//             </FormHelperText>
//           ) : null}
//         </FormControl>
//         <Button type='submit' variant='contained' color='primary'>
//           Create
//         </Button>
//       </form>
//     </div>
//   )
// }
