import React, { useState, useEffect } from 'react'
import { Tab, Box, Tabs } from '@material-ui/core'
import axios from 'axios'

import { useLocation } from 'react-router-dom'
import './Project.css'

const Project = () => {
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

  useEffect(() => {
    (
      async () => {await getProject();}
    )();
  }, []);

  const printSpaces = (index) => {
    const tab = []
    const start = new Date(project.tasks[index].start).getDate() + '/' + (new Date(project.tasks[index].start).getMonth() + 1)
    for (let i = 0; allDays[i] && allDays[i] !== start; i += 1) {
      tab.push(<Tab value='false' style={{width: '10px', height: '10px'}} />)
    }
    return tab
  }
  
  const printTask = (index) => {
    const tab = []
    const start = new Date(project.tasks[index].start).getDate() + '/' + (new Date(project.tasks[index].start).getMonth() + 1)
    const end = new Date(project.tasks[index].end).getDate() + '/' + (new Date(project.tasks[index].end).getMonth() + 1)
    let i = 0

    for (; allDays[i] && allDays[i] !== start; i += 1);
    for (; allDays[i] && allDays[i] !== end; i += 1) {
      tab.push(<Tab value='false' style={{width: '10px', height: '10px', backgroundColor: 'red'}} />)
    }
  tab.push(<Tab value='false' style={{width: '10px', height: '10px', backgroundColor: 'red'}} />)
  return tab
  }

  return (
    <div>
      <h1>
        {project.name}
      </h1>
      <div className='gantt'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
          <Tabs value='false'>
            <Tab style={{width: '10px', height: '10px'}} label="Tâches/Dates" value='false'  />
            {allDays.map(day => {
              return (
                <Tab label={day} style={{width: '10px', height: '10px'}} />
              )
            })}
          </Tabs>
          {project && project.tasks && project.tasks.map((task, index) => {
            return (
              <Tabs value='false'>
                <Tab label={task.name} value='false' style={{width: '10px', height: '10px'}} />
                {printSpaces(index)}
                {printTask(index)}
              </Tabs>
            )
          })}
        </Box>
      </div>
    </div>
  )
}

export default Project
