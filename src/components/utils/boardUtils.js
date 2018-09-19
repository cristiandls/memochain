import React from 'react';
import { Label, Grid, Button, Icon, Rating, Divider } from 'semantic-ui-react';
import CardView from '../CardView';

const renderBoard = (lineNo, cards, onCardClicked) => {

  // Array para el tablero
  let board = [];
  let boardCard;
  let fromIndex;
  let toIndex;

  // Si se pide la línea 1
  switch (lineNo) {
    case 1:
      fromIndex = 0
      toIndex = 9
      break;
    case 2:
      fromIndex = 10
      toIndex = 19
      break;
  }

  // Recorrer las imágenes
  boardCard = cards.map((card, index) => {
    if (index >= fromIndex && index <= toIndex) {
      boardCard =
        <Grid.Column key={index}>
          <CardView
            key={index}
            id={card.id}
            image={card.image}
            imageUp={card.imageUp}
            matched={card.matched}
            onClick={onCardClicked}
          />
        </Grid.Column>
      board.push(boardCard);
    }
  })

  // Devolver el tablero
  return board;
}

const renderStatus = (gameComplete, turnNo, onPlayAgain, pairsFound, isOn, time) => {

  // Si completó el juego
  if (gameComplete) {
    return (
      <Grid.Row>
        <Grid.Column>
          <Label as='a' color='pink' size="big">
            Felicitaciones! Ganaste en {turnNo - 1} intentos
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label as='a' color='yellow' size="big">
            Tu tiempo fué de {parseInt(time / 1000)} segungos
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Button size="big" color='orange' onClick={onPlayAgain}>
            <Icon name='refresh' /> Jugar de nuevo!
          </Button>
        </Grid.Column>
      </Grid.Row>
    );
  }

  // Si todavía está jugando
  return (
    <Grid.Row>
      <Grid.Column>
        <Label as='h1' color='red' size="massive">Cantidad de intentos:</Label>
        <span><h1>{turnNo}</h1></span>
      </Grid.Column>
      <Grid.Column>
        <Label as='h1' color='green' size="massive">Aciertos:</Label>
        <Rating icon='star' size="massive" rating={pairsFound} maxRating={10} disabled />
      </Grid.Column>
      <Grid.Column>
        <Label as='h2' color='blue' size="massive">Tiempo:</Label>
        <span><h1>{parseInt(time / 1000)}</h1></span>
        <Divider vertical={false} />
        <Button size="big" color='orange' onClick={onPlayAgain}>
          <Icon name='refresh' /> Reiniciar
        </Button>
      </Grid.Column>
    </Grid.Row >
  );
}

export { renderBoard, renderStatus }