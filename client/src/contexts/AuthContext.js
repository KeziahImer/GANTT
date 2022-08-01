import React, { useContext } from 'react'

const AuthContext = React.createContext({})



export default () => useContext(AuthContext)
