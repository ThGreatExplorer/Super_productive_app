import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SVG from 'react-inlinesvg';
import bed from '../svg/bed.svg';
import gym from '../svg/gym.svg';
import meditate from '../svg/meditate.svg';
import walk from '../svg/walk.svg';
import water from '../svg/water.svg';
import wakeup from '../svg/wakeup.svg';
import custom from '../svg/custom.svg';
import { useState } from 'react';
import taskhashmap from '../utils/Text';

// Create a mapping object for category to SVG import
const categoryToSVG = {
  wakeup: wakeup,
  bed: bed,
  water: water,
  walk: walk,
  meditate: meditate,
  gym: gym,
  custom: custom,
};

export default function NewTaskList(props) {
  const [customField, setCustomField] = useState('');

  const handleClick = (category, icon, text, difficulty, dueDate) => {
    if (category && category !== '') {
      const newTask = {
        category: category,
        icon: icon,
        text: text,
        difficulty: difficulty,
        dueDate: dueDate
      };
      props.setCurrentTaskList((prevTaskList) => [...prevTaskList, newTask]);
      console.log(props.currentTaskList);
    }
  };

  const handleCustomField = (e) => {
    console.log(e.target.value);
    setCustomField(e.target.value);
  };

  //display the first 6 items in the list
  const slicedTaskList = props.currentTaskList.slice(0, 6);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {slicedTaskList.map((element, index) => {
        console.log(element, index);
        return (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end">
                <AddIcon onClick={() => handleClick(element.category, element.category, element.text, element.difficulty, element.dueDate)} />
              </IconButton>
            }
          >
            <ListItemIcon>
              <SVG src={categoryToSVG[element.category]} style={{ height: 100, width: 50 }} />
            </ListItemIcon>
            <ListItemText 
              primary={element.text}
              secondary={`Difficulty: ${element.difficulty} | Due Date: ${element.dueDate}`}
              style={{ color: 'black' }} />
          </ListItem>
        );
      })}
    </List>
  );
}
