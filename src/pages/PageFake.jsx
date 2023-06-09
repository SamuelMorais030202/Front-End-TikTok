import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';

import '../style/MainPage.css';
import imageFundNull from '../images/logoSemFundo.png';
import { useHistory } from 'react-router';

export default function PageFake(props) {
  const [points, setPoints] = useState(0);

  const history = useHistory();

  const handleChangePoints = () => {
    if (points === 40) {
      history.push(`/privete-simulation/${points}`);
      localStorage.setItem('points', 0);
      setPoints(0);
    } else {
      alert('Você ainda não pode trocar seus pontos');
    }
  }

  const handleCopyClick = () => {
    copy('https://secure.doppus.com/pay/PZ0008MZ0008GZOHOBB');
    alert("Link copiado com sucesso para adquirir mais pontos envie o link para seus amigos!");
  }

  useEffect(() => {
    const valuePoints = localStorage.getItem('points');
    if (valuePoints !== null) {
      setPoints(parseInt(valuePoints));
    }
  }, []);

  const handleClick = () => {
    if (points < 40) {
      const sumePoints = points + 1
      setPoints(sumePoints);
      localStorage.setItem('points', sumePoints);
      history.push('/watchVieos');
    }
  }

  return (
    <div className="body-main-page">
      <header className="header-main-page">
        <h4 className="name-main-page">
          Olá
          {'  '}
          Douglas
        </h4>
        <p className="pts-main-page">
          { points * 7.5 }
          {' '}
          pts
        </p>
      </header>
      <div className="main-main-page">
        <img src={ imageFundNull } alt="logo" className="imgNullFund" />
        <div className="container-main-page">
          <div className="description-main-page">
          <p>{ points * 7.5 } pts</p>
            <p className="meta-main-page">Meta de troca</p>
          </div>
          <div className="bara-main-page">
            <div className="pts-user-main-page" style={ { width: `${points * 7.5}px` } }></div>
          </div>
        </div>
        <div className="buttons-main-page">
          <button className="trocar-pontos-main-page" onClick={ () => handleChangePoints() }>Quero trocar meus pontos</button>
          <button className="compartilhar-main-page" onClick={ () =>  handleCopyClick() }>Compartilhar com os amigos</button>
          <button className="assistir-main-page" onClick={ () => handleClick() }>Assistir vídeos</button>
        </div>
      </div>
    </div>
  )
}