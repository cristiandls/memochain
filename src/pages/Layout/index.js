import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import logo from '../../images/logo.png';

const Layout = ({ children }) => {
  return (
    <div>
      <Menu inverted stackable>
        <Container >
          <Menu.Item as='a' header >
            <Image size='small' src={logo} style={{ marginRight: '1.5em' }} />
            Juegos en blockchain - MemoChain
            </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='contract' header>
              <a style={{ color: 'white' }} href={ENVAR_BLOCKCHAIN_NETWORK + 'address/' + ENVAR_CONTRACT_ADDRESS} target="_blank">{'Ver contrato: ' + ENVAR_CONTRACT_ADDRESS}</a>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
      {children}
    </div>
  );
};

export default Layout;
