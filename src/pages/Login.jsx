import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { IoMdHome } from "react-icons/io";
import Loading from '../utils/Loading';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password })
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                setLoading(false)
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate('/home')
                }
            }
            setLoading(false)
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error")
            }
        }
    }

    return (
        <>
            {loading ?
                (
                    <Loading />
                ) : (
                    <div className='h-screen  '>
                        <div className=' bg-slate-950  h-screen flex flex-col justify-center gap-10'>
                            <div className='flex justify-center'>
                                <form className="max-w-sm grow" onSubmit={handleSubmit}>
                                    <div className='grid gap-5  px-12 pt-16 pb-8 bg-slate-900 rounded-3xl shadow-gray-900 shadow-2xl'>
                                        <div className='relative shadow-lg'>

                                            <label
                                                htmlFor="emailAddress"
                                                className="absolute left-4 -top-3 px-1 text-sm font-medium text-purple-600 bg-slate-900"
                                            >
                                                Username
                                            </label>

                                            <div className="">
                                                <input type="text" id="emailAddress" name='emailAddress' onChange={(e) => setEmail(e.target.value)} className=" bg-transparent border border-purple-500 text-gray-200 text-sm rounded-2xl  focus:ring-purple-700 focus:border-purple-700 focus:outline-none block w-full  p-2.5  " placeholder="Email Address" required />
                                            </div>
                                        </div>
                                        <div className='relative shadow-lg '>
                                            <label
                                                htmlFor="password"
                                                className="absolute left-4 -top-3 px-1 text-sm font-medium text-purple-600 bg-slate-900"
                                            >
                                                Password
                                            </label>
                                            <div className="">
                                                <input type="password" id="password" name='password' onChange={(e) => setPassword(e.target.value)} className=" bg-transparent border border-purple-500 text-white text-sm rounded-2xl  focus:ring-purple-700 focus:border-purple-700 focus:outline-none block w-full  p-2.5  " placeholder="********" required />
                                            </div>
                                        </div>
                                        <div className="flex items-start ">
                                            <div className="flex items-center h-5">
                                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-purple-500" />
                                            </div>
                                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-400 ">Remember me</label>
                                        </div>

                                        <button type="submit" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50  font-medium rounded-2xl  text-sm px-5 py-2.5 text-center me-2 mb-2 ">Login</button>

                                        <div className='text-white text-sm grid grid-cols-2'>
                                            <p>Not registered yet? </p>
                                            <div>
                                                <button type='button' onClick={() => navigate('/register')} className='underline underline-offset-2'>Register now</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='flex justify-center'>
                                <button 
                                type="button" 
                                onClick={()=> navigate('/')}
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-900 shadow-2xs hover:bg-gray-100">
                                    <span>Go To Home Page</span>
                                    <IoMdHome className='text-lg' /> 
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
        </>
    )
}

export default Login
