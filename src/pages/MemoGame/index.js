import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { flipUpCard, checkMatchedPair, initGame, myFlipCards, startTimer, tickTimer } from '../../actions/gameActions';
import { sendTrx } from '../../actions/web3Actions';
import Layout from '../Layout';
import { RankingList, MenuGame, Board, BlockchainForm } from '../../components/';
import './MemoGame.css';

//#region borrar
const top10List = [
  {
    name: 'Juan Pablo Dunda',
    mail: 'juan.dunda@neoris.com',
    attemps: 25,
    time: 346
  },
  {
    name: 'Cristian Lombardi',
    mail: 'cristian.lombardi@neoris.com',
    attemps: 44,
    time: 324
  },
  {
    name: 'Cristian de la Sota',
    mail: 'cristian.delasota@neoris.com',
    attemps: 45,
    time: 333
  },
  {
    name: 'César Rodriguez',
    mail: 'cesar.rodriguez@neoris.com',
    attemps: 51,
    time: 366
  },
  {
    name: 'Mariano Vitelli',
    mail: 'mariano.vitelli@neoris.com',
    attemps: 51,
    time: 390
  },
  {
    name: 'Federico Andrés Leveratto',
    mail: 'federico.leveratto@neoris.com',
    attemps: 88,
    time: 1027
  },
  {
    name: 'Facundo Correa',
    mail: 'facundo.correa@neoris.com',
    attemps: 99,
    time: 340
  },
  {
    name: 'Nicolás Domratschejew',
    mail: 'nicolas.domratschejew@neoris.com',
    attemps: 111,
    time: 155
  },
  {
    name: 'Martín Gastón Borda',
    mail: 'martin.borda@neoris.com',
    attemps: 112,
    time: 201
  },
  {
    name: 'Juan Pablo Mercol',
    mail: 'juan.mercol@neoris.com',
    attemps: 146,
    time: 299
  }
]
//#endregion borrar

class Game extends Component {

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
    const { gameComplete, turnNo, onPlayAgain, pairsFound, cards, isOn, time, onSendTrx } = this.props;
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
    web3: state.web3Reducer.web3
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);