import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, useNavigate } from "react-router-dom";
import walletApi from "../../utils/requestApi";
import './login.css';


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
  
  const login = async () => {
      const { status, data } = await walletApi('POST', 'login', { email, password });
      console.log(status);

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
    <div className="login-page">
      <Form className="form-container">
        <FloatingLabel
          controlId="floatingInput"
          label="Email"
          className="mb-3 light-color-text"
        >
          <Form.Control
            size="lg"
            value={ email }
            type="email"
            placeholder="Email"
            className="input"
            onChange={ handleEmailChange }
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="light-color-text mb-3"
        >
          <Form.Control
            size="lg"
            type="password"
            className="input"
            placeholder="Password"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </FloatingLabel>

        { LoginSuccesfull === false && <span>Email ou Senha incorretos</span> }

        <Button
          size="lg"
          type="button"
          disabled={ isDisabled }
          onClick={ login }
        >
          Entrar
        </Button>

        <Link to="/register">Criar conta</Link>
        </Form>
    </div>
  );
}

export default Login