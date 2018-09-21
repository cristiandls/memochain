import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import logo from './images/logo.png';

const Layout = ({ children }) => {
  return (
    <Container>
      <div>
        <Menu inverted>
          <Container >
            <Menu.Item as='a' header>
              <Image size='small' src={logo} style={{ marginRight: '1.5em' }} />
              Juegos en blockchain - MemoChain
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='contract' header>
                <a style={{ color: 'white' }} href="https://ropsten.etherscan.io/address/0xbd15fcb70a610dd914eed4afdf36930fd716924f" target="_blank">Ver contrato: 0xbd15fcb70a610dd914eed4afdf36930fd716924f</a>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        <Container>
          {children}
        </Container>
      </div>
    </Container>
  );
};

export default Layout;
