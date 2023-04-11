import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Login } from './Login'
import { Home } from './Home'
import { ProtectedRoutes } from './ProtectedRoutes'
import { Nav } from 'react-bootstrap'
import { NotAuth } from './NotAuth'
import { Account } from './Account'
import { VisitorUsers } from './VisitorUsers'
import { VisitorHome } from './VisitorHome'
import { Users } from './Users'



export const AllRoutes = () => {

    return (

        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace={true} />} />
                <Route path='/login' element={< Login />}></Route>
                {/* <Route element={<ProtectedRoutes />}> */}
                    <Route path='/home' element={< Home />}></Route>
                    <Route path='/account' element={< Account />}></Route>
                    <Route path='/users' element={< Users />}></Route>
                {/* </Route> */}
                <Route path='visitorhome' element={<VisitorHome/>}></Route>
                <Route path='visitorusers' element={<VisitorUsers/>}></Route>
                <Route path='*' element={<NotAuth/>}></Route>
            </Routes>
        </Router>

    )
}