import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../utils/UserNavbar'

const UserHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default UserHome
