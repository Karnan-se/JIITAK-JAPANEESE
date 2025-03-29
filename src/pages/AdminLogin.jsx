import LoginForm from "../components/user/Login"
import { adminApi } from "../features/api/axiosinstance"
import AdminHeader from "../components/admin/Header"
import { useSelector } from "react-redux"
import { setAdminCredentials } from "../features/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"




export default function AdminLogin(){
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const adminInfo = useSelector((state)=>state.admin.adminInfo)

    

    const adminLogin = async(email, password)=>{
        try {
            const adminLogin = await adminApi.post("/login", {email, password})
            dispatch(setAdminCredentials(adminLogin.data.adminDetals))
            navigate("/admin")

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