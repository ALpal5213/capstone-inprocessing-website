import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { Login } from '../Login/Login'
import { CreateAccount } from '../Login/CreateAccount'
import { HomePage } from '../Home/HomePage'
import Profile from '../NavBar/Profile'
import AppNavBar from '../NavBar/AppNavBar'
import Map from '../Details/Map'
import { NotAuthorized } from './NotAuthorized'
import { DetailsPage } from '../Details/DetailsPage'
import {Footer} from '../Footer/Footer'


export const AllRoutes = () => {

    return (

        <Router>
            <AppNavBar />
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace={true} />} />
                <Route path='/login' element={< Login />}></Route>
                <Route path='/create-account' element={<CreateAccount/>}></Route>
                
                  <Route element={<ProtectedRoutes />}>
                  <Route path='/home' element={<HomePage/>}></Route>
                  <Route path='/details' element={<DetailsPage/>}></Route>
                  <Route path='/profile' element={<Profile/>}></Route>
                </Route>
                <Route path='*' element={<NotAuthorized/>}></Route>
            </Routes>
            <Footer/>
        </Router>

    )
}