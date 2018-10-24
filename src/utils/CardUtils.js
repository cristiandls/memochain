export const NUM_IMAGES = 12;

export function generateCardSet() {
  //
  // Generate a set of cards with image pairs
  //
  let cards = [];
  let id = 1;
  for (let i = 1; i <= NUM_IMAGES; i++) {
    let card1 = {
      id: id,
      image: i,
      imageUp: false,
      matched: false
    };
    id++;

    let pairCard;

    // Si se agregó la carta 10, 11 o 12 que son de las preguntas
    if (i === 10 || i === 11 || i === 12) {
      pairCard = i + 3
    } else {
      pairCard = i
    }

    let card2 = {
      id: id,
      image: pairCard,
      imageUp: false,
      matched: false
    };
    cards.push(card1);
    cards.push(card2);
    id++;
  }

  return cards;
};

export function getCard(id, cards) {
  for (let i = 0; i < 2 * NUM_IMAGES; i++) {
    if (cards[i].id === id) {
      return cards[i];
    }
  };
}

export function cardsHaveIdenticalImages(id1, id2, cards) {

  // Si es alguna de las cartas de preguntas y respuestas
  if (((getCard(id1, cards).image == 10 && getCard(id2, cards).image == 13) ||
    (getCard(id1, cards).image == 13 && getCard(id2, cards).image == 10)) ||
    ((getCard(id1, cards).image == 11 && getCard(id2, cards).image == 14) ||
      (getCard(id1, cards).image == 14 && getCard(id2, cards).image == 11)) ||
    ((getCard(id1, cards).image == 12 && getCard(id2, cards).image == 15) ||
      (getCard(id1, cards).image == 15 && getCard(id2, cards).image == 12))) {
    return true;
  }

  if (getCard(id1, cards).image === getCard(id2, cards).image) {
    return true;
  } else {
    return false;
  }
}
