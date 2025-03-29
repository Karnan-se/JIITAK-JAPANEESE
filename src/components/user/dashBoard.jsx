import AdminHeader from "../admin/Header"
import { useSelector } from "react-redux"


export default function UserDashboard(){
    const userInfo = useSelector((state)=> state.user.userInfo)


    return (
        <>
        <AdminHeader></AdminHeader>
        <p className="w-full text-3xl ">Welcome {userInfo.nickname} </p>
        </>


    )
}