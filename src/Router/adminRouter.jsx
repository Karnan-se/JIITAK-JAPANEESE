import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminProtectedRoute from '../../../project/src/Features/adminProtectedRoute';



export default function AdminRouter(){

    return (
        <>
        <Routes>
            <Route path='/login' element={<p>ADminLoginPage</p>}></Route>
            <Route element={<AdminProtectedRoute />}>
            <Route path='/' element={<p>adminDashboard</p>}></Route>

            </Route>

        </Routes>
        </>
    )
}