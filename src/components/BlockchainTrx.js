import React, { Component } from 'react';
import { Message, Icon, Button } from 'semantic-ui-react';

class BlockchainTrx extends Component {

  render() {
    const { bcTrx, onCancel } = this.props;

    // Si ya se creó la transacción
    if (bcTrx) {
      const link = ENVAR_BLOCKCHAIN_NETWORK + '/tx/' + bcTrx;
      return (
        <div>
          <Message icon>
            <Icon name='chain' color='red' />
            <Message.Content>
              <Message.Header>Tu transacción está siendo minada en la blockchain!</Message.Header>
              Síguela en vivo haciendo click aquí: <a style={{ color: 'blue' }} href={link} target="_blank">{bcTrx}</a>
            </Message.Content>
          </Message>
          <p><Button type="reset" onClick={onCancel}>OK</Button></p>
        </div>
      );
    } else {
      return (
        <div>
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Tu transacción está siendo Generada</Message.Header>
              Por favor espera!
            </Message.Content>
          </Message>
          <p><Button type="reset" onClick={onCancel}>OK</Button></p>
        </div>
      );
    }
  }
}

export default BlockchainTrx;