import React, { useState } from 'react'
import { IconButton,Tooltip } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import NotesTwoToneIcon from '@mui/icons-material/NotesTwoTone'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone'


export default function DocumentList(documentResults) {
  return (
    <List sx={{p:2}}>
      {documentResults.documentResults.map((row, index) => (
        <ListItem
          key={row.id}
          disableGutters
          secondaryAction={
            <Tooltip title="View text">
               <IconButton aria-label="comment">
              <DescriptionTwoToneIcon color="primary" />
            </IconButton> </Tooltip>
          }
        >
          <ListItemText primary={row.title} />
        </ListItem>
      ))}
    </List>
  )
}
