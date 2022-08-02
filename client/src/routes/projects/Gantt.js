import { Button, FormControl, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { isAuthenticated } from '../Login';
import axios from 'axios'
import Gantt from '../../components/gantt';

const Overview = () => {

  const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
    ]
};
  
    // const [data, setData] = useState([])

    // const getData = async () => {
    //   try {
    //       const data = await axios.get('http://localhost:8000/api/data/get')
    //       setData(data.data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // if (data.length === 0) 
    //   getData()

    if (!isAuthenticated()) {
      return (
        <div>
          <h1>
            Tu n'es pas authentifié ! Connecte toi avant de pouvoir accéder à cette page.
          </h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>
            Le calendrier de tes projets :
          </h1>
          <div className="gantt-container">
            <Gantt dataSource={data}/>
          </div>
        </div>
      )
    }
}

export default Overview;
