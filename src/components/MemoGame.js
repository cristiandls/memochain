import React, { Component } from 'react';
import { Container, Label, Grid, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux'
import CardView from './CardView';
import { flipUpCard, checkMatchedPair, initGame } from './redux/gameActions';
import Layout from './Layout';
import './MemoGame.css';

class Game extends Component {

  componentWillMount() {
    setInterval(this.props.onCheckForMatchedPair, 2000);
  }

  renderBoard(lineNo) {

    const { cards, onCardClicked } = this.props;

    // Array para el table
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
          <Grid.Column>
            <CardView
              key={card.id}
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

  renderStatus() {

    // Si completó el juego
    if (this.props.gameComplete) {
      return (
        <Grid.Row>
          <Grid.Column>
            <Label as='a' color='pink' size="big">
              Felicitaciones! Ganaste en {this.props.turnNo - 1} intentos
            </Label>
          </Grid.Column>
          <Grid.Column>
            <Label as='a' color='yellow' size="big">
              No ingresaste en el TOP10
            </Label>
          </Grid.Column>
          <Grid.Column>
            <Button size="big" color='orange' onClick={this.props.onPlayAgain}>
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
          <Label as='a' color='red' size="big" pointing='right'>Cantidad de intentos:</Label>
          <span>{this.props.turnNo}</span>
        </Grid.Column>
        <Grid.Column>
          <Label as='a' color='green' size="big" pointing='right'>Aciertos:</Label>
          <span>{this.props.pairsFound}</span>
        </Grid.Column>
        <Grid.Column>
          <Button size="big" color='orange' onClick={this.props.onPlayAgain}>
            <Icon name='refresh' /> Reiniciar
          </Button>
        </Grid.Column>
      </Grid.Row >
    );
  }

  render() {

    return (
      <Layout>
        <Container fluid>
          <Grid columns={3} divided>
            {this.renderStatus()}
            <Grid.Row>
              <div className='Game'>
                <div className='CardContainer'>
                </div>
              </div>
            </Grid.Row>
          </Grid>
          <Grid columns={10}>
            <Grid.Row>
              {this.renderBoard(1)}
            </Grid.Row>
            <Grid.Row>
              {this.renderBoard(2)}
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    );
  }

};

const mapStateToProps = state => {
  return {
    cards: state.cards,
    turnNo: state.turnNo,
    gameComplete: state.gameComplete,
    pairsFound: state.pairsFound
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCardClicked: id => {
      dispatch(flipUpCard(id));
    },
    onCheckForMatchedPair: () => {
      dispatch(checkMatchedPair());
    },
    onPlayAgain: () => {
      dispatch(initGame());
    }
  }
}

const MemoGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default MemoGame;