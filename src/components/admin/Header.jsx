import { User } from "lucide-react"


export default function AdminHeader(){
    return(
        <>
        <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center px-4 py-2">
          <div className="flex items-center text-orange-500 font-bold text-xl">
            <span className="mr-1">◉</span>
            ルックミール
          </div>
          <div className="ml-auto">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>
        </>
    )
}