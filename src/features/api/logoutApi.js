import { adminApi } from "./axiosinstance";
import { userApi } from "./axiosinstance";

const logout = (api) => {
  return async () => {
    const response = await api.patch("/logout");
    console.log(response.data.logout);
    return response.data.logout;
  };
};

export const adminLogoutApi = logout(adminApi); 
export const userLogoutApi = logout(userApi);   
