import LoginForm from "../components/user/Login"
import { adminApi } from "../features/api/axiosinstance"
import AdminHeader from "../components/admin/Header"
import { useSelector } from "react-redux"




export default function AdminLogin(){


    const adminInfo = useSelector((state)=>state.admin.adminInfo)

    

    const adminLogin = async(email, password)=>{
        try {
            const adminLogin = await adminApi.post("/login", {email, password})
            return adminLogin.data.adminDetals
            
        } catch (error) {
            console.log(error)
            throw error; 
        }
    }



    return(
        <>

        <AdminHeader />
        
        <LoginForm  adminLogin={adminLogin} />

        </>
    )
}