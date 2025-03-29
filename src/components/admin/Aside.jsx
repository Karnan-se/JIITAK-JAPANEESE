import {  Users, Gift } from "lucide-react"
import { NavLink } from "react-router-dom"


export default  function AdminAside(){

    return(
        <>
        <aside className="w-48 bg-orange-50 border-r border-orange-100 fixed h-full">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="." end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 ${
                  isActive ? "bg-white border-l-4 border-orange-500 text-orange-500 shadow-sm" : "text-gray-700 hover:bg-white"
                }`
              }
            >
              <span className="mr-3">◻</span>
              ダッシュボード
            </NavLink>
          </li>

          <li>
            <NavLink
              to="user"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 ${
                  isActive ? "bg-white border-l-4 border-orange-500 text-orange-500 shadow-sm" : "text-gray-700 hover:bg-white"
                }`
              }
            >
              <Users size={18} className="mr-3" />
              登録ユーザー
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login/winners"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 ${
                  isActive ? "bg-white border-l-4 border-orange-500 text-orange-500 shadow-sm" : "text-gray-700 hover:bg-white"
                }`
              }
            >
              <Gift size={18} className="mr-3" />
              当選者
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login/admins"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 ${
                  isActive ? "bg-white border-l-4 border-orange-500 text-orange-500 shadow-sm" : "text-gray-700 hover:bg-white"
                }`
              }
            >
              <Users size={18} className="mr-3" />
              運営管理者
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
        
        </>
    )
}