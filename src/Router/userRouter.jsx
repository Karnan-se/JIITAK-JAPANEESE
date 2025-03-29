import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPrivateRoute from '../features/protectedRoutes/userProtectedRoutes';
import RegistrationForm from '../components/user/Register';
import UserLogin from '../pages/UserLogin';
import UserDashboard from '../components/user/dashBoard';
import PasswordResetFormPage from '../pages/PasswordResetPage';
import ResetPasswordConfirm from '../components/user/ResetPassword';


export default function UserRouter(){

    return (
        <>
        <Routes>
            <Route path='/register' element={<RegistrationForm />}></Route>
            <Route path={"/login"} element={<UserLogin />}></Route>
            <Route path='/forgotpassword' element={<PasswordResetFormPage/>}> </Route>
            <Route path='/reset-password' element={<ResetPasswordConfirm/>}></Route>
           
            <Route element={<UserPrivateRoute />}>
            <Route path='/' element={<UserDashboard/>}></Route>

            </Route>
        </Routes>
        </>
    )
}