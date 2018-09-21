import React from 'react';
import { List, Label, Icon } from 'semantic-ui-react';

const RankingList = ({ top10List }) => {
  return (
    <div>
      <List celled size='tiny'>
        {
          top10List.map((item, index) => {
            let showIcon;
            if (index >= 0 && index <= 2) {
              showIcon = <Icon name='gift' color='yellow' />
            } else {
              showIcon = null;
            }

            return (
              <List.Item key={index}>
                <List.Content floated='left'>
                  <Label color="grey" circular size="big">{index + 1}</Label>
                </List.Content>
                <List.Content>
                  <List.Header>{item.name} {showIcon} </List.Header>
                  <List.Header>Intentos: {item.attemps} - Tiempo: {item.time} segundos</List.Header>
                  {item.mail}
                </List.Content>
              </List.Item>
            );
          })
        }
      </List>
    </div>
  );
};

export { RankingList };
