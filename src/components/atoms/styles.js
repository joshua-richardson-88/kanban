import { fade, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  actionMenuItem: {
    width: '20rem',
  },
  activityRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    '&:hover': {
      backgroundColor:
        theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    },
  },
  colorPicker: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  inputText: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '1em',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  root: {
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
  taskModalContent: {
    padding: '1rem',
    marginBottom: '2rem',
    backgroundColor:
      theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
  },
  taskModalDescription: {
    marginBottom: '4rem',
  },
}))
