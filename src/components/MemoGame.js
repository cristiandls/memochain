import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { renderBoard, renderStatus } from './utils/boardUtils';
import { flipUpCard, checkMatchedPair, initGame, myFlipCards, startTimer, tickTimer } from './redux/gameActions';
import Layout from './Layout';
import './MemoGame.css';

class Game extends Component {

  onCardClickWrapper(id) {

    // Despachar la acción de tarjeta cliqueada
    this.props.onCardClicked(id);

    // Si el timer está inactivo
    if (!this.props.isOn) {

      // Activar el timer
      this.props.onStartTimer(Date.now());

      // Empezar a contar
      interval = setInterval(() => {

        // Empezar a contar
        this.props.onTickTimer(Date.now());

      }, 1000)
    }

  }

  render() {
    const { gameComplete, turnNo, onPlayAgain, pairsFound,
      cards, isOn, time } = this.props;

    // Si el timer está inactivo
    if (!this.props.isOn) {
      clearInterval(interval);
    }

    // Si se completó el juego detener el timer
    if (gameComplete) {
      clearInterval(interval);
    }

    return (
      <Layout>
        <Container>
          <Grid columns={3} divided>
            {renderStatus(gameComplete, turnNo, onPlayAgain, pairsFound, isOn, time)}
          </Grid>
          <Grid columns={10}>
            <Grid.Row>
              {renderBoard(1, cards, this.onCardClickWrapper.bind(this))}
            </Grid.Row>
            <Grid.Row>
              {renderBoard(2, cards, this.onCardClickWrapper.bind(this))}
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    );
  }
};

let interval = null;

const mapStateToProps = state => {

  return {
    numClicksWithinTurn: state.numClicksWithinTurn,
    cards: state.cards,
    turnNo: state.turnNo,
    gameComplete: state.gameComplete,
    pairsFound: state.pairsFound,
    isOn: state.isOn,
    time: state.time
  }
}

// var timeOutCheck;
let timeOutCheck;

const mapDispatchToProps = dispatch => {
  return {
    onCardClicked: id => {
      dispatch(flipUpCard(id));
      dispatch(checkMatchedPair());
      clearTimeout(timeOutCheck);
      timeOutCheck = setTimeout(() => {
        dispatch(myFlipCards())
      }, 1800);
    },
    onCheckForMatchedPair: () => {
      dispatch(checkMatchedPair());
    },
    onPlayAgain: () => {
      dispatch(initGame());
    },
    onStartTimer: (offset) => {
      dispatch(startTimer(offset));
    },
    onTickTimer: (time) => {
      dispatch(tickTimer(time));
    }
  }
}

const MemoGame = connect(mapStateToProps, mapDispatchToProps)(Game)

export default MemoGame;