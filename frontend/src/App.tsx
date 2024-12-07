import React from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import checkAuth from "./utils/checkAuth.ts";
import NotFound from "./pages/NotFound.tsx";
import Navbar from "./components/Navbar.tsx";
import Cookies from 'js-cookie';

function App() {
    const isToken = checkAuth();
    const {pathname, search, hash} = window.location;
    const showNavbar = pathname === "/home" ? true : false;
    const isAuthenticated = Cookies.get('token');
    return (
        <>
            {showNavbar && <Navbar/>}
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
                    />
                    <Route path="/home" element={<ProtectedRoute isToken={isToken} option={0}>
                        <Home/>
                    </ProtectedRoute>}/>
                    <Route path="/login" element={<ProtectedRoute isToken={isToken} option={1}>
                        <Login/>
                    </ProtectedRoute>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
