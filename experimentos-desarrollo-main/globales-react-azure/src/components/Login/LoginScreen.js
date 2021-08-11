import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


import './LoginScreen.css'
import logo from '../../images/logotm.png'


export const LoginScreen = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <div className="login__main-cointainer">
            <img
                className="login__logo"
                src={logo}
                alt="Tecmilenio | CIMA | 2025"
            />

            <button
            className="btn btn-success btn-block btn-lg mt-5"
            onClick={() => loginWithRedirect()}
            >
                Iniciar sesion
            </button>
        </div>
    )
}
