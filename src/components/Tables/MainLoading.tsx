import { CircularProgress, Stack } from '@mui/material'

function MainLoading() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100%',
      }}
    >
      <CircularProgress />
    </Stack>
  )
}

export default MainLoading
