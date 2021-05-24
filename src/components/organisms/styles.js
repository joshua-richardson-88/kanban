import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  columnRoot: {
    margin: '1rem 0',
    width: '20rem',
    minHeight: '-webkit-min-content',
    display: 'flex',
    '&::before': {
      content: '" "',
      display: 'block',
      width: '1rem',
      height: 1,
    },
    '&::after': {
      content: '" "',
      display: 'block',
      width: '1rem',
      height: 1,
    },
  },
  collapse: {
    minHeight: '12rem !important',
  },
  modalContainer: {
    position: 'absolute',
    top: '10vh',
    left: '10vw',
    width: '80vw',
    height: '80vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[5],
  },
  projectContainer: {
    flex: 1,
    display: 'flex',
    overflowX: 'auto',
    padding: '0 8px',
  },
  projectRoot: {
    margin: '1rem',
  },
  taskContainer: {
    padding: '0.5rem 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    minHeight: '7rem',
  },
  taskRoot: {
    width: 'calc(100% - 1rem)',
    margin: '0.5rem',
  },

  // taskModal
  taskModalContainer: {
    padding: '1rem',
    height: 'calc(80vh - 8.5rem)',
    overflowY: 'auto',
  },
  actionList: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
}))
