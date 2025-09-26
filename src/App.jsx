import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'

import Register from './pages/Register'

import UserRoutes from './user/routes/UserRoutes'
import AdminRoutes from './admin/routes/AdminRoutes'

function App() {
 
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Navigate to={'/home'} />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register />}></Route>

        <Route path='/home/*' element={<UserRoutes />}></Route>
        <Route path='/admin-dashboard/*' element={<AdminRoutes />}></Route> 
      

      </Routes>
    </Router>
  )
}

export default App
