import React, { useState } from 'react'
import { Button, Box, Stack, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import SendIcon from '@mui/icons-material/Send'
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone'
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone'
import { lightBlue } from '@mui/material/colors'
import DocumentList from './DocumentList'
import IssueForm from './IssueForm'

import './Search.css'

export default function Search() {
  const [search, setSearch] = useState('Route Optimization')
  const [results, setResults] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearchByQuery = () => {
    setIsLoading(true)
    setResults('')
    fetch(process.env.REACT_APP_API_HOST + '/search/requirments/' + search)
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        setResults(res)
        setIsLoading(false)
      })
  }

  return (
    <div className="Search-Main">
      <div className="Search-Bar">
        <Stack spacing={2}>
          <div className="Search-Heading">
            <Stack
              direction="row"
              sx={{ paddingLeft: 2, paddingTop: 1, paddingBottom: 1 }}
              spacing={1}
            >
              <img
                src={require('./../images/ai_search_small.png')}
                height={'35px'}
              />
              <Typography variant="h5" component="h5">
                Requirements Search
              </Typography>
            </Stack>
          </div>

          <Stack direction="column" spacing={1} sx={{ p: 2 }}>
            <Typography variant="caption">
              Use this search box to find relevant requirement documents through
              Azure AI Search - vector search. The retrieved documents will be
              used to automatically populate the details of a new Jira Issue
              (Task). This ensures accurate and efficient creation of tasks
              based on the specified requirements.
            </Typography>
            <Stack
              direction="row"
              sx={{ paddingLeft:1, textAlign: 'left', verticalAlign: 'middle' }}
            >             
              
            </Stack>
            <Stack direction="row" spacing={0}>
              <TextField
                sx={{ width: '80%' }}
                variant="outlined"
                label="Search"
                helperText="Create a Jira Issue from requirement document search. Search using phrases such as 'Route Optimization', 'Time Delays', etc."
                defaultValue="Route Optimization"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              ></TextField>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSearchByQuery}
                sx={{ mb: 3, ml: 3, mt: 1 }}
              >
                Submit
              </Button>
            </Stack>

            {isLoading === true && (
              <Box
                sx={{
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <CircularProgress size={80} />
              </Box>
            )}
          </Stack>
        </Stack>
      </div>
      <div className="Search-Documents">
        <Stack spacing={2}>
          <div className="Search-Heading">
            <Stack
              direction="row"
              sx={{ paddingLeft: 2, paddingTop: 1, paddingBottom: 1 }}
              spacing={1}
            >
              <DescriptionTwoToneIcon sx={{ fontSize: 35 }} />
               <Typography variant="h5" component="h5">
                Document Context
             </Typography>
            </Stack>
          </div>
          {results == '' && (
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
              No documents are available
            </Typography>
          )}

          {results !== '' && (
            <DocumentList documentResults={results['ResourceCollection']} />
          )}
        </Stack>
      </div>
      <div className="Search-Jira">
        <Stack spacing={2}>
          <div className="Search-Heading">
            <Stack
              direction="row"
              sx={{ paddingLeft: 2, paddingTop: 1, paddingBottom: 1 }}
              spacing={1}
            >
              <img
                src={require('./../images/jira_logo_small.png')}
                height={'35px'}
              />
              <Typography variant="h5" component="h5">
                Create Jira Issue (Tasks)
              </Typography>
            </Stack>
                  </div>
                  {results == '' && (
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
             Perform a Search to populate Issue
            </Typography>
                  )}
                  {results !== '' && (
                      <IssueForm jiraIssue={results['JiraIssue']} />
                  )}
        </Stack>
      </div>
    </div>
  )
}
