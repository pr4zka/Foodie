import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Restaurants from '../pages/Restaurants';
import { lazy } from 'react';
import Session from '../pages/UserSession/Session';
import Home from '../pages/home/Home';
import RestaurantDetail from '../pages/RestDetail/RestaurantDetail';
const Register = lazy(() => import('../components/Register/Register'));
const Login = lazy(() => import('../components/Login/Login'));

function AppRoutes() {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path='/' element={<Session />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/restaurant/:id/details' element={<RestaurantDetail/>}/>
            <Route path='/restaurants' element={<Restaurants />} />
        </Routes>
        </>
    );
};

export default AppRoutes;