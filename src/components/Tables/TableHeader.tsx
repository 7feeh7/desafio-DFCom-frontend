import { styled } from '@mui/material'
import MUITableHead from '@mui/material/TableHead'
import colors from '../../theme/colors'

export const TableHead = styled(MUITableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    color: 'white',
    backgroundColor: colors.backOne,
    borderLeft: '1px solid white',
  },
  '& th:first-child': {
    borderRadius: '10px 0 0 0',
  },
  '& th:last-child': {
    borderRadius: '0 10px 0 0',
  },
}))
