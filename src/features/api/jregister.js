import { userApi } from "./axiosinstance"


export const Jregister = async(userData) =>{
    try {
        const userRegister = await userApi.post("/jregister" , {...userData})
        console.log(userRegister.data.newUser)
        return userRegister.data.newUser
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}