import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slider from '@mui/material/Slider';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SVG from 'react-inlinesvg';
import bed from '../svg/bed.svg';
import gym from '../svg/gym.svg';
import meditate from '../svg/meditate.svg';
import walk from '../svg/walk.svg';
import water from '../svg/water.svg';
import wakeup from '../svg/wakeup.svg';
import custom from '../svg/custom.svg';
import taskhashmap from '../utils/Text';

export default function CurrentTaskList(props) {
  const [category, setCategory] = useState(''); // Task category state
  const [text, setText] = useState(''); // Task text state
  const [difficulty, setDifficulty] = useState(5); // Task length state
  const [dueDate, setDueDate] = useState(''); // Task due date state

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClick = () => {
    // Prevents empty tasks from being created
    if (category && category !== '') {
      const newTask = {
        category: category,
        text: text,
        difficulty: difficulty,
        dueDate: dueDate,
      };
      props.setCurrentTaskList([...props.currentTaskList, newTask]);
    }
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="add">
            <AddIcon onClick={handleClick} />
          </IconButton>
        }
      >
        <ListItemIcon>
          <SVG src={category === 'wakeup' ? wakeup : category === 'bed' ? bed : category === 'water' ? water : category === 'walk' ? walk : category === 'meditate' ? meditate : category === 'gym' ? gym : custom} style={{ height: 100, width: 50 }} />
        </ListItemIcon>
        <ListItemText primary={taskhashmap[category] || category} style={{ color: 'black' }} />
      </ListItem>
      <ListItem>
        <TextField
          select
          label="Task Category"
          value={category}
          onChange={handleCategoryChange}
          fullWidth
        >
          <MenuItem value="wakeup">Wake Up</MenuItem>
          <MenuItem value="bed">Bed</MenuItem>
          <MenuItem value="water">Water</MenuItem>
          <MenuItem value="walk">Walk</MenuItem>
          <MenuItem value="meditate">Meditate</MenuItem>
          <MenuItem value="gym">Gym</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </TextField>
      </ListItem>
      <ListItem>
        <TextField
          label="Task Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
      </ListItem>
      <ListItem>
        <Slider
          label="Task Difficulty"
          value={difficulty}
          onChange={(e, value) => setDifficulty(value)}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          step={1}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
        />
      </ListItem>
    </List>
  );
}
