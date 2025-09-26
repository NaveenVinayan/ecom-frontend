import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from '../../utils/PrivateRoutes'
import RoleBasedRoutes from '../../utils/RoleBasedRoutes'
import UserHome from '../../pages/UserHome'
import Hero from '../components/home/Hero'
import ProductList from '../components/product/ProductList'
import ProductDetail from '../components/product/ProductDetail'
import AccountDetails from '../components/account/AccountDetails'
import EditAccount from '../components/account/EditAccount'
import Checkout from '../components/view/Checkout'
import UserOrders from '../components/view/UserOrders'
import Wishlist from '../components/view/Wishlist'



const UserRoutes = () => {
  return (
    <Routes>
      {/* Public section */}
      <Route path='/' element={<UserHome />}>
        <Route index element={<Hero />}></Route>
        <Route path='/products-list' element={<ProductList />}></Route>
        <Route path='/products-list/detail/:id' element={<ProductDetail />}></Route>

      </Route>

       {/* Protected section */}
      <Route path='/' element={
        <PrivateRoutes >
          <RoleBasedRoutes requiredRole={["user", "admin"]}>
            <UserHome />
          </RoleBasedRoutes>
        </PrivateRoutes>}>

        <Route path='/detail/checkout/:id' element={<Checkout />}></Route>
        <Route path='/account-details' element={<AccountDetails />}></Route>
        <Route path='/edit-account' element={<EditAccount />}></Route>
        <Route path='/orders' element={<UserOrders />}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>


      </Route>
    </Routes>
  )
}

export default UserRoutes
