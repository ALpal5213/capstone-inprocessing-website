import { useState, useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { NotAuthorized } from "./NotAuthorized"
import { GlobalContext } from "../../App"
import Cookies from 'js-cookie'




export const AdminProtectedRoutes = () => {


    return Cookies.get('is_admin') ? <Outlet /> : <NotAuthorized />



}