
import {useSelector} from "react-redux"
import { Navigate, Outlet } from "react-router-dom"




export default function AdminProtectedRoute(){

    const userInfo = useSelector((state)=> state.user.userInfo)

    return userInfo ? <Outlet/> : <Navigate to="/admin/login" replace />;
}