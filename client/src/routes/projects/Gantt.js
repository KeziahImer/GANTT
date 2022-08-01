import React from 'react'
import { isAuthenticated } from '../Login';

const Overview = () => {
    if (!isAuthenticated()) {
      return (
        <div>
          <h1>
            You're not authenticated ! Login before access this page
          </h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>
            Your projects
          </h1>
        </div>
      )
    }
}

export default Overview;
