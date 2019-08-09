import React, {useEffect, useState} from 'react';
import './App.css';
import Canvas from './canvas/Canvas'

const App = () => {

  const [currentScore, setScore] = useState(0)
  const [currentSpeed, setSpeed] = useState(1000)




  return (
    <div className="App">
      <p>{`score: ${currentScore}`}</p>
      <p>{`speed: ${currentSpeed}`}</p>
      <Canvas
        speed={currentSpeed}
        getScore={(score) => {
          console.error('Emeric::App::AAA:: =>', )
          setScore(currentScore + score)
          setSpeed(currentScore % 300 === 0 ? currentSpeed : currentSpeed - 100)
        }}
      />
    </div>
  );
}

export default App;
