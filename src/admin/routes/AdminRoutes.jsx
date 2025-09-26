import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from '../../utils/PrivateRoutes'
import RoleBasedRoutes from '../../utils/RoleBasedRoutes'
import AdminDashboard from '../../pages/AdminDashboard'
import ProductView from '../ProductView'
import UserView from '../UserView'
import EditUser from '../EditUser'
import OrderView from '../OrderView'
import Settings from '../Settings'
import EditProduct from '../EditProduct'
import AddProduct from '../AddProduct'
import OrderDetail from '../OrderDetail'
import Dashboard from '../Dashboard'


const AdminRoutes = () => { 
  return (
    <Routes>
      <Route path='/' element={  
          <PrivateRoutes >
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes> 


        }>
          <Route index element={<Dashboard />}></Route> 
          <Route path='view-products' element={<ProductView />}></Route>


          <Route path='edit-product/:id'  element={<EditProduct />}></Route>  
          <Route path='add-product'  element={<AddProduct />}></Route>  

          <Route path='view-users' element={<UserView />}></Route>
          <Route path='edit-user/:id' element={<EditUser />}></Route>
          
          <Route path='view-orders' element={<OrderView  />}></Route>
          <Route path='view-order/:id' element={<OrderDetail  />}></Route>
          <Route path='settings' element={<Settings />}></Route>
 

        </Route>
    </Routes>
  )
}

export default AdminRoutes
