import React, { useState } from 'react'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'

const App = () => {
  const [logedinUser, setlogedinUser] = useState()
  return (
    <>
      {
        (logedinUser) ? <AdminPanel logedinUser={logedinUser} setlogedinUser={setlogedinUser} /> : <Login setlogedinUser={setlogedinUser} />
      }

    </>
  )
}

export default App
