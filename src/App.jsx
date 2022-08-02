import { useEffect, useState } from "react";
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [rollCount, setRollCount] = useState(0)
    const [newGame, setNewGame] = useState(false)
    const [gameText, setGameText] = useState("Tenzies!")
    const [bestTime, setBestTime] = useState(() => localStorage.getItem('bestTime'))
    const [startTime, setStartTime] = useState()
    
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }

      window.addEventListener('resize', handleWindowResize);

      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    useEffect(() => {
      
    }, [tenzies])

    function getWindowSize() {
      const {innerWidth, innerHeight} = window;
      return {innerWidth, innerHeight};
    }
    
    useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
        setTenzies(true)
        setRollCount(0)
        setGameText("You Won!!")
        setNewGame(false)
        
        const currentTime = (new Date().getTime() - startTime) / 1000
        if(!bestTime || bestTime > currentTime) {
          localStorage.setItem('bestTime', currentTime)
          setBestTime(currentTime)
        }
      }
    }, [dice])

    function generateNewDie() {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    }
    
    function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
        setRollCount(prevCount => prevCount + 1)
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
      <Die 
        key={die.id} 
        value={die.value}
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
      />
    ))
    
    function startGame() {
      setNewGame(true)
      setTenzies(false)
      setDice(allNewDice())
      setStartTime(new Date().getTime())
    }

    return (
      <main>
        {tenzies && <Confetti width={windowSize.innerWidth} height={windowSize.innerHeight}/>}
        {newGame ?
          ( <>
              {bestTime && <div className="best-time">Best Time: {bestTime} s</div>}
              <h1 className="title">Tenzies</h1>
              <p className="instructions">Roll until all dice are the same. 
              Click each die to freeze it at its current value between rolls.</p>
              <div className="dice-container">
                  {diceElements}
              </div>
              <button 
                  className="roll-dice" 
                  onClick={rollDice}
              >
                  {`Roll ${rollCount != 0 ? `(${rollCount})` : ''}`}
              </button>
            </>
          )
          :
            <>
              <h1 className="title">{gameText}</h1>
              <button onClick={startGame} className="new-game">New Game</button>
            </>
        }
      </main>
    )
}