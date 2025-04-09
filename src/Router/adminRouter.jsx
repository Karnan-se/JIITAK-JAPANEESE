import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminProtectedRoute from '../features/protectedRoutes/adminProtectedRoutes';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../components/admin/dashboard';
import MainChartOne from '../components/admin/MainChart';
import UserTable from '../components/admin/UserTable';


export default function AdminRouter(){

    return (
        <>
        <Routes>
            <Route path='/login' element={<AdminLogin />}></Route>
            <Route element={<AdminProtectedRoute />}>
             <Route path='/' element={<AdminDashboard/>}>
                        <Route path='/' element={<MainChartOne />}> </Route>
                        <Route path='/user' element={<UserTable />}></Route>
                        
                        </Route>

            </Route>

        </Routes>
        </>
    )
}