import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { renderBoard, renderStatus } from './utils/boardUtils';
import { flipUpCard, checkMatchedPair, initGame, myFlipCards } from './redux/gameActions';
import Layout from './Layout';
import './MemoGame.css';

class Game extends Component {

  // componentWillMount() {
  //   setInterval(this.props.onCheckForMatchedPair, 2000);
  // }

  render() {
    const { gameComplete, turnNo, onPlayAgain, pairsFound, cards, onCardClicked } = this.props;
    return (
      <Layout>
        <Container fluid>
          <Grid columns={3} divided>
            {renderStatus(gameComplete, turnNo, onPlayAgain, pairsFound)}
          </Grid>
          <Grid columns={10}>
            <Grid.Row>
              {renderBoard(1, cards, onCardClicked)}
            </Grid.Row>
            <Grid.Row>
              {renderBoard(2, cards, onCardClicked)}
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    );
  }
};

const mapStateToProps = state => {
  return {
    numClicksWithinTurn: state.numClicksWithinTurn,
    cards: state.cards,
    turnNo: state.turnNo,
    gameComplete: state.gameComplete,
    pairsFound: state.pairsFound
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
    }
  }
}

const MemoGame = connect(mapStateToProps, mapDispatchToProps)(Game)

export default MemoGame;