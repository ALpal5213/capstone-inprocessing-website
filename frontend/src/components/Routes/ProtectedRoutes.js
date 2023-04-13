import { useState, useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { NotAuthorized } from "./NotAuthorized"
import { GlobalContext } from "../../App"
import Cookies from 'js-cookie'




export const ProtectedRoutes = () => {
    let { userAuth, setUserAuth } = useContext(GlobalContext)
    

    if ( Cookies.get('session_id') ) {
        let cookie = Cookies.get('session_id');
        console.log(cookie)

        fetch(`http://localhost:3001/sessionId/${cookie}`)
            .then(res => res.json())
            .then(data => {
                setUserAuth(data.message)
            })

    }


    return userAuth ? <Outlet /> : <NotAuthorized />



}