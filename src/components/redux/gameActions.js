export const FLIP_UP_CARD = 'FLIP_UP_CARD';
export const SHUFFLE_CARDS = 'SHUFFLE_CARDS';
export const CHECK_MATCHED_PAIR = 'CHECK_MATCHED_PAIR';
export const MARK_PAIR_AS_MATCHED = 'MARK_PAIR_AS_MATCHED';
export const FLIP_DOWN_PAIR = 'FLIP_DOWN_PAIR';
export const INIT_GAME = 'INIT_GAME';
export const MY_FLIP_CARDS = 'MY_FLIP_CARDS';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TICK_TIMER = 'TICK_TIMER';

export function initGame() {
  return { type: INIT_GAME };
}

export function flipDownPair(id1, id2) {
  return { type: FLIP_DOWN_PAIR, id1: id1, id2: id2 }
}
export function markPairAsMatched(id1, id2) {
  return { type: MARK_PAIR_AS_MATCHED, id1: id1, id2: id2 }
}

export function checkMatchedPair() {
  return { type: CHECK_MATCHED_PAIR };
}

export function flipUpCard(id) {
  return { type: FLIP_UP_CARD, id };
}

export function shuffleCards() {
  return { type: SHUFFLE_CARDS };
}

export function myFlipCards() {
  return { type: MY_FLIP_CARDS };
}

export function startTimer(offset) {
  return { type: START_TIMER, offset: offset };
}

export function stopTimer() {
  return { type: STOP_TIMER };
}

export function tickTimer(time) {
  return { type: TICK_TIMER, time: time }
}