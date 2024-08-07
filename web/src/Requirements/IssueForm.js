import React, { useState } from 'react'
import { Button, Box, Stack, TextField,Backdrop,  CircularProgress } from '@mui/material'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add';


export default function IssueForm({ jiraIssue }) {
  const [jiraSummary, setJiraSummary] = useState(jiraIssue['summary'])
  const [jiraDescription, setJiraDescription] = useState(
    jiraIssue['description'],
  )
  const [jiraIssueType, setJiraIssueType] = useState(jiraIssue['issuetype'])

  const [isLoading, setIsLoading] = useState(false)
  const [saved,setSaved] = useState(false)

    const handlecreateissue = () => {
      
        setIsLoading(true)
        setSaved(false)
    fetch(process.env.REACT_APP_API_HOST + '/jira/issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: {
          key: jiraIssue['project']['key'],
          name: jiraIssue['project']['name'],
        },
        summary: jiraSummary,
        description: jiraDescription,
        issuetype: jiraIssueType,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
         
          setIsLoading(false)
          if (res.success === true)
          {
              setSaved(true)
              }
      })
  }

  return (
      <Box sx={{ p: 2 }}>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack spacing={2}>
        <TextField
          sx={{ width: 500 }}
          variant="outlined"
          disabled
          label="Project"
          value={jiraIssue['project']['name']}
        ></TextField>
        <Stack direction="row" spacing={2}>
          <TextField
            sx={{ width: 500 }}
            variant="outlined"
            multiline
                      label="Summary"
                      disabled={saved}
            value={jiraSummary}
            onChange={(event) => setJiraSummary(event.target.value)}
          ></TextField>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="issue-type-select-label">Issue Type</InputLabel>
            <Select
              variant="outlined"
              label="Issue Type"
              labelId="issue-type-select-label"
                          value={jiraIssueType}
                          disabled={saved}
              onChange={(event) => setJiraIssueType(event.target.value)}
              sx={{ overflowY: 'visible' }}
            >
              <MenuItem key="task" value="Task">
                Task
              </MenuItem>
              <MenuItem key="story" value="Story">
                Feature
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <TextField
          sx={{ width: '90%' }}
                  variant="outlined"
                  disabled={saved}
          multiline
          rows={3}
          label="Description"
          value={jiraDescription}
          onChange={(event) => setJiraDescription(event.target.value)}
        ></TextField>
        <Button
          variant="contained"
                  disabled={saved}
                   endIcon={<AddIcon />}
          onClick={handlecreateissue}
          sx={{ width: 120 }}
        >
          Create
        </Button>
      </Stack>
    </Box>
  )
}
