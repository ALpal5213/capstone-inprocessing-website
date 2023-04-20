import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { Login } from '../Login/Login'
import { CreateAccount } from '../Login/CreateAccount'
import { HomePage } from '../Home/HomePage'
import { ManageTasks } from '../Manage/ManageTasks/ManageTasks'
import Profile from '../NavBar/Profile'
import AppNavBar from '../NavBar/AppNavBar'
import Map from '../Details/Map'
import { NotAuthorized } from './NotAuthorized'
import { ThemeHandler } from '../ThemeHandler'
import { DetailsPage } from '../Details/DetailsPage'
import {Footer} from '../Footer/Footer'
import { AdminProtectedRoutes } from './AdminProtectedRoutes'
import {ManageSubordinates} from '../Manage/ManageSubordinates/ManageSubordinates' 

export const AllRoutes = () => {

    return (
        
        
        <Router>
            <AppNavBar />
           
            <ThemeHandler/>
           
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace={true} />} />
                <Route path='/login' element={< Login />}></Route>
                <Route path='/create-account' element={<CreateAccount/>}></Route>
                
                <Route element={<ProtectedRoutes />}>
                    <Route path='/home' element={<HomePage/>}></Route>
                    <Route path='/details' element={<DetailsPage/>}></Route>
                    <Route path='/profile' element={<Profile/>}></Route>
                    <Route element={<AdminProtectedRoutes />}>
                        <Route path='/manage-all' element={<ManageTasks />}></Route>
                        <Route path='/manage/subordinates' element={<ManageTasks />}></Route>
                        <Route path='/manage/unit' element={<ManageTasks />}></Route>
                    </Route>
                </Route>
                <Route path='*' element={<Login/>}></Route>
            </Routes>
            <Footer/>
        </Router>
        

    )
}