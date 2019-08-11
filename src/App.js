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

          let newSpeed = currentSpeed - 100 >= 100 ? currentSpeed - 100 : currentSpeed
          setSpeed((currentScore % 300 === 0) ? currentSpeed : newSpeed)
        }}
      />
    </div>
  );
}

export default App;
