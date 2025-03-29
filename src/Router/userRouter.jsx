import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPrivateRoute from '../features/protectedRoutes/userProtectedRoutes';


export default function UserRouter(){

    return (
        <>
        <Routes>
           
            <Route element={<UserPrivateRoute />}>
            <Route path='/' element={<p>userDashBoard</p>}></Route>

            </Route>
        </Routes>
        </>
    )
}