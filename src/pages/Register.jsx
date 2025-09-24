import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'


const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            alert("Password does not match")

        } else {
            try {

                const response = await axios.post("https://ecom-api-2xbg.onrender.com/api/auth/register", { name, email, password })
                if (response.data.success) {
                    login(response.data.user)

                    localStorage.setItem("token", response.data.token)
                    if (response.data.user.role === "admin") {
                        navigate('/admin-dashboard')
                    } else {
                        navigate('/user-home')
                    }
                }


            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error)
                } else {
                    setError("Server Error")
                }
            }
        }
    }

    return (
        <div className='h-screen  '>
            <div className=' bg-slate-950  h-screen flex flex-col justify-center gap-10'>
                <div className='flex justify-center'>
                    <form className="max-w-sm grow" onSubmit={handleSubmit}>
                        <div className='grid gap-5  px-12 pt-16 pb-8 bg-slate-900 rounded-3xl shadow-gray-900 shadow-2xl'>
                            <div className='relative shadow-lg '>

                                <input type="text" id="name" name='name' onChange={(e) => setName(e.target.value)}
                                    className="peer bg-transparent border border-purple-500 text-gray-200 text-sm rounded-2xl focus:ring-purple-700 focus:border-purple-700 focus:outline-none block w-full  p-2.5  " 
                                    placeholder="Your Name" required />
                                <label
                                    htmlFor="name"
                                    className="absolute left-4 -top-3 px-1 text-sm font-medium text-purple-600 bg-slate-900">
                                    Name
                                </label>

                            </div>
                            

                            <div className='relative shadow-lg'>

                                <input type="text" id="emailAddress" name='emailAddress' onChange={(e) => setEmail(e.target.value)} className=" bg-transparent border border-purple-500 text-gray-200 text-sm rounded-2xl focus:ring-purple-700 focus:border-purple-700 focus:outline-none block w-full  p-2.5  "
                                 placeholder="Email Address" required />
                                <label
                                    htmlFor="emailAddress"
                                    className="absolute left-4 -top-3 px-1 text-sm font-medium text-purple-600 bg-slate-900">
                                    Username
                                </label>


                            </div>
                            <div className='relative shadow-lg'>
                                <input type="password" id="password" name='password' onChange={(e) => setPassword(e.target.value)} className=" bg-transparent border border-purple-500 text-white text-sm rounded-2xl focus:ring-purple-700 focus:border-purple-700 focus:outline-none block w-full  p-2.5  " 
                                placeholder="********" required />
                                <label
                                    htmlFor="password"
                                    className="absolute left-4 -top-3 px-1 text-sm font-medium text-purple-600 bg-slate-900">
                                    Password
                                </label>

                            </div>
                            <div className='relative shadow-lg'>
                                <input type="password" id="confrimPassword" name='confrimPassword' onChange={(e) => setConfirmPassword(e.target.value)} className=" bg-transparent border border-purple-500 text-white text-sm rounded-2xl focus:ring-purple-700 focus:border-purple-700 focus:outline-none block w-full  p-2.5  " 
                                placeholder="********" required />
                                <label
                                    htmlFor="confrimPassword"
                                    className="absolute left-4 -top-3 px-1 text-sm font-medium text-purple-600 bg-slate-900"
                                >
                                    Confirm Password
                                </label>

                            </div>


                            <div className="flex items-start ">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-purple-500" />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-400 ">Remember me</label>
                            </div>

                            <button type="submit" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50  font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 ">SIGNUP</button>

                            <div className='text-white text-sm grid grid-cols-3'>
                                <p className='col-span-2'>Already have an account? </p>
                                <div>
                                    <button type='button' onClick={() => navigate('/login')} className='underline underline-offset-2'>Login now</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
