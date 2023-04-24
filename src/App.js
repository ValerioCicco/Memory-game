import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard/SingleCard';

const cardImages = [
  { "src": "/imgs/milan.png", matched: false },
  { "src": "/imgs/inter.png", matched: false },
  { "src": "/imgs/juventus.png", matched: false },
  { "src": "/imgs/lazio.png", matched: false },
  { "src": "/imgs/napoli.png", matched: false },
  { "src": "/imgs/roma.png", matched: false }
]

function App() {

  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)

  //SHUFFLE DELLE CARTE, RANDOMIZZARLE E RANDOMIZZARE L'ID DELLE CARTE CHE USEREMO COME CHIAVE
  /*Prendiamo le carte e duplichiamo per averne 12 (oggetti array)
    Math.random genera un numero casuale compreso tra 0 e 1:
    NEGATIVO = gli elementi rimangono nello stesso ordine dei due elementi che si sta confrontando;
    POSITIVO: cambierà l'ordine
    RISULTATO FINALE: avremo un array mischiato
    .map = per ogni elemento, aggiungiamo la proprietà ID (singola card come argomento) (...card = prendi tutte le card e avrann la proprietà ID)
    A ogni "Nuova Partita" le cards verranno rimescolate e il numero turni verrà azzerato
    La funzione la inseriamo all'interno del button con l'onClick
  */
  //SHUFFLE CARDS
  const shuffleCards = () => {
    

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // GESTIRE UNA SCELTA
  const handleChoice = (card) => {
    /* se è null, non abbiamo una scelta per choiceOne, se condizione è falsa, viene eseguita la condizione a destra dei ":" 
       se non è null allora ha un valore e quindi è già stata selezionata la prima scelta e sarà true, se è true, si verifica la condizione a sinistra dei ":"
    */
   // Risoluzione del bug per il quale se clicchi velocemente una carta, ti scopre anche la gemella associata, mettendo un ulteriore controllo sull'id della carta girata
    if(card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
  }

  // CONFRONTA 2 CARTE SELEZIONATE
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      //Eseguito il controllo e fino a quando non si capovolgono, disabled diventa true SOLO quando facciamo due scelte
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              /*questo restituirà un nuovo oggetto (in cui diffondiamo la proprietà della carta {src e matched} ma con la proprietà matched impostata a true)
               invece della carta originale, nel nuovo array a riga 57 e sarà vero quando le due carte trovate avranno la stessa ({src})
               In caso contrario ci facciamo restituire l'oggetto "card" invariato*/
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        //Aspetta un secondo e trova questa funzione che ripristinerà i turni
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  console.log(cards);

  // AZZERA SCELTE E INCREMENTO TURNI
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    //Quando resettiamo il turno, reimpostiamo la proprietà su "false"
    setDisabled(false)
  }

  // INIZIA UNA NUOVA PARTITA AUTOMATICAMENTE
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>Nuova partita</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}/>
        ))}
      </div>
      <p>Turni: {turns}</p>
    </div>
  );
}

export default App;
