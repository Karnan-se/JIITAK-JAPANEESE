import { userApi } from "./axiosinstance"


export const passswordreset = async(email)=>{
 try {
    const sendEmail = await userApi.post("/passswordreset", {email})
    console.log(sendEmail.data.message)
    return sendEmail.data.message
     
 } catch (error) {
    console.log(error)
    throw error

 }

}

export const verifyToken = async(token, id , newPassword)=>{
   try {
      console.log(token , id, password  ,  "token" , "id" , "password")
      const verify = await userApi.post("/verify" , {token , id , newPassword})
      console.log(verify.data)
      return verify.data
      
   } catch (error) {
      console.log(error)
      throw error
      
   }
}