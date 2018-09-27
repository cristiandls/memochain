import React from 'react';
import { Grid } from 'semantic-ui-react';
import Card from './Card';

const Board = ({ cards, onCardClicked }) => {
  return (
    <Grid doubling columns={6}>
      {
        cards.map((card, index) => {
          return (
            <Grid.Column key={index}>
              <Card
                key={index}
                id={card.id}
                image={card.image}
                imageUp={card.imageUp}
                matched={card.matched}
                onClick={onCardClicked}
              />
            </Grid.Column>
          );
        })
      }
    </Grid>
  );
};

export default Board;
