import { createTheme } from '@mui/material/styles'
import colors from './colors'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blueOne,
    },
    secondary: {
      main: '#6c757d',
    },
    error: {
      main: '#dc3545',
    },
    background: {
      default: '#f8f9fa',
    },
    text: {
      primary: '#333',
      secondary: '#777',
    },
  },
  // typography: {
  //   button: {
  //     textTransform: 'none'
  //   }
  // },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    // @ts-ignore
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
})

export default theme
