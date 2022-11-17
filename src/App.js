import Die from './Die';
import './App.css';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti';


function App() {
  function allNewDice(){
    const newDice=[]

    for (let i = 0; i < 10; i++) {

      newDice.push  ( generateNewDie())

    } return newDice

  }
  

function generateNewDie()
{
  return{
    value:Math.ceil(Math.random() * 6),
    isHeld:false,
    id:uuidv4()
  }
}

function clickNum(id)
{
  setDice(prevDice => prevDice.map(die => {
    return die.id === id ? {...die,isHeld:!die.isHeld} : die
  }))
}



function handleClick()
  {
    
    if(!tenzies)
    { 
      setCounter(prevState => prevState + 1)

      setDice(prevState => prevState.map(die => {
        return die.isHeld ? die :  generateNewDie()
      }))
    } else
    {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  const [dice,setDice] = React.useState(allNewDice())
  const newDieFace = dice.map(item => <Die handleDie={()=> clickNum(item.id)}  key={item.id} value={item.value} isHeld={item.isHeld}/>)

  const [tenzies,setTenzies] = React.useState(false)
  const [counter,setCounter] = React.useState(
    JSON.parse(localStorage.getItem("counter")|| [0])
  )
  

  React.useState(()=>{
    localStorage.getItem("counter",JSON.stringify(counter),[counter])
  })
  React.useEffect(()=>{
    
    const EachDice=dice.every(dice => dice.isHeld)
    const diceFace = dice[0].value
    const allVal = dice.every(dice => diceFace === dice.value )

    if(EachDice && allVal)
    {
      setTenzies(true)
      setCounter(0)
      
    }
  },[dice])

  return (
    <main> 
         <div className='header'>
         <h1 className='heading'>Tenzies</h1>
          <small className='desc'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</small>
         </div>
          <div className="dice-container">
                {newDieFace}
            </div>
            <p>You Have rolled dice <span className='counter' >{counter}</span> times</p>
            <button className='roll' onClick={handleClick}>{tenzies ? "New Game":"Roll"}</button>
            {
              tenzies && <Confetti /> 
            }
            
        </main>
  );
}

export default App;
