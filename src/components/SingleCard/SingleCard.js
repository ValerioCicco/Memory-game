import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        //Se NON è disabilitata allora possiamo fare quella scelta
        if(!disabled) {
            handleChoice(card)
        }
        
    }

    return(
        <div className="card">
            {/* proprietà flipped se true, applica la classe flipped, altrimenti stringa vuota */}
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" /> {/*abbiamo accesso alla proprietà src di card perchè abbiamo passato card come prop (riga 3) */}
                <img className="back" src="/imgs/cover.png" onClick={handleClick} alt="card back"/>
            </div>
        </div>
    );
}

export default SingleCard;