// Crear un objeto de juego con un mazo de cartas
let game = {
  deck: [],
  players: [],
  currentPlayer: 0,
  currentRound: 1,
  maxRounds: 3,
  roundScores: []
};

// Inicializar el mazo de cartas
function initializeDeck() {
  let suits = ['♥', '♦', '♣', '♠'];
  let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  for (let suit of suits) {
    for (let value of values) {
      game.deck.push(value + suit);
    }
  }
}

// Barajar las cartas del mazo
function shuffleDeck() {
  for (let i = game.deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = game.deck[i];
    game.deck[i] = game.deck[j];
    game.deck[j] = temp;
  }
}

// Dividir el mazo en manos para cada jugador
function dealCards() {
  for (let i = 0; i < game.players.length; i++) {
    game.players[i].hand = game.deck.splice(0, 3);
  }
}

// Inicializar el juego y los jugadores
function initializeGame(numPlayers) {
  initializeDeck();
  shuffleDeck();
  game.players = [];
  for (let i = 1; i <= numPlayers; i++) {
    game.players.push({ name: 'Player ' + i, hand: [] });
  }
  dealCards();
}

// Determinar la carta más alta en una ronda
function determineHighestCard(cards) {
  let highestCard = cards[0];
  for (let i = 1; i < cards.length; i++) {
    let cardValue = cards[i].slice(0, -1);
    let highestValue = highestCard.slice(0, -1);
    if (cardValue === 'A') {
      highestCard = cards[i];
    } else if (cardValue === 'K' && highestValue !== 'A') {
      highestCard = cards[i];
    } else if (cardValue === 'Q' && highestValue !== 'A' && highestValue !== 'K') {
      highestCard = cards[i];
    } else if (cardValue === 'J' && highestValue !== 'A' && highestValue !== 'K' && highestValue !== 'Q') {
      highestCard = cards[i];
    } else if (parseInt(cardValue) > parseInt(highestValue)) {
      highestCard = cards[i];
    }
  }
  return highestCard;
}

// Jugar una ronda
function playRound() {
  let cardsInPlay = [];
  for (let i = 0; i < game.players.length; i++) {
    let cardPlayed = game.players[i].hand.pop();
    cardsInPlay.push(cardPlayed);
    console.log(game.players[i].name + ' played ' + cardPlayed);
  }
  let highestCard = determineHighestCard(cardsInPlay);
  console.log(highestCard + ' wins the round');
  let winningPlayerIndex = cardsInPlay.findIndex(card => card === highestCard);
  game.roundScores[game.currentRound - 1][winningPlayerIndex]++;
}