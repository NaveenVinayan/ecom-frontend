import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../utils/UserNavbar'
import { ToastContainer } from 'react-toastify'

const UserHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <ToastContainer position="bottom-right" autoClose={2000} theme="colored" /> 

    </div>
  )
}

export default UserHome
