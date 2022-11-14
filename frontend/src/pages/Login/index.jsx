import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from "react-router-dom";
import walletApi from "../../utils/requestApi";
import { BsCircleFill } from "react-icons/bs";
import "./login.css";


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
      <header className="fixed-top header mt-4">
        <div className="ms-5 ps-5 d-flex align-items-center">
          <BsCircleFill className="text-primary header-dot ms-5"/>
          <h3 className="ms-2 light-color-text">MyWallet app <span className="text-primary">.</span></h3>
        </div>
      </header>
      <div className="left-content mb-5">
        <h4 className="left-subtitle ms-5 ps-2">START FOR FREE</h4>
        <h1
          className="left-title light-color-text ms-4 ps-4 mt-3 mb-4"
        >
          Welcome back<span className="text-primary">.</span>
        </h1>
        <h4 className="left-subtitle ms-5 ps-2 mb-5 pb-4">Enter your email and password</h4>
        <Form className="form-container">
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3 light-color-text input-container"
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
            className="light-color-text mb-5 input-container"
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

          <div className="btn-container">
            <Button
              size="md"
              type="button"
              className="btn btn-create-account light-color-text"
              onClick={() => navigate('/register')}
            >
              Create account
            </Button>
            <Button
              size="md"
              type="button"
              className="btn btn-login"
              disabled={ isDisabled }
              onClick={ login }
            >
              Login
            </Button>
          </div>
        </Form>
        </div>
    </div>
  );
}

export default Login