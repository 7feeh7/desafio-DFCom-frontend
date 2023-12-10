import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

interface MenuProps {
  userEmail: string
  onLogout: () => void
}

const HorizontalMenu: React.FC<MenuProps> = ({ userEmail, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    onLogout()
  }

  return (
    <div>
      <AppBar position="static" sx={{ background: '#00929f' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            DFCom
          </Typography>
          <div>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
              <Typography variant="body1" style={{ marginLeft: '5px' }}>
                {userEmail}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default HorizontalMenu
