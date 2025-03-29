

import { useState } from "react"
import AdminHeader from "./Header"
import AdminAside from "./Aside"

import { Outlet } from "react-router-dom"

const AdminDashboard = () => {
  


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      
      <AdminHeader/>

      {/* Main Content */}
      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <AdminAside/>
        

        <Outlet></Outlet>
        
        {/* <MainChartOne></MainChartOne> */}
        {/* Main Content */}
       
      </div>
    </div>
  )
}

export default AdminDashboard

