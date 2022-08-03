import { Tab, Box, Tabs } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Project = () => {
  const location = useLocation();
  const userId = location.pathname.split('/').pop()
  const [project, setProject] = useState([])
  const [days, setDays] = useState([])
  const allDays = []

  const getProject = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/projects/details/${userId}`)
      setProject(res.data[0])
      setDays({
        start_day: new Date(res.data[0].start).getDate(),
        start_month: new Date(res.data[0].start).getMonth() + 1,
        end_day: new Date(res.data[0].end).getDate(),
        end_month: new Date(res.data[0].end).getMonth() + 1
      })
    } catch (error) {
      console.log(error)
    }
  }

  for (; days.end_month > days.start_month; days.start_month += 1) {
    for (; days.start_day < 31; days.start_day += 1) {
     allDays.push(days.start_day + '/' + days.start_month)
    }
    days.start_day = 1
  }
  for (; days.end_day >= days.start_day; days.start_day += 1) {
    allDays.push(days.start_day + '/' + days.start_month)
  }
  
  console.log(project.tasks)

  useEffect(() => {
    (
      async () => {await getProject();}
    )();
  }, []);

  return (
    <div>
      <h1>
        {project.name}
      </h1>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value='false' variant='scrollable' >
            <Tab style={{width: '10px', height: '10px'}} label="Tâches/Dates" value='false'  />
            {allDays.map(day => {
              return (
                <Tab label={day} style={{width: '10px', height: '10px'}} />
              )
            })}
          </Tabs>
          {project && project.tasks && project.tasks.map(task => {
            return (
              <Tabs value='false' variant='scrollable' >
                <Tab label={task.name} value='false' style={{width: '10px', height: '10px'}} />
              </Tabs>
            )
          })}
        </Box>
      </div>
    </div>
  )
}

export default Project
