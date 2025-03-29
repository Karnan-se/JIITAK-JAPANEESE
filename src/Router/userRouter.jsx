import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPrivateRoute from '../features/protectedRoutes/userProtectedRoutes';
import AdminDashboard from '../components/admin/dashboard';
import MainChartOne from '../components/admin/MainChart';

export default function UserRouter(){

    return (
        <>
        <Routes>
            <Route path='/login' element={<AdminDashboard/>}>
            <Route path='/login/' element={<MainChartOne />}> </Route>
            
            </Route>
            <Route element={<UserPrivateRoute />}>
            <Route path='/' element={<p>userDashBoard</p>}></Route>

            </Route>
        </Routes>
        </>
    )
}