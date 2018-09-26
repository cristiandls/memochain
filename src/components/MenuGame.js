import React from 'react';
import { Menu, Label, Icon } from 'semantic-ui-react';

const MenuGame = ({ turnNo, pairsFound, time, onPlayAgain }) => {
  return (
    <div>
      <Menu stackable widths={4}>
        <Menu.Item name='attemps'>Cantidad de intentos: <Label circular color='grey'>{turnNo}</Label></Menu.Item>
        <Menu.Item name='pairsFound'>Aciertos: <Label circular color='grey'>{pairsFound}</Label></Menu.Item>
        <Menu.Item name='time'>Tiempo transcurrido: <Label circular color='grey'>{parseInt(time / 1000)}</Label></Menu.Item>
        <Menu.Item name='refreh' onClick={onPlayAgain}><Icon name='refresh' />Reiniciar Juego</Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuGame;
