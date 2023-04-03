import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserDataContext from "../context/UserDataContext";
import '../style/Login.css'
import Axios from "axios";
import logo from '../images/logo.jpg'


export default function Login (){
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const context = useContext(UserDataContext);
  const { setData } = context;

  const history = useHistory();

  const handelChange = ({ target  }) => {
    setUserLogin({
      ...userLogin,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    localStorage.removeItem('app');
    Axios.post("https://server-production-c67f.up.railway.app/login", {
      email: userLogin.email,
      password: userLogin.password,
    }).then((response) => {
      if (userLogin.email === 'admsimulador@gmail.com' && userLogin.password === 'simulador34AdmMaster') {
        return history.push(`/simulation/${userLogin.email}`);
      }
      alert(response.data.msg);
      setData(response.data.id);
      if (response.data.msg === 'Usuário logado') {
        history.push("/about")
      }
      const valorAtual = localStorage.getItem('app');

      // Verifica se o valor obtido é nulo ou indefinido
      if (valorAtual === null || valorAtual === undefined) {
        // Adiciona o novo item ao localStorage
        localStorage.setItem('app', JSON.stringify(response.data.id));
      }
    });
  }

  return (
    <>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous" /><div className="container-main">
      <div className="test">
        <div className="inputs-login">
          <img className="logo" src={ logo } alt="sss" />
        <h1 className="title">Bem vindo!</h1>
          <label htmlFor="email">
            <input className="input-email" type="text" name="email" id="email" placeholder="E-mail" onChange={ (e) => handelChange(e) } />
          </label>
          <label htmlFor="password">
            <input className="input-password" type="password" name="password" id="password" placeholder="Senha" onChange={ (e) => handelChange(e) } />
          </label>
          <div  className="password-msg">
            <Link to="/password">
              <p>Esqueci minha senha</p>
            </Link>
          </div>
          <button className="button-enter" onClick={ () => handleClick() }>ENTRAR</button>
        </div>
        <div className="politcy-button">
          <button className="newUserBtn" onClick={() => history.push('/new-user')}>Novo usuário? clique aqui.</button>
          <Link to="/privacy-policy">
            <p className="politcy-privacity">Política de Privacidade</p>
          </Link>
          <Link to="/terms">
            <p className="politcy-privacity">Termos de Uso</p>
          </Link>
        </div>
      </div>
    </div></>
  );
}