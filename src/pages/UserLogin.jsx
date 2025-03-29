import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/user/Login";
import { userApi } from "../features/api/axiosinstance";
import { setUserCredentials } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

import AdminHeader from "../components/admin/Header";


export default function UserLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfo);

  const userLoginDetails = async(email, password)=>{
        try {
            console.log(email , password  , "reached at finction" )
            const userLogin = await userApi.post("/jlogin", {email, password})
            console.log(userLogin.data)
            dispatch(setUserCredentials(userLogin.data.userDetails))
            navigate("/")
            return userLogin.data.userDetails

            
        } catch (error) {
            console.log(error)
            throw error; 
        }
    }
  return (
    <>
    
       <AdminHeader /> 

       <LoginForm adminLogin={userLoginDetails} /> 
    </>
  );
}
