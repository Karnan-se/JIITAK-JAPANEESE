import { adminApi } from "./axiosinstance"



export const getUserData = async()=>{
    try {
        const userData =  await adminApi.get("/getUserData")
        console.log(userData.data)
        return userData.data.userData
    } catch (error) {
        console.log(error)

        throw error
        
    }
}
