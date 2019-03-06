// import dependences and data
import React, { Component } from 'react';
import cardData from '../clickCards.json';
/* 
{
  id: 1,
  image: "./images/ryu.jpg",
  clicked: false,
} 
*/

class Game extends Component {
  state = {
    cardData: [...cardData],
    currentScore: 0,
    topScore: 0
  };

  // create method to handle clicking on a card
  handleCardClick = cardId => {
    // create a flag variable to check if we're correct or not
    let isCorrect = false;

    // make a copy of the cardData from state
    const cardData = [...this.state.cardData];

    // loop over that copied array and find the object with the id you clicked on
    // check if card you clicked on has been clicked before
    // if no => set isCorrect to true and set the card's clicked status to true
    cardData.forEach(card => {
      if (card.id === cardId) {
        if (!card.clicked) {
          isCorrect = true;
          card.clicked = true;
        }
      }
    });

    // check if isCorrect is true or false
    // if true => run logic for handling a correct guess
    // if false => run logic for handling an incorrect guess
    isCorrect ? this.handleCorrect(cardData) : this.handleIncorrect(cardData);
  };

  handleCorrect = cardData => {
    // shuffle cards
    const shuffledCards = cardData.sort(() => 0.5 - Math.random());

    // get current score and add 1 to it
    const currentScore = this.state.currentScore + 1;

    let topScore = this.state.topScore;

    // check if current score is greater than topScore
    if (currentScore > topScore) {
      topScore = currentScore;
    }

    this.setState({
      cardData: shuffledCards,
      currentScore: currentScore,
      topScore: topScore
    });
  };

  handleIncorrect = cardData => {
    const shuffledCards = cardData.sort(() => 0.5 - Math.random());

    // reset all cards to not be clicked
    shuffledCards.forEach(card => (card.clicked = false));

    this.setState({
      cardData: shuffledCards,
      currentScore: 0
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark d-flex justify-space-between">
          <span className="navbar-brand mb-0">Clicky Game</span>
          <span className="scoreInfo text-light">
            Current Score: {this.state.currentScore} || Top Score: {this.state.topScore}
          </span>
        </nav>
        <div className="jumbotron jumbotron-fluid bg-warning text-dark text-center">
          <h1>Welcome to the clicky game!</h1>
          <p>Click on a card to get started. Don't click on the same card twice.</p>
        </div>
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            {/* print out cards here */}
            {this.state.cardData.map(card => {
              return (
                <div className="col-12 col-sm-3 col-md-2" key={card.id}>
                  <img
                    src={card.image}
                    alt={card.name}
                    className="img-fluid img-thumbnail rounded"
                    onClick={() => this.handleCardClick(card.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// export Game component
export default Game;
