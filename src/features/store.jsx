import {configureStore} from  "@reduxjs/toolkit"
import { userAuthReducer , adminAuthReducer  } from "./authSlice";


export const store = configureStore({
    reducer:{
        admin:adminAuthReducer,
        user:userAuthReducer,

    }
})
export default store;