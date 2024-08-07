import React, { useState } from 'react'
import { Button, Box, Stack, TextField, Typography } from '@mui/material'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'



export default function IssueForm({ jiraIssue }) {
    const [summary, setSummary] = useState(jiraIssue['summary'])
    const [description, setDescription] = useState(jiraIssue['description'])
    const [issueType, setIssueType] = useState(jiraIssue['issuetype'])

    return (
        <Box sx={{ p: 2 }}>
            <Stack spacing={2} >

                <TextField
                        sx={{ width: 500 }}
                        variant="outlined"
                        disabled
                        label="Project"
                        value={jiraIssue['project']['name']}
                    >
                    </TextField>
                <Stack direction="row" spacing={2}>
                    <TextField
                        sx={{ width: 500 }}
                        variant="outlined"
                        multiline
                        label="Summary"
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                    >
                    </TextField>
                    <FormControl  sx={{ m: 1, width: 300 }}>
                        <InputLabel id="issue-type-select-label">Issue Type</InputLabel>
                        <Select
                            variant='outlined'
                            label="Issue Type"
                            labelId='issue-type-select-label'
                            value={issueType}
                            onChange={(event) => setIssueType(event.target.value)}
                            sx={{ overflowY: 'visible' }}

                        >
                            <MenuItem key="task" value="Task">Task</MenuItem>
                            <MenuItem key="story" value="Story">Feature</MenuItem>
                                     
                        </Select>

                    </FormControl>
                </Stack>
                 <TextField
                        sx={{ width: '90%' }}
                        variant="outlined"
                    multiline
                    rows={3}
                        label="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    >
                    </TextField>
            </Stack>
        </Box>
    )


}