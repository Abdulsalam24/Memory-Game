import { useEffect, useState } from 'react';
import Single from './component/Single';

const cardImgs = [
  {'src' : 'img/helmet-1.png' , matched : false},
  {'src' : 'img/potion-1.png', matched : false},
  {'src' : 'img/ring-1.png', matched : false},
  {'src' : 'img/scroll-1.png' , matched : false},
  {'src' : 'img/shield-1.png' , matched : false},
  {'src' : 'img/sword-1.png' , matched : false}
]

function App() {
  const [cards , setCards] = useState([]);
  const [turns , setTurns] = useState(0);
  const [choiceOne , setChoiceOne] = useState(null);
  const [choiceTwo , setChoiceTwo] = useState(null);
  const [disabled , setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImgs,...cardImgs]
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card , id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handlechoice
  const handleChoice = (card)=> {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
            return prevCards.map(card =>{
              if(card.src === choiceOne.src){
                return {...card ,matched : true}
              }else{
                return card
              }
            })
        })
        resetTurn()
      }else{
        console.log('not match')
        setTimeout(()=>{
          resetTurn()
        },1000)
      }

    }
  },[choiceOne,choiceTwo ])

  //reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //restart after load
  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="app">
      <div className="match">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>Start New Game :)</button>
      </div>
      <div className="grid">
        {cards.map(card=>(
          <Single
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className='turns'>Turns {turns}</p>
    </div>

  );
}
 
export default App;