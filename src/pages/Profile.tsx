import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { AppState } from '../redux/store'

const Profile = () => {
  const user = useSelector((state: AppState) => state.users.user)

  if (!user) {
    return <div>no user</div>
  }

  return (
    <div>
      <h1>UserProfile</h1>
      <p> name: {user.email}</p>
    </div>
  )
}

export default Profile
