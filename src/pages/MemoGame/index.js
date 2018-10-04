import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { flipUpCard, checkMatchedPair, initGame, myFlipCards, startTimer, tickTimer } from '../../actions/gameActions';
import { sendTrx, getRanking } from '../../actions/web3Actions';
import Layout from '../Layout';
import { RankingList, MenuGame, Board, BlockchainForm } from '../../components/';
import './MemoGame.css';

class Game extends Component {

  componentWillMount() {
    //Setear timer cada 10 segundos
    this.interval = setInterval(() => this.props.onGetRanking(), 10000);

  }

  componentWillUnmount() {
    //Limpiar el timer
    clearInterval(this.interval);
  }

  onCardClickWrapper(id) {

    // Despachar la acción de tarjeta cliqueada
    this.props.onCardClicked(id);

    // Si el timer está inactivo
    if (!this.props.isOn) {

      // Activar el timer
      this.props.onStartTimer(Date.now());

      // Setear el intervalor cada 1 segundo
      interval = setInterval(() => {

        // Empezar a contar
        this.props.onTickTimer(Date.now());

      }, 1000)
    }

  }

  render() {
    const { gameComplete, turnNo, onPlayAgain, pairsFound, cards, isOn, time, onSendTrx, top10List } = this.props;
    if (!isOn || gameComplete) {
      clearInterval(interval);
    }

    let mainComponent;
    if (gameComplete) {
      mainComponent = <BlockchainForm turnNo={turnNo} time={time} onCancel={onPlayAgain} onSubmit={onSendTrx} />
    } else {
      mainComponent = <Board cards={cards} onCardClicked={this.onCardClickWrapper.bind(this)} />;
    }
    return (
      <Layout>
        <Grid stackable columns={2} celled='internally'>
          <Grid.Row>
            <Grid.Column width={11}>
              <div>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <MenuGame turnNo={turnNo} pairsFound={pairsFound} time={time} onPlayAgain={onPlayAgain} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Column width={16}>
                    <Grid.Row>{mainComponent}</Grid.Row>
                  </Grid.Column>
                </Grid>
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <RankingList top10List={top10List} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
};

let interval = null;
let timeOutCheck;

const mapStateToProps = state => {
  return {
    numClicksWithinTurn: state.gameReducer.numClicksWithinTurn,
    cards: state.gameReducer.cards,
    turnNo: state.gameReducer.turnNo,
    gameComplete: state.gameReducer.gameComplete,
    pairsFound: state.gameReducer.pairsFound,
    isOn: state.gameReducer.isOn,
    time: state.gameReducer.time,
    web3: state.web3Reducer.web3,
    top10List: state.web3Reducer.top10List
  }
}

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
    },
    onSendTrx: (name, email, times, attemps) => {
      dispatch(sendTrx(name, email, times, attemps));
    },
    onGetRanking: () => {
      dispatch(getRanking());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);