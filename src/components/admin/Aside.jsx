import { Users, Gift } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function AdminAside() {
  return (
    <>
      <aside className="w-48 bg-orange-50 border-r border-orange-100 fixed h-full overflow-y-auto">
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="."
                end
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 ${
                    isActive
                      ? "bg-white border-l-4 border-orange-500 text-orange-500 shadow-sm"
                      : "text-gray-700 hover:bg-white"
                  }`
                }
              >
                <span className="mr-1.5 flex-shrink-0">◻</span>
                <span className="text-xs whitespace-nowrap">ダッシュボード</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="user"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 ${
                    isActive
                      ? "bg-white border-l-4 border-orange-500 text-orange-500 shadow-sm"
                      : "text-gray-700 hover:bg-white"
                  }`
                }
              >
                <Users size={14} className="mr-1.5 flex-shrink-0" />
                <span className="text-xs whitespace-nowrap">登録ユーザー</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login/winners"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 ${
                    isActive
                      ? "bg-white border-l-4 border-orange-500 text-orange-500 shadow-sm"
                      : "text-gray-700 hover:bg-white"
                  }`
                }
              >
                <Gift size={14} className="mr-1.5 flex-shrink-0" />
                <span className="text-xs whitespace-nowrap">当選者</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login/admins"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 ${
                    isActive
                      ? "bg-white border-l-4 border-orange-500 text-orange-500 shadow-sm"
                      : "text-gray-700 hover:bg-white"
                  }`
                }
              >
                <Users size={14} className="mr-1.5 flex-shrink-0" />
                <span className="text-xs whitespace-nowrap">運営管理者</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
