"use client"

import { useState, useRef, useEffect } from "react"
import { User, LogOut, Settings, ChevronDown } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { adminLogout } from "../../features/authSlice"
import { useDispatch } from "react-redux"
import { adminLogoutApi } from "../../features/api/logoutApi"
import { useLocation } from "react-router-dom"
import { userLogout } from "../../features/authSlice"
import { userLogoutApi } from "../../features/api/logoutApi"

export default function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const userInfo = useSelector((state) => state.user.userInfo)
  const adminInfo = useSelector((state) => state.admin.adminInfo)

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = async () => {
    if(location.pathname.startsWith("/admin")){
      console.log("admin-cookie and adminState is cleared")
      if(adminInfo){
      dispatch(adminLogout());
      const logout = await adminLogoutApi();
      console.log(logout);
      
      }
    }else{
      if(userInfo){
        console.log("admin-cookie and adminState is cleared")
        dispatch(userLogout());
        const logout = await userLogoutApi();
        console.log(logout);
        
      }

    }
   
     
    // dispatch(adminLogout())
    setIsDropdownOpen(false)
    // navigate("/login")
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center px-4 py-2">
          <div className="flex items-center text-orange-500 font-bold text-xl">
            <span className="mr-1">◉</span>
            ルックミール
          </div>
          {(userInfo || adminInfo) && (
            <div className="ml-auto relative">
              <button
                ref={buttonRef}
                className="p-2 rounded-full hover:bg-gray-100 flex items-center"
                onClick={toggleDropdown}
              >
                <User size={20} />
                <ChevronDown size={16} className={`ml-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium">{adminInfo?.name || userInfo?.name || "ユーザー"}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {adminInfo?.email || userInfo?.email || "admin@example.com"}
                    </p>
                  </div>

                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <Settings size={16} className="mr-2" />
                    設定
                  </a>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    ログアウト
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  )
}

