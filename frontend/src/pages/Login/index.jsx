import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import walletApi from "../../utils/requestApi";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [LoginSuccesfull, setLoginSuccesfull] = useState('did not try yet');
    const navigate = useNavigate();

    useEffect(() => {
        const enabledButton = () => {
          const minimumPassword = 6;
          const regExp = /\w+@[a-z]+\.com/g;
    
          if (email.match(regExp) && password.length >= minimumPassword) {
            setIsDisabled(false);
          } else {
            setIsDisabled(true);
          }
        };
    
        enabledButton();
      }, [email, password]);
    
    const handleEmailChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
    };
    
    const handlePasswordChange = ({ target }) => {
    const { value } = target;
    setPassword(value);
    };
    
    const login = () => {
        const { status, data } = walletApi('POST', 'login', { email, password });

        if(status === 401) {
            setLoginSuccesfull(false);
        }
        
        if(status === 200) {
            localStorage.setItem('token', data.token);
            navigate("/home");
        }
        
        if(status === 400) {
            window.alert("Servidor indisponivel no momento");
        }
    }

    return(
        <div className="login-container">
            <input
                type="email"
                value={ email }
                placeholder="Digite seu email"
                onChange={ handleEmailChange }
            />
            <input
                type="password"
                value={ password }
                placeholder="Digite sua senha"
                onChange={ handlePasswordChange }
            />
            { LoginSuccesfull === false && <span>Email ou Senha incorretos</span> }
            <button
                type="button"
                disabled={ isDisabled }
                onClick={ login }
            >
                Entrar
            </button>
            <Link to="/register">Criar conta</Link>
        </div>
    );
}

export default Login