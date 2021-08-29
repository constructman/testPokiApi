import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import './index.css'

function App() {

  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="cardList">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App
