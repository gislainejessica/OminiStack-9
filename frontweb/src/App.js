import React from 'react'
import api from './services/api'
import './App.css'
import logo from './assets/logo.svg'

function App() {
  return (
    <div className="classe container">
      <img src={logo} alt="" className="logo"/>
      <div className="content">
        <p>
          Ofereça <strong> spots </strong> 
          para programadores e encontre 
          <strong> talentos </strong> para a sua empresa
        </p>
        <form>
          <label htmlFor="email"> E-MAIL * </label>
          <input 
            id="email" 
            type="email" 
            placeholder="Seu melhor email"
          />
          <button className="btn" type="submit"> Entrar </button>
        </form>
      </div>
    </div>
  );
}

export default App;
