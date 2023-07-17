import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Calculator from './main/Calculator.jsx'
const root = document.getElementById('root')

ReactDOM.render(
  <div>
    <div atributo="A" >
      <p atributo="B">Este foi um projeto</p>
      <p atributo="C">curso da udemy</p>
    </div>
    <h6>Projeto-Calculadora-Apple</h6>

    <Calculator />
  </ div>,
  root
);
