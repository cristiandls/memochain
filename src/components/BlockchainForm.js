import React, { Component } from 'react';
import { Form, Message, Button, Input, Label } from 'semantic-ui-react';

class BlockchainForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.email, this.props.time, this.props.turnNo);
    this.setState({
      name: '',
      email: ''
    });
  }

  render() {
    const { turnNo, time, onCancel } = this.props;
    const text = `Ganaste en ${turnNo} intentos y un tiempo de ${parseInt(time / 1000)} segundos! Registra tu puntaje en la Blockchain de Ethereum`
    return (
      <Form success onSubmit={this.handleSubmit}>
        <Message success header='Felicitaciones' content={text} />
        <Form.Field required>
          <Label>Nombre</Label>
          <Input maxLength="45" placeholder='Nombre y apellido' value={this.state.name} type='text' onChange={name => this.setState({ name: name.target.value })} required />
        </Form.Field>
        <Form.Field required>
          <Label>Email</Label>
          <Input maxLength="45" placeholder='usuario@neoris.com' value={this.state.email} type='email' onChange={email => this.setState({ email: email.target.value })} required />
        </Form.Field>
        <p><Button type="reset" onClick={onCancel}>Cancelar</Button> <Button type="submit">Grabar mi jugada!</Button></p>
      </Form>
    );
  }
}

export default BlockchainForm;