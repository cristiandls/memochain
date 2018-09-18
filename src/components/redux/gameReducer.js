import {
  FLIP_UP_CARD, SHUFFLE_CARDS, CHECK_MATCHED_PAIR, markPairAsMatched,
  MARK_PAIR_AS_MATCHED, MY_FLIP_CARDS, flipDownPair, FLIP_DOWN_PAIR, INIT_GAME,
  shuffleCards, myFlipCards, checkMatchedPair, flipUpCard
} from "./gameActions";
import shuffle from 'shuffle-array';
import { NUM_IMAGES, generateCardSet, getCard, cardsHaveIdenticalImages } from '../cardFunctions';

const initialState = {
  turnNo: 1,
  pairsFound: 0,
  numClicksWithinTurn: 0,
  firstId: undefined,
  secondId: undefined,
  gameComplete: false,
  cards: generateCardSet()
};

// Reducer para el array de cartas
function cardsState(state = [], action) {

  // Evaluar la acción despachada
  switch (action.type) {

    // Voltear hacía arriba la carta
    case FLIP_UP_CARD:

      // Modificar el atributo para indicar que se debe mostrar
      // la imagen principal
      return state.map((card) => {

        // Si el id de la carta actual coincide con el enviado a la acción
        if (action.id === card.id) {

          // Clonar el objeto y modificar el atributo imageUp a true
          return { ...card, imageUp: true };

        }

        // Devuelvo la carta como está
        return card;
      });

    // Marcar cartas como coincidencias
    case MARK_PAIR_AS_MATCHED:

      // Recorrer el array de cartas
      return state.map((card) => {

        // Si es alguna de las dos cartas
        if (action.id1 === card.id || action.id2 === card.id) {

          // Clonar el objeo y modificar el atributo matched a true
          return { ...card, matched: true }

        }

        // Devolver la carta como está
        return card;
      });

    // Voltear cartas boca abajo
    case FLIP_DOWN_PAIR:

      // Recorrer el array con las catas
      return state.map((card) => {

        // Si es alguna de las cartas
        if (action.id1 === card.id || action.id2 === card.id) {

          // Clonar el objeto y modificar el atributo imageUp a true
          return { ...card, imageUp: false };

        }

        // Devuelvo la carta como está
        return card;

      });

    // Mezclar las cartas
    case SHUFFLE_CARDS:

      // Clonar las cartas
      let newCards = [...state];

      // Mezclarlas
      newCards = shuffle(newCards);

      return newCards;

    // Si no es ninguna de las acciones devuelvo el estado
    default:
      return state;
  }
}

// Reducer para el juego
function gameReducer(state = initialState, action) {

  // Evaluar la acción despachada
  switch (action.type) {

    // Esta acción se despacharía un par de segundos después 
    case MY_FLIP_CARDS:

      // Si se dieron vuelta 2 cartas
      if (state.numClicksWithinTurn === 2) {
        return {
          ...state,
          numClicksWithinTurn: 0,
          turnNo: state.turnNo + 1,
          cards: cardsState(state.cards, flipDownPair(state.firstId, state.secondId))
        }
      } else {
        return state;
      }

    // Iniciar juego
    case INIT_GAME:

      // Recuperar el estado inicial y pisar las cartas con las mezcladas
      return { ...initialState, cards: cardsState(initialState.cards, shuffleCards()) }

    // Chequear coincidencias
    case CHECK_MATCHED_PAIR:

      // Si ya se dieron vuelta las dos cartas y coinciden
      if (state.numClicksWithinTurn === 2 && cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)) {

        // Incrementar el contador de coincidencias
        let pairsFound = state.pairsFound + 1;
        let gameComplete = false;

        // Su la cantidad de coincidencias es igual a la cantidad de cartas a averiguar
        // setear en true el indicador de juego completado
        if (pairsFound === NUM_IMAGES) {
          gameComplete = true;
        }

        // Devolver el state
        // 1. Devolver incrementada la cantidad de coincidencias
        // 2. Incrementar los turnos utilizados 
        // 3. Setear en 0 las cartas dadas vueltas en el turno
        // 4. Setear el indicador de juego completo 
        // 5. Marcar el par de cartas como ya descubiertas
        return {
          ...state,
          pairsFound: pairsFound,
          turnNo: state.turnNo + 1,
          numClicksWithinTurn: 0,
          gameComplete: gameComplete,
          cards: cardsState(state.cards, markPairAsMatched(state.firstId, state.secondId))
        }
      }

      // Si aún no se dieron vuelta las dos cartas devolver el estado como está
      return state;

    // Dar vuelta una carta
    case FLIP_UP_CARD:

      // Si ya se dieron vuelta dos cartas
      if (state.numClicksWithinTurn === 2) {

        // 1. Chequear si coinciden las cartas y devolver el estado
        // 2. Poner las cartas boca abajo
        // 3. Dar vuelta la carta que se indicó
        return gameReducer(gameReducer(gameReducer(state, checkMatchedPair()), myFlipCards()), flipUpCard(action.id));;
      }

      // Obtener la carta
      let card = getCard(action.id, state.cards);

      // Si la carta ya esta destapada o ya fué descubierata
      if (card.imageUp || card.matched) {

        return state;
      }


      let firstId = state.firstId;
      let secondId = state.secondId;

      // Si es la primera que da vuelta en el turno
      if (state.numClicksWithinTurn === 0) {

        firstId = action.id;

        // Si ya dió vuelta alguna
      } else {

        secondId = action.id;
      }

      // Incrementar el número de cartas dadas vuelta en el turno
      let numClicks = state.numClicksWithinTurn + 1;

      // Devolver el estado modificado
      return {
        ...state,
        firstId: firstId,
        secondId: secondId,
        numClicksWithinTurn: numClicks,
        cards: cardsState(state.cards, action)
      };

    // Mezclar las cartas
    case SHUFFLE_CARDS:

      // Devolver el estado con las cartas mezcladas
      return {
        ...state,
        cards: cardsState(state.cards, action)
      }

    // Si no es ninguna de las acciones anteriores
    default:
      return state;
  }
}

export default gameReducer;
