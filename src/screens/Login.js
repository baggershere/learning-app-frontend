import React from 'react'
import Footer from '../components/Footer';
import LoginForm from '../components/login/LoginForm';
import Navbar from '../components/Navbar'
const Login = () => {
    return (
        <div style={{minHeight: "100vh", display:"grid",  gridTemplateRows: "auto 1fr auto"}}>
            <Navbar />
            <LoginForm/>
            <Footer/>
        </div>
    )
}

export default Login
