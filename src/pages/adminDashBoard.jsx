import { Outlet } from "react-router-dom"
import AdminHeader from "../components/admin/Header"
import AdminAside from "../components/admin/Aside"


export default function AdminDashBoard(){

    return(
        <>
        <div className="flex flex-col min-h-screen bg-gray-50">
             <AdminHeader/>
            
        </div>
        

        </>
    )
}