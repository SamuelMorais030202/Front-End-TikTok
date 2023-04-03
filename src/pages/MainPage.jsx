import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import copy from 'clipboard-copy'; // Importando clipboard-copy

import '../style/MainPage.css';
import imageFundNull from '../images/logoSemFundo.png';

export default function MainPage() {
  const [date, setDate] = useState({});
  const [pts, setPts] = useState(0);

  const test = localStorage.getItem('app');
  const history = useHistory();

  useEffect(()  => {
    Axios.post("https://server-production-c67f.up.railway.app/updates", {
      idUsuario: test,
    }).then((response) => {
      setDate(response.data[0]);
    });
    Axios.post("https://server-production-c67f.up.railway.app/pontos", {
      idUsuario: test,
    }).then((response) => {
      const pstInicial = Object.values(response.data[0]);
      setPts(pstInicial);
    });
  }, [test, pts]);

  const handleClick = () => {
    if (pts < 40) {
      Axios.post("https://server-production-c67f.up.railway.app/ponto", {
        idUsuario: test,
      }).then((response) => {
        if (response.data.msg === 'Total') {
          history.push('/watchVieos');
        }
        if (response.data.msg === 'Ponto incrementado') {
          history.push('/watchVieos');
        }
      });
      Axios.post("https://server-production-c67f.up.railway.app/pontos", {
        idUsuario: test,
      }).then((response) => {
        const pstInicial = Object.values(response.data[0])
        setPts(pstInicial);
      });
    } else {
      history.push('/watchVieos');
    }
  }

  const handleCopyClick = () => {
    copy('https://secure.doppus.com/pay/PZ0008MZ0008GZOHOBB');
    alert("Link copiado com sucesso para adquirir mais pontos envie o link para seus amigos!");
    Axios.post("https://server-production-c67f.up.railway.app/compartilhar", {
      idUsuario: test,
    });
  }

  const handleHabilit = () => {
  if (pts * 7.5 === 300) {
    history.push('/privete');
    Axios.post("https://server-production-c67f.up.railway.app/compartilhar", {
      idUsuario: test,
    });
  } else {
    alert('Você ainda não pode trocar seus pontos');
  }
  };

  return (
    <div className="body-main-page">
      <header className="header-main-page">
        <h4 className="name-main-page">
          Olá
          {'  '}
          {date.nome}
        </h4>
        <p>{ pts * 7.5 }</p>
        {/* <p>{ `${ pts * 7.5 } pts` }</p> */}
      </header>
      <div className="main-main-page">
        <img src={ imageFundNull } alt="logo" className="imgNullFund" />
        <div className="container-main-page">
          <div className="description-main-page">
            <p>{ pts * 7.5 }</p>
            <p className="meta-main-page">Meta de troca</p>
          </div>
          <div className="bara-main-page">
            <div className="pts-user-main-page" style={ { width: `${pts * 7.5}px` } }></div>
          </div>
        </div>
        <div className="buttons-main-page">
          <button className="trocar-pontos-main-page" onClick={ () => handleHabilit()}>Quero trocar meus pontos</button>
          <button className="compartilhar-main-page" onClick={ () =>  handleCopyClick() }>Compartilhar com os amigos</button>
          <button className="assistir-main-page" onClick={ () => handleClick() }>Assistir vídeos</button>
        </div>
      </div>
    </div>
  )
}