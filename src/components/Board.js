import React from 'react';
import { Grid } from 'semantic-ui-react';
import CardView from './CardView';

const Board = ({ cards, onCardClicked }) => {
  return (
    <Grid columns={5}>
      {
        cards.map((card, index) => {
          return (
            <Grid.Column key={index}>
              <CardView
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

export { Board };
