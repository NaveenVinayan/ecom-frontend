import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../utils/UserNavbar'
import { ToastContainer } from 'react-toastify'
import Footer from '../utils/Footer'

const UserHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={2000} theme="colored" /> 

    </div>
  )
}

export default UserHome
