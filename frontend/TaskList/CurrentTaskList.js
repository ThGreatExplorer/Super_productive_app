import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import SVG from 'react-inlinesvg';
import bed from '../svg/bed.svg';
import gym from '../svg/gym.svg';
import meditate from '../svg/meditate.svg';
import walk from '../svg/walk.svg';
import water from '../svg/water.svg';
import wakeup from '../svg/wakeup.svg';
import custom from '../svg/custom.svg';
import near from '../svg/near.svg'
import { useState } from 'react';

const categoryToSVG = {
  wakeup: wakeup,
  bed: bed,
  water: water,
  walk: walk,
  meditate: meditate,
  gym: gym,
  custom: custom,
};

const CurrentTaskList = ({ currentTaskList, setCurrentTaskList, setCurrentBalance, currentBalance}) => {
  const handleTaskCompletion = (index) => {
    setCurrentTaskList((prevTaskList) => {
      const updatedTaskList = [...prevTaskList];
      updatedTaskList.splice(index, 1); // Remove the completed task
      return updatedTaskList;
    });
    setCurrentBalance(currentBalance + 0.01)
  };

  const slicedTaskList = currentTaskList.slice(0, 6);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {slicedTaskList.map((element, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={false} // Set to true if the task is completed
              onClick={() => handleTaskCompletion(index)}
            />
          </ListItemIcon>
          <ListItemIcon>
            <SVG src={categoryToSVG[element.category]} style={{ height: 100, width: 50 }} />
          </ListItemIcon>
          <ListItemText
            primary={element.text}
            secondary={`Difficulty: ${element.difficulty} | Due Date: ${element.dueDate}`}
            style={{ color: 'black' }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CurrentTaskList;
