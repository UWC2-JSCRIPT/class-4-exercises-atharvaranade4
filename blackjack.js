const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name){
    this.name = name;
    this.hand = []
  }
  drawCard = () =>{
    //get a random index between 0-52
    const cardIndex = Math.ceil(Math.random()*blackjackDeck.length);
    //use index to get random card
    const drawnCard = blackjackDeck[cardIndex];
    //push the card to hand array
    this.hand.push(drawnCard)   
  }
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('dealer') ; // TODO
const player = new CardPlayer('player'); // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
  let total = 0;
  let isSoft = true;
  let firstAce = true;
  
  //loop through the hand
  hand.forEach(card =>
  { 
    //assume ACE value -> 11 isSoft = true
    if(card.displayVal === 'Ace'){

      if(firstAce){
        isSoft = true;
        total += card.val;
        firstAce = true;
      }

      //second or more ace
      else{
        //assume ACE value is 1 and add that to total
        total++;
        isSoft = false;
      };
    }

    else{
      //No Ace
      total += card.val
    }
  })

  // if total exceeds 21, reduce 10; 
  // Ace value -> 1 isSoft = false
  if (firstAce = true && total > 21){
    isSoft = false;
    total -= 10;
  }

  //total is int
  //isSoft is bool
  blackJackScore = {total, isSoft}
  return blackJackScore
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  let dealerblackJackScore = calcPoints(dealerHand)

  let case01 = dealerblackJackScore.total <= 16
  let case02 = dealerblackJackScore.total === 17 && dealerblackJackScore.isSoft;
  if (case01 || case02){
    return true
  }

  return false
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
  //const result = 
  if (playerScore > dealerScore){
    result = 'Player Wins'
  }
  else if (playerScore === dealerScore){
    result = 'Tie'
  }
  else{
    result = 'Dealer Wins'
  }

  return `Score: 
  Player: ${playerScore},
  Dealer: ${dealerScore},
  Winner: ${result}`
}



/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  const displayResult = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`;
  console.log(displayResult)

  // EXTRA CREDIT
  //push value into HTML DOM
  document.getElementById("result").innerHTML = displayResult;
}



/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  // EXTRA CREDIT
  let dealerScore = calcPoints(dealer.hand).total;  
  if (dealerScore === 21){
    showHand(player)
    return `Dealer wins: Gets exactly 21 after drawing first 2 cards`
  }

  let playerScore = calcPoints(player.hand).total;
  if (playerScore === 21){
    showHand(player)
    return `Player wins: Gets exactly 21 after drawing first 2 cards`
  }

  showHand(player);



  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  //let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());

