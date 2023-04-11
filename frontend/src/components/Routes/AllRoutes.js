import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { Login } from '../Login/Login'
import { HomePage } from '../Home/HomePage'




export const AllRoutes = () => {

    return (

        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace={true} />} />
                <Route path='/login' element={< Login />}></Route>
                <Route path='/Home' element={<HomePage/>}></Route>
                {/* <Route element={<ProtectedRoutes />}> */}
                    {/* <Route path='/home' element={< Home />}></Route>
                    <Route path='/account' element={< Account />}></Route>
                    <Route path='/users' element={< Users />}></Route> */}
                {/* </Route> */}
               
                {/* <Route path='*' element={<NotAuth/>}></Route> */}
            </Routes>
        </Router>

    )
}