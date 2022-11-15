/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const suits = ['hearts', 'spades', 'clubs', 'diamonds']
  const deck = []
  
  for (let i = 0; i < suits.length; i++) {

    // create an array of 13 objects
    for (let j = 1; j <= 13; j++) {

      let  value, display
      switch (j) {
        case 1:
          display = 'Ace';
          value = 1;
          break;
        case 11:
          display = "Jack";
          value = 10;
          break;
        case 12:
          display = "Queen";
          value = 10;
          break;
        case 13:
          display = "King";
          value = 10;
        break;      
        default:
          display = j.toString();
          value = j;
      }
      //create card
      const card = {
        suit: suits[i],
        val: value,
        displayVal: display,
      }
      
      //change ACE value to 11
      if (display === "Ace"){
       card.val = 11
      }      
      
      deck.push(card)
      console.log(card)
    }
  }
  return deck
}






// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);