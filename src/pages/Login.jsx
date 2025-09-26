import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { IoMdHome } from "react-icons/io";

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
                    <div className="flex items-center justify-center min-h-screen">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 
        0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 
        100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 
        91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 
        50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 
        97.0079 33.5539C95.2932 28.8227 92.871 
        24.3692 89.8167 20.348C85.8452 15.1192 
        80.8826 10.7238 75.2124 7.41289C69.5422 
        4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
        0.367541 46.6976 0.446843 41.7345 
        1.27873C39.2613 1.69328 37.813 4.19778 
        38.4501 6.62326C39.0873 9.04874 41.5694 
        10.4717 44.0505 10.1071C47.8511 9.54855 
        51.7191 9.52689 55.5402 10.0491C60.8642 
        10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
        17.9648 79.3347 21.5619 82.5849 
        25.841C84.9175 28.9121 86.7997 32.2913 
        88.1811 35.8758C89.083 38.2158 91.5421 
        39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
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
        </>
    )
}

export default Login
