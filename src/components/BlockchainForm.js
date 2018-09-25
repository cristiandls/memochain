import React from 'react';
import { Form, Message, Button } from 'semantic-ui-react';

const BlockchainForm = ({ turnNo, time, onCancel }) => {
  const text = `Ganaste en ${turnNo} intentos y un tiempo de ${parseInt(time / 1000)} segundos! Registra tu puntaje en la Blockchain de Ethereum`
  return (
    <Form success>
      <Message success header='Felicitaciones' content={text} />
      <Form.Input label='Nombre' placeholder='Nombre y apellido' />
      <Form.Input label='Email' placeholder='usuario@neoris.com' type="email" />
      <p><Button onClick={onCancel}>Cancelar</Button> <Button>Grabar mi jugada!</Button></p>
    </Form>
  );
};

export { BlockchainForm };