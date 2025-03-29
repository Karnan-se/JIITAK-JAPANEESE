import LoginForm from "../components/user/Login"
import { adminApi } from "../features/api/axiosinstance"




export default function AdminLogin(){

    

    const adminLogin = async(email, password)=>{
        try {
            const adminLogin = await adminApi.post("/login", {email, password})
            
        } catch (error) {
            
        }
    }


    return(
        <>
        <LoginForm  adminLogin={adminLogin} />

        </>
    )
}