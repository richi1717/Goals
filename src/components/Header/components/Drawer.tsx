import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
  ListItemButton,
} from '@mui/material'
import ToggleColorMode from '../../ToggleColorMode'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { useContext, useEffect, useState } from 'react'
import { Frequency } from '../../../pages/Welcome/components/GoalDisplay'
import logoutUser from '../../../api/users/logoutUser'
import { SettingsContext, SettingsDispatchContext } from '../../SettingsContext'

interface DrawerProps {
  anchorEl: null | HTMLElement
  setAnchorEl: () => void
  displayName?: string
}

type Filter = 'all' | Frequency

export default function Drawer({
  anchorEl,
  setAnchorEl,
  displayName,
}: DrawerProps) {
  const isAdminOpen = Boolean(anchorEl)
  const navigate = useNavigate()
  // const [filterBy, setFilterBy] = useState<Filter>('all')
  const settings = useContext(SettingsContext)
  const filterBy = settings?.filterBy
  const hideComplete = settings?.hideComplete
  // const [hideComplete, setHideComplete] = useState(false)
  const dispatch = useContext(SettingsDispatchContext)

  const handleChange = (event: SelectChangeEvent) => {
    // setFilterBy(event.target.value as Filter)
    dispatch({ type: 'updateFilterBy', filterBy: event.target.value })
  }

  const handleClose = () => {
    setAnchorEl()
  }

  return (
    <MuiDrawer anchor="right" open={isAdminOpen} onClose={handleClose}>
      <Box
        sx={{
          width: { mobile: 1, tablet: 350 },
        }}
        role="presentation"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Typography sx={{ fontWeight: 500 }}>Settings</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List sx={{ p: 0 }}>
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemText
              sx={{
                textTransform: 'uppercase',
                '& .MuiTypography-root': { fontSize: '0.75rem' },
              }}
            >
              Mode
            </ListItemText>
            <ToggleColorMode />
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterBy}
                label="Filter by"
                onChange={handleChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControlLabel
              value="show"
              control={
                <Checkbox
                  checked={hideComplete}
                  onChange={() => dispatch({ type: 'updateHideComplete' })}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label={`${hideComplete ? 'Show' : 'Hide'} completed`}
            />
          </ListItem>
          {displayName && (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  logoutUser()
                  handleClose()
                  navigate('/')
                }}
              >
                <ListItemText primary={`Logout ${displayName}`} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </MuiDrawer>
  )
}
