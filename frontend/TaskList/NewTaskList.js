import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import ListItemIcon from '@mui/material/ListItemIcon'
import SVG from 'react-inlinesvg'
import bed from '../svg/bed.svg'
import gym from '../svg/gym.svg'
import meditate from '../svg/meditate.svg'
import walk from '../svg/walk.svg'
import water from '../svg/water.svg'
import wakeup from '../svg/wakeup.svg'
import custom from '../svg/custom.svg'
import { useState } from 'react'
import taskhashmap from '../utils/Text'

export default function CurrentTaskList(props) {
  const [customField, setCustomField] = useState('')
  const handleClick = (name, icon) => {
    // prevents empty tasks from being created
    if (name && name !== '') {
      const newTask = {
        name: name,
        icon: icon
      };
      props.setCurrentTaskList([...props.currentTaskList, newTask])
      console.log(props.currentTaskList)
    }
  }
  const handleCustomField = (e) => {
    console.log(e.target.value)
    setCustomField(e.target.value)
  }
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem
        secondaryAction={
          <IconButton edge='end' aria-label='add'>
            <AddIcon onClick={() => handleClick('wakeup', wakeup)}/>
          </IconButton>
        }
      >
        <ListItemIcon>
          <SVG src={wakeup} style={{ height: 100, width: 50 }} />
        </ListItemIcon>
        <ListItemText primary={taskhashmap['wakeup']} style={{ color: 'black' }} />
      </ListItem>
      <ListItem
        secondaryAction={
          <IconButton edge='end' aria-label='add'>
            <AddIcon onClick={() => handleClick('bed', bed)}/>
          </IconButton>
        }
      >
        <ListItemIcon>
          <SVG src={bed} style={{ height: 100, width: 50 }} />
        </ListItemIcon>
        <ListItemText primary={taskhashmap['bed']} style={{ color: 'black' }} />
      </ListItem>
      <ListItem
        secondaryAction={
          <IconButton edge='end' aria-label='add'>
            <AddIcon onClick={() => handleClick('water', water)}/>
          </IconButton>
        }
      >
        <ListItemIcon>
          <SVG src={water} style={{ height: 100, width: 50 }} />
        </ListItemIcon>
        <ListItemText primary={taskhashmap['water']} style={{ color: 'black' }} />
      </ListItem>
      <ListItem
        secondaryAction={
          <IconButton edge='end' aria-label='add'>
            <AddIcon onClick={() => handleClick('walk', walk)}/>
          </IconButton>
        }
      >
        <ListItemIcon>
          <SVG src={walk} style={{ height: 100, width: 50 }} />
        </ListItemIcon>
        <ListItemText primary={taskhashmap['walk']} style={{ color: 'black' }} />
      </ListItem>
      <ListItem
        secondaryAction={
          <IconButton edge='end' aria-label='add'>
            <AddIcon onClick={() => handleClick('meditate', meditate)}/>
          </IconButton>
        }
      >
        <ListItemIcon>
          <SVG src={meditate} style={{ height: 100, width: 50 }} />
        </ListItemIcon>
        <ListItemText primary={taskhashmap['meditate']} style={{ color: 'black' }} />
      </ListItem>
      <ListItem
        secondaryAction={
          <IconButton edge='end' aria-label='add'>
            <AddIcon onClick={() => handleClick('gym', gym)}/>
          </IconButton>
        }
      >
        <ListItemIcon>
          <SVG src={gym} style={{ height: 100, width: 50 }} />
        </ListItemIcon>
        <ListItemText primary={taskhashmap['gym']} style={{ color: 'black' }} />
      </ListItem>
      <ListItem
        secondaryAction={
          <IconButton edge='end' aria-label='add'>
            <AddIcon onClick={() => handleClick(customField)} />
          </IconButton>
        }
      >
        <ListItemIcon>
          <SVG src={custom} style={{ height: 100, width: 50 }} />
        </ListItemIcon>
        <TextField
          id='filled-basic'
          placeholder='Enter a custom task'
          onChange={(e) => handleCustomField(e)}
        />
      </ListItem>
    </List>
  )
}
